import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { TRPCError } from "@trpc/server";
import { 
  createLead, 
  getAllLeads, 
  getLeadById, 
  updateLeadStatus, 
  markLeadNotified,
  createQuote,
  createChatConversation,
  getChatConversationBySessionId,
  updateChatConversation,
  createChatMessage,
  getChatMessagesByConversationId,
  // Driver imports
  createDriver,
  getDriverById,
  getDriverByUserId,
  getDriverByEmail,
  getAllDrivers,
  getDriversByStatus,
  getApprovedAvailableDrivers,
  updateDriver,
  updateDriverStatus,
  updateDriverAvailability,
  incrementDriverJobCount,
  // Job imports
  createJob,
  getJobById,
  getAllJobs,
  getJobsByStatus,
  getJobsByDriverId,
  getActiveJobsByDriverId,
  updateJob,
  updateJobStatus,
  assignJobToDriver,
  // Application imports
  createDriverApplication,
  getDriverApplicationByDriverId,
  getAllDriverApplications,
  updateDriverApplication
} from "./db";

// System prompt for the AI chatbot
const CHAT_SYSTEM_PROMPT = `You are a helpful assistant for KK Logistics, a man with a van removal and delivery service based in Falkirk, Scotland.

ABOUT THE BUSINESS:
- Owner: KK Logistics
- Phone: 07459 920 895
- Location: Based in Falkirk, serving Central Scotland
- Services: House removals, furniture delivery, office moves, courier services
- Service area: Falkirk, Stirling, Edinburgh, Glasgow, and surrounding areas
- Hours: 7 days a week, 7am-9pm
- Fully insured

PRICING GUIDANCE (estimates only):
- House removals: From £50/hour
- Furniture delivery: From £30
- Office moves: Custom quotes
- Courier services: From £15

YOUR ROLE:
1. Answer questions about services, pricing, and coverage area
2. Help customers understand what service they need
3. Collect contact information (name, phone, email) when customers are interested
4. Qualify leads by understanding their requirements
5. Encourage customers to get a quote or call directly

IMPORTANT RULES:
- Be friendly, professional, and helpful
- Keep responses concise (2-3 sentences when possible)
- Always mention the phone number (07459 920 895) when appropriate
- If asked about exact pricing, explain these are estimates and encourage getting a proper quote
- If a customer provides contact details, acknowledge and confirm you'll pass them on
- Never make up information about the business
- If unsure, recommend calling for accurate information

When collecting contact details, ask for:
1. Name
2. Phone number (most important)
3. Brief description of what they need`;

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user?.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

// Driver-only procedure
const driverProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user?.role !== 'driver' && ctx.user?.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Driver access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Lead management
  leads: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email().optional(),
        phone: z.string().min(1),
        serviceType: z.enum(["house_removal", "furniture_delivery", "office_move", "courier"]),
        message: z.string().optional(),
        pickupAddress: z.string().optional(),
        deliveryAddress: z.string().optional(),
        preferredDate: z.string().optional(),
        source: z.enum(["form", "chatbot", "quote_calculator", "phone"]).default("form"),
      }))
      .mutation(async ({ input }) => {
        const lead = await createLead(input);
        
        // Send notification to owner
        try {
          const serviceLabels: Record<string, string> = {
            house_removal: "House Removal",
            furniture_delivery: "Furniture Delivery",
            office_move: "Office Move",
            courier: "Courier Service"
          };
          
          await notifyOwner({
            title: `🚚 New Lead: ${input.name}`,
            content: `**New ${serviceLabels[input.serviceType]} Enquiry**

**Customer:** ${input.name}
**Phone:** ${input.phone}
${input.email ? `**Email:** ${input.email}` : ""}
**Source:** ${input.source.replace("_", " ")}
${input.pickupAddress ? `**Pickup:** ${input.pickupAddress}` : ""}
${input.deliveryAddress ? `**Delivery:** ${input.deliveryAddress}` : ""}
${input.preferredDate ? `**Preferred Date:** ${input.preferredDate}` : ""}
${input.message ? `**Message:** ${input.message}` : ""}

---
Reply to this customer promptly!`
          });
          
          await markLeadNotified(lead.id);
        } catch (error) {
          console.error("Failed to send owner notification:", error);
        }
        
        return lead;
      }),

    list: protectedProcedure.query(async () => {
      return getAllLeads();
    }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getLeadById(input.id);
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "quoted", "booked", "completed", "cancelled"])
      }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // Quote management
  quotes: router({
    create: publicProcedure
      .input(z.object({
        leadId: z.number().optional(),
        serviceType: z.enum(["house_removal", "furniture_delivery", "office_move", "courier"]),
        pickupAddress: z.string(),
        deliveryAddress: z.string(),
        distanceKm: z.string().optional(),
        itemCount: z.number().optional(),
        estimatedPrice: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createQuote(input);
      }),
  }),

  // AI Chat
  chat: router({
    sendMessage: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        message: z.string(),
        conversationHistory: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string()
        })).optional()
      }))
      .mutation(async ({ input }) => {
        // Get or create conversation
        let conversation = await getChatConversationBySessionId(input.sessionId);
        if (!conversation) {
          conversation = await createChatConversation({ sessionId: input.sessionId });
        }

        // Save user message
        await createChatMessage({
          conversationId: conversation.id,
          role: "user",
          content: input.message
        });

        // Build messages for LLM
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
          { role: "system", content: CHAT_SYSTEM_PROMPT }
        ];

        // Add conversation history
        if (input.conversationHistory) {
          for (const msg of input.conversationHistory) {
            messages.push({ role: msg.role, content: msg.content });
          }
        }
        messages.push({ role: "user", content: input.message });

        // Get AI response
        const response = await invokeLLM({ messages });
        const rawContent = response.choices[0]?.message?.content;
        const assistantMessage = typeof rawContent === 'string' 
          ? rawContent 
          : "I apologize, but I'm having trouble responding. Please call us at 07459 920 895 for immediate assistance.";

        // Save assistant message
        await createChatMessage({
          conversationId: conversation.id,
          role: "assistant",
          content: assistantMessage
        });

        // Check if customer provided contact info and create lead
        const phoneRegex = /\b(07\d{9}|0\d{10}|\+44\d{10})\b/;
        const hasPhone = phoneRegex.test(input.message);
        
        if (hasPhone && !conversation.isQualified) {
          // Extract name if mentioned (simple heuristic)
          const nameMatch = input.message.match(/(?:my name is|i'm|i am|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
          const phoneMatch = input.message.match(phoneRegex);
          
          if (phoneMatch) {
            const customerPhone = phoneMatch[0];
            const customerName = nameMatch ? nameMatch[1] : "Chat Customer";
            
            // Update conversation
            await updateChatConversation(input.sessionId, {
              customerPhone,
              customerName,
              isQualified: true
            });

            // Create lead from chat
            const lead = await createLead({
              name: customerName,
              phone: customerPhone,
              serviceType: "house_removal", // Default, can be refined
              source: "chatbot",
              message: `Chat conversation - Customer inquiry`
            });

            await updateChatConversation(input.sessionId, { leadId: lead.id });

            // Notify owner
            try {
              await notifyOwner({
                title: `💬 New Chat Lead: ${customerName}`,
                content: `**Customer from Chat**

**Name:** ${customerName}
**Phone:** ${customerPhone}

The customer provided their contact details via the website chatbot. Follow up promptly!`
              });
            } catch (error) {
              console.error("Failed to send chat lead notification:", error);
            }
          }
        }

        return { response: assistantMessage };
      }),

    getHistory: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        const conversation = await getChatConversationBySessionId(input.sessionId);
        if (!conversation) return [];
        return getChatMessagesByConversationId(conversation.id);
      }),
  }),

  // Driver management
  drivers: router({
    // Public registration
    register: publicProcedure
      .input(z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        address: z.string().optional(),
        postcode: z.string().optional(),
        dateOfBirth: z.string().optional(),
        drivingLicenseNumber: z.string().optional(),
        licenseExpiryDate: z.string().optional(),
        vanMake: z.string().optional(),
        vanModel: z.string().optional(),
        vanYear: z.number().optional(),
        vanRegistration: z.string().optional(),
        vanCapacity: z.enum(["small", "medium", "large", "luton"]).optional(),
        insuranceProvider: z.string().optional(),
        insurancePolicyNumber: z.string().optional(),
        insuranceExpiryDate: z.string().optional(),
        hasGoodsInTransitInsurance: z.boolean().optional(),
        serviceAreas: z.string().optional(), // JSON string
        servicesOffered: z.string().optional(), // JSON string
        maxDistanceKm: z.number().optional(),
        availableDays: z.string().optional(), // JSON string
        availableFrom: z.string().optional(),
        availableTo: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Check if email already registered
        const existingDriver = await getDriverByEmail(input.email);
        if (existingDriver) {
          throw new TRPCError({ 
            code: 'CONFLICT', 
            message: 'A driver with this email already exists' 
          });
        }

        // Create driver record
        const driver = await createDriver({
          ...input,
          status: "pending"
        });

        // Create application record
        await createDriverApplication({
          driverId: driver.id,
          status: "submitted"
        });

        // Notify owner of new application
        try {
          await notifyOwner({
            title: `🚗 New Driver Application: ${input.fullName}`,
            content: `**New Driver Registration**

**Name:** ${input.fullName}
**Email:** ${input.email}
**Phone:** ${input.phone}
**Van:** ${input.vanMake || 'Not specified'} ${input.vanModel || ''} (${input.vanCapacity || 'medium'})
**Location:** ${input.postcode || 'Not specified'}

Review this application in the admin panel.`
          });
        } catch (error) {
          console.error("Failed to send driver application notification:", error);
        }

        return { success: true, driverId: driver.id };
      }),

    // Get current driver profile (for logged-in drivers)
    me: driverProcedure.query(async ({ ctx }) => {
      if (!ctx.user) return null;
      return getDriverByUserId(ctx.user.id);
    }),

    // Update own profile
    updateProfile: driverProcedure
      .input(z.object({
        phone: z.string().optional(),
        address: z.string().optional(),
        postcode: z.string().optional(),
        vanMake: z.string().optional(),
        vanModel: z.string().optional(),
        vanYear: z.number().optional(),
        vanRegistration: z.string().optional(),
        vanCapacity: z.enum(["small", "medium", "large", "luton"]).optional(),
        serviceAreas: z.string().optional(),
        servicesOffered: z.string().optional(),
        maxDistanceKm: z.number().optional(),
        availableDays: z.string().optional(),
        availableFrom: z.string().optional(),
        availableTo: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const driver = await getDriverByUserId(ctx.user!.id);
        if (!driver) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Driver profile not found' });
        }
        await updateDriver(driver.id, input);
        return { success: true };
      }),

    // Toggle availability
    setAvailability: driverProcedure
      .input(z.object({ isAvailable: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        const driver = await getDriverByUserId(ctx.user!.id);
        if (!driver) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Driver profile not found' });
        }
        await updateDriverAvailability(driver.id, input.isAvailable);
        return { success: true };
      }),

    // Admin: List all drivers
    list: adminProcedure.query(async () => {
      return getAllDrivers();
    }),

    // Admin: Get drivers by status
    listByStatus: adminProcedure
      .input(z.object({ status: z.enum(["pending", "approved", "rejected", "suspended", "inactive"]) }))
      .query(async ({ input }) => {
        return getDriversByStatus(input.status);
      }),

    // Admin: Get available drivers for job assignment
    listAvailable: adminProcedure.query(async () => {
      return getApprovedAvailableDrivers();
    }),

    // Admin: Get single driver
    get: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getDriverById(input.id);
      }),

    // Admin: Approve driver
    approve: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await updateDriverStatus(input.id, "approved", ctx.user!.id);
        
        const driver = await getDriverById(input.id);
        if (driver) {
          // Update application status
          const application = await getDriverApplicationByDriverId(input.id);
          if (application) {
            await updateDriverApplication(application.id, {
              status: "approved",
              reviewedBy: ctx.user!.id,
              reviewedAt: new Date()
            });
          }
        }
        
        return { success: true };
      }),

    // Admin: Reject driver
    reject: adminProcedure
      .input(z.object({ 
        id: z.number(),
        reason: z.string().optional()
      }))
      .mutation(async ({ ctx, input }) => {
        await updateDriverStatus(input.id, "rejected", undefined, input.reason);
        
        const application = await getDriverApplicationByDriverId(input.id);
        if (application) {
          await updateDriverApplication(application.id, {
            status: "rejected",
            reviewedBy: ctx.user!.id,
            reviewedAt: new Date(),
            reviewNotes: input.reason
          });
        }
        
        return { success: true };
      }),

    // Admin: Suspend driver
    suspend: adminProcedure
      .input(z.object({ 
        id: z.number(),
        reason: z.string().optional()
      }))
      .mutation(async ({ input }) => {
        await updateDriverStatus(input.id, "suspended", undefined, input.reason);
        return { success: true };
      }),
  }),

  // Job management
  jobs: router({
    // Admin: Create a new job
    create: adminProcedure
      .input(z.object({
        leadId: z.number().optional(),
        quoteId: z.number().optional(),
        jobType: z.enum(["house_removal", "furniture_delivery", "office_move", "courier"]),
        title: z.string(),
        description: z.string().optional(),
        pickupAddress: z.string(),
        pickupPostcode: z.string().optional(),
        pickupContactName: z.string().optional(),
        pickupContactPhone: z.string().optional(),
        deliveryAddress: z.string(),
        deliveryPostcode: z.string().optional(),
        deliveryContactName: z.string().optional(),
        deliveryContactPhone: z.string().optional(),
        scheduledDate: z.string(),
        scheduledTime: z.string().optional(),
        estimatedDuration: z.number().optional(),
        customerPrice: z.string(),
        distanceKm: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createJob(input);
      }),

    // Admin: List all jobs
    list: adminProcedure.query(async () => {
      return getAllJobs();
    }),

    // Admin: List jobs by status
    listByStatus: adminProcedure
      .input(z.object({ status: z.enum(["pending", "assigned", "accepted", "in_progress", "completed", "cancelled", "disputed"]) }))
      .query(async ({ input }) => {
        return getJobsByStatus(input.status);
      }),

    // Admin: Get single job
    get: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getJobById(input.id);
      }),

    // Admin: Assign job to driver
    assign: adminProcedure
      .input(z.object({
        jobId: z.number(),
        driverId: z.number(),
        driverPayout: z.string()
      }))
      .mutation(async ({ ctx, input }) => {
        await assignJobToDriver(input.jobId, input.driverId, input.driverPayout, ctx.user!.id);
        
        // Notify driver (if we had their contact)
        const driver = await getDriverById(input.driverId);
        const job = await getJobById(input.jobId);
        
        if (driver && job) {
          // Increment driver's total jobs
          await incrementDriverJobCount(input.driverId, false);
        }
        
        return { success: true };
      }),

    // Admin: Update job
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        data: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          scheduledDate: z.string().optional(),
          scheduledTime: z.string().optional(),
          customerPrice: z.string().optional(),
          driverPayout: z.string().optional(),
          notes: z.string().optional(),
        })
      }))
      .mutation(async ({ input }) => {
        await updateJob(input.id, input.data);
        return { success: true };
      }),

    // Admin: Cancel job
    cancel: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await updateJobStatus(input.id, "cancelled");
        return { success: true };
      }),

    // Driver: Get my jobs
    myJobs: driverProcedure.query(async ({ ctx }) => {
      const driver = await getDriverByUserId(ctx.user!.id);
      if (!driver) return [];
      return getJobsByDriverId(driver.id);
    }),

    // Driver: Get active jobs
    myActiveJobs: driverProcedure.query(async ({ ctx }) => {
      const driver = await getDriverByUserId(ctx.user!.id);
      if (!driver) return [];
      return getActiveJobsByDriverId(driver.id);
    }),

    // Driver: Accept job
    accept: driverProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const driver = await getDriverByUserId(ctx.user!.id);
        if (!driver) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Driver profile not found' });
        }
        
        const job = await getJobById(input.id);
        if (!job || job.driverId !== driver.id) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'This job is not assigned to you' });
        }
        
        await updateJobStatus(input.id, "accepted");
        return { success: true };
      }),

    // Driver: Start job
    start: driverProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const driver = await getDriverByUserId(ctx.user!.id);
        if (!driver) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Driver profile not found' });
        }
        
        const job = await getJobById(input.id);
        if (!job || job.driverId !== driver.id) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'This job is not assigned to you' });
        }
        
        await updateJobStatus(input.id, "in_progress");
        return { success: true };
      }),

    // Driver: Complete job
    complete: driverProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const driver = await getDriverByUserId(ctx.user!.id);
        if (!driver) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Driver profile not found' });
        }
        
        const job = await getJobById(input.id);
        if (!job || job.driverId !== driver.id) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'This job is not assigned to you' });
        }
        
        await updateJobStatus(input.id, "completed");
        await incrementDriverJobCount(driver.id, true);
        
        return { success: true };
      }),
  }),

  // Driver applications (admin view)
  applications: router({
    list: adminProcedure.query(async () => {
      return getAllDriverApplications();
    }),

    get: adminProcedure
      .input(z.object({ driverId: z.number() }))
      .query(async ({ input }) => {
        return getDriverApplicationByDriverId(input.driverId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
