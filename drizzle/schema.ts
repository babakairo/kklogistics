import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "driver"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads table - stores customer inquiries and contact information
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  serviceType: mysqlEnum("serviceType", ["house_removal", "furniture_delivery", "office_move", "courier"]).notNull(),
  message: text("message"),
  pickupAddress: text("pickupAddress"),
  deliveryAddress: text("deliveryAddress"),
  preferredDate: varchar("preferredDate", { length: 50 }),
  status: mysqlEnum("status", ["new", "contacted", "quoted", "booked", "completed", "cancelled"]).default("new").notNull(),
  source: mysqlEnum("source", ["form", "chatbot", "quote_calculator", "phone"]).default("form").notNull(),
  notificationSent: boolean("notificationSent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Quotes table - stores generated quotes for customers
 */
export const quotes = mysqlTable("quotes", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").references(() => leads.id),
  serviceType: mysqlEnum("serviceType", ["house_removal", "furniture_delivery", "office_move", "courier"]).notNull(),
  pickupAddress: text("pickupAddress").notNull(),
  deliveryAddress: text("deliveryAddress").notNull(),
  distanceKm: decimal("distanceKm", { precision: 10, scale: 2 }),
  itemCount: int("itemCount"),
  estimatedPrice: decimal("estimatedPrice", { precision: 10, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

/**
 * Chat conversations table - stores chatbot sessions
 */
export const chatConversations = mysqlTable("chatConversations", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(),
  leadId: int("leadId").references(() => leads.id),
  customerName: varchar("customerName", { length: 255 }),
  customerPhone: varchar("customerPhone", { length: 20 }),
  customerEmail: varchar("customerEmail", { length: 320 }),
  isQualified: boolean("isQualified").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;

/**
 * Chat messages table - stores individual messages in conversations
 */
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").references(() => chatConversations.id).notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Drivers table - stores registered driver information
 */
export const drivers = mysqlTable("drivers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  // Personal info
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: text("address"),
  postcode: varchar("postcode", { length: 10 }),
  dateOfBirth: varchar("dateOfBirth", { length: 20 }),
  // License info
  drivingLicenseNumber: varchar("drivingLicenseNumber", { length: 50 }),
  licenseExpiryDate: varchar("licenseExpiryDate", { length: 20 }),
  // Van details
  vanMake: varchar("vanMake", { length: 100 }),
  vanModel: varchar("vanModel", { length: 100 }),
  vanYear: int("vanYear"),
  vanRegistration: varchar("vanRegistration", { length: 20 }),
  vanCapacity: mysqlEnum("vanCapacity", ["small", "medium", "large", "luton"]).default("medium"),
  // Insurance
  insuranceProvider: varchar("insuranceProvider", { length: 255 }),
  insurancePolicyNumber: varchar("insurancePolicyNumber", { length: 100 }),
  insuranceExpiryDate: varchar("insuranceExpiryDate", { length: 20 }),
  hasGoodsInTransitInsurance: boolean("hasGoodsInTransitInsurance").default(false),
  // Service preferences
  serviceAreas: text("serviceAreas"), // JSON array of areas they cover
  servicesOffered: text("servicesOffered"), // JSON array of service types
  maxDistanceKm: int("maxDistanceKm").default(50),
  // Availability
  availableDays: text("availableDays"), // JSON array of days
  availableFrom: varchar("availableFrom", { length: 10 }), // e.g., "07:00"
  availableTo: varchar("availableTo", { length: 10 }), // e.g., "21:00"
  isAvailable: boolean("isAvailable").default(true),
  // Status
  status: mysqlEnum("status", ["pending", "approved", "rejected", "suspended", "inactive"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  approvedAt: timestamp("approvedAt"),
  approvedBy: int("approvedBy"),
  // Ratings
  totalJobs: int("totalJobs").default(0),
  completedJobs: int("completedJobs").default(0),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default("0"),
  // Notes
  adminNotes: text("adminNotes"),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Driver = typeof drivers.$inferSelect;
export type InsertDriver = typeof drivers.$inferInsert;

/**
 * Jobs table - stores delivery/removal jobs that can be assigned to drivers
 */
export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").references(() => leads.id),
  quoteId: int("quoteId").references(() => quotes.id),
  driverId: int("driverId").references(() => drivers.id),
  // Job details
  jobType: mysqlEnum("jobType", ["house_removal", "furniture_delivery", "office_move", "courier"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  // Addresses
  pickupAddress: text("pickupAddress").notNull(),
  pickupPostcode: varchar("pickupPostcode", { length: 10 }),
  pickupContactName: varchar("pickupContactName", { length: 255 }),
  pickupContactPhone: varchar("pickupContactPhone", { length: 20 }),
  deliveryAddress: text("deliveryAddress").notNull(),
  deliveryPostcode: varchar("deliveryPostcode", { length: 10 }),
  deliveryContactName: varchar("deliveryContactName", { length: 255 }),
  deliveryContactPhone: varchar("deliveryContactPhone", { length: 20 }),
  // Scheduling
  scheduledDate: varchar("scheduledDate", { length: 20 }).notNull(),
  scheduledTime: varchar("scheduledTime", { length: 20 }),
  estimatedDuration: int("estimatedDuration"), // in minutes
  // Pricing
  customerPrice: decimal("customerPrice", { precision: 10, scale: 2 }).notNull(),
  driverPayout: decimal("driverPayout", { precision: 10, scale: 2 }),
  distanceKm: decimal("distanceKm", { precision: 10, scale: 2 }),
  // Status tracking
  status: mysqlEnum("status", [
    "pending",      // Job created, not yet assigned
    "assigned",     // Assigned to driver, awaiting acceptance
    "accepted",     // Driver accepted the job
    "in_progress",  // Driver is currently doing the job
    "completed",    // Job completed successfully
    "cancelled",    // Job was cancelled
    "disputed"      // There's an issue with the job
  ]).default("pending").notNull(),
  // Driver response
  driverAcceptedAt: timestamp("driverAcceptedAt"),
  driverStartedAt: timestamp("driverStartedAt"),
  driverCompletedAt: timestamp("driverCompletedAt"),
  // Customer feedback
  customerRating: int("customerRating"), // 1-5
  customerFeedback: text("customerFeedback"),
  // Admin
  assignedBy: int("assignedBy"),
  notes: text("notes"),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;

/**
 * Driver applications table - tracks the application process
 */
export const driverApplications = mysqlTable("driverApplications", {
  id: int("id").autoincrement().primaryKey(),
  driverId: int("driverId").references(() => drivers.id).notNull(),
  // Application status
  status: mysqlEnum("status", ["submitted", "under_review", "documents_requested", "approved", "rejected"]).default("submitted").notNull(),
  // Document uploads (S3 URLs)
  drivingLicenseUrl: text("drivingLicenseUrl"),
  insuranceDocumentUrl: text("insuranceDocumentUrl"),
  vehiclePhotoUrl: text("vehiclePhotoUrl"),
  proofOfAddressUrl: text("proofOfAddressUrl"),
  // Review process
  reviewedBy: int("reviewedBy"),
  reviewedAt: timestamp("reviewedAt"),
  reviewNotes: text("reviewNotes"),
  // Timestamps
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DriverApplication = typeof driverApplications.$inferSelect;
export type InsertDriverApplication = typeof driverApplications.$inferInsert;
