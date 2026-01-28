import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  InsertLead, leads, Lead,
  InsertQuote, quotes, Quote,
  InsertChatConversation, chatConversations, ChatConversation,
  InsertChatMessage, chatMessages, ChatMessage
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER QUERIES ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ LEAD QUERIES ============

export async function createLead(lead: InsertLead): Promise<Lead> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(leads).values(lead);
  const insertId = result[0].insertId;
  
  const [newLead] = await db.select().from(leads).where(eq(leads.id, insertId));
  return newLead;
}

export async function getLeadById(id: number): Promise<Lead | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0];
}

export async function getAllLeads(): Promise<Lead[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function updateLeadStatus(id: number, status: Lead["status"]): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(leads).set({ status }).where(eq(leads.id, id));
}

export async function markLeadNotified(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(leads).set({ notificationSent: true }).where(eq(leads.id, id));
}

// ============ QUOTE QUERIES ============

export async function createQuote(quote: InsertQuote): Promise<Quote> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(quotes).values(quote);
  const insertId = result[0].insertId;
  
  const [newQuote] = await db.select().from(quotes).where(eq(quotes.id, insertId));
  return newQuote;
}

export async function getQuotesByLeadId(leadId: number): Promise<Quote[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(quotes).where(eq(quotes.leadId, leadId)).orderBy(desc(quotes.createdAt));
}

// ============ CHAT QUERIES ============

export async function createChatConversation(conversation: InsertChatConversation): Promise<ChatConversation> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(chatConversations).values(conversation);
  const insertId = result[0].insertId;
  
  const [newConversation] = await db.select().from(chatConversations).where(eq(chatConversations.id, insertId));
  return newConversation;
}

export async function getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(chatConversations).where(eq(chatConversations.sessionId, sessionId)).limit(1);
  return result[0];
}

export async function updateChatConversation(
  sessionId: string, 
  data: Partial<Pick<ChatConversation, "customerName" | "customerPhone" | "customerEmail" | "isQualified" | "leadId">>
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(chatConversations).set(data).where(eq(chatConversations.sessionId, sessionId));
}

export async function createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(chatMessages).values(message);
  const insertId = result[0].insertId;
  
  const [newMessage] = await db.select().from(chatMessages).where(eq(chatMessages.id, insertId));
  return newMessage;
}

export async function getChatMessagesByConversationId(conversationId: number): Promise<ChatMessage[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(chatMessages).where(eq(chatMessages.conversationId, conversationId)).orderBy(chatMessages.createdAt);
}


// ============ DRIVER QUERIES ============

import { 
  InsertDriver, drivers, Driver,
  InsertJob, jobs, Job,
  InsertDriverApplication, driverApplications, DriverApplication
} from "../drizzle/schema";

export async function createDriver(driver: InsertDriver): Promise<Driver> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(drivers).values(driver);
  const insertId = result[0].insertId;
  
  const [newDriver] = await db.select().from(drivers).where(eq(drivers.id, insertId));
  return newDriver;
}

export async function getDriverById(id: number): Promise<Driver | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(drivers).where(eq(drivers.id, id)).limit(1);
  return result[0];
}

export async function getDriverByUserId(userId: number): Promise<Driver | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(drivers).where(eq(drivers.userId, userId)).limit(1);
  return result[0];
}

export async function getDriverByEmail(email: string): Promise<Driver | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(drivers).where(eq(drivers.email, email)).limit(1);
  return result[0];
}

export async function getAllDrivers(): Promise<Driver[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(drivers).orderBy(desc(drivers.createdAt));
}

export async function getDriversByStatus(status: Driver["status"]): Promise<Driver[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(drivers).where(eq(drivers.status, status)).orderBy(desc(drivers.createdAt));
}

export async function getApprovedAvailableDrivers(): Promise<Driver[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(drivers)
    .where(eq(drivers.status, "approved"))
    .orderBy(desc(drivers.averageRating));
}

export async function updateDriver(id: number, data: Partial<Driver>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(drivers).set(data).where(eq(drivers.id, id));
}

export async function updateDriverStatus(
  id: number, 
  status: Driver["status"], 
  approvedBy?: number,
  rejectionReason?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  const updateData: Partial<Driver> = { status };
  
  if (status === "approved" && approvedBy) {
    updateData.approvedAt = new Date();
    updateData.approvedBy = approvedBy;
  }
  
  if (status === "rejected" && rejectionReason) {
    updateData.rejectionReason = rejectionReason;
  }
  
  await db.update(drivers).set(updateData).where(eq(drivers.id, id));
}

export async function updateDriverAvailability(id: number, isAvailable: boolean): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(drivers).set({ isAvailable }).where(eq(drivers.id, id));
}

export async function incrementDriverJobCount(id: number, completed: boolean = false): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  const driver = await getDriverById(id);
  if (!driver) return;
  
  const updateData: Partial<Driver> = {
    totalJobs: (driver.totalJobs || 0) + 1
  };
  
  if (completed) {
    updateData.completedJobs = (driver.completedJobs || 0) + 1;
  }
  
  await db.update(drivers).set(updateData).where(eq(drivers.id, id));
}

// ============ JOB QUERIES ============

export async function createJob(job: InsertJob): Promise<Job> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(jobs).values(job);
  const insertId = result[0].insertId;
  
  const [newJob] = await db.select().from(jobs).where(eq(jobs.id, insertId));
  return newJob;
}

export async function getJobById(id: number): Promise<Job | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  return result[0];
}

export async function getAllJobs(): Promise<Job[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(jobs).orderBy(desc(jobs.createdAt));
}

export async function getJobsByStatus(status: Job["status"]): Promise<Job[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(jobs).where(eq(jobs.status, status)).orderBy(desc(jobs.createdAt));
}

export async function getJobsByDriverId(driverId: number): Promise<Job[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(jobs).where(eq(jobs.driverId, driverId)).orderBy(desc(jobs.createdAt));
}

export async function getActiveJobsByDriverId(driverId: number): Promise<Job[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(jobs)
    .where(eq(jobs.driverId, driverId))
    .orderBy(desc(jobs.scheduledDate));
}

export async function updateJob(id: number, data: Partial<Job>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(jobs).set(data).where(eq(jobs.id, id));
}

export async function updateJobStatus(id: number, status: Job["status"]): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  const updateData: Partial<Job> = { status };
  
  if (status === "accepted") {
    updateData.driverAcceptedAt = new Date();
  } else if (status === "in_progress") {
    updateData.driverStartedAt = new Date();
  } else if (status === "completed") {
    updateData.driverCompletedAt = new Date();
  }
  
  await db.update(jobs).set(updateData).where(eq(jobs.id, id));
}

export async function assignJobToDriver(jobId: number, driverId: number, driverPayout: string, assignedBy: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(jobs).set({
    driverId,
    driverPayout,
    assignedBy,
    status: "assigned"
  }).where(eq(jobs.id, jobId));
}

// ============ DRIVER APPLICATION QUERIES ============

export async function createDriverApplication(application: InsertDriverApplication): Promise<DriverApplication> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(driverApplications).values(application);
  const insertId = result[0].insertId;
  
  const [newApplication] = await db.select().from(driverApplications).where(eq(driverApplications.id, insertId));
  return newApplication;
}

export async function getDriverApplicationByDriverId(driverId: number): Promise<DriverApplication | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(driverApplications).where(eq(driverApplications.driverId, driverId)).limit(1);
  return result[0];
}

export async function getAllDriverApplications(): Promise<DriverApplication[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(driverApplications).orderBy(desc(driverApplications.submittedAt));
}

export async function updateDriverApplication(id: number, data: Partial<DriverApplication>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(driverApplications).set(data).where(eq(driverApplications.id, id));
}
