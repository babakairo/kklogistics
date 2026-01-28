import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createLead: vi.fn().mockResolvedValue({
    id: 1,
    name: "Test Customer",
    phone: "07459920895",
    email: "test@example.com",
    serviceType: "house_removal",
    message: "Test message",
    source: "form",
    status: "new",
    notificationSent: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  getAllLeads: vi.fn().mockResolvedValue([]),
  getLeadById: vi.fn().mockResolvedValue(null),
  updateLeadStatus: vi.fn().mockResolvedValue(undefined),
  markLeadNotified: vi.fn().mockResolvedValue(undefined),
  createQuote: vi.fn().mockResolvedValue({ id: 1 }),
  createChatConversation: vi.fn().mockResolvedValue({ id: 1, sessionId: "test" }),
  getChatConversationBySessionId: vi.fn().mockResolvedValue(null),
  updateChatConversation: vi.fn().mockResolvedValue(undefined),
  createChatMessage: vi.fn().mockResolvedValue({ id: 1 }),
  getChatMessagesByConversationId: vi.fn().mockResolvedValue([]),
}));

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the LLM function
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "Hello! How can I help you today?" } }],
  }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthenticatedContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "owner-id",
      email: "owner@example.com",
      name: "Owner",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("leads.create", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a new lead with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.create({
      name: "John Smith",
      phone: "07459920895",
      email: "john@example.com",
      serviceType: "house_removal",
      message: "Need help moving",
      source: "form",
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.name).toBe("Test Customer");
  });

  it("creates a lead without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.create({
      name: "Jane Doe",
      phone: "07123456789",
      serviceType: "furniture_delivery",
      source: "quote_calculator",
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
  });

  it("validates service type enum", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Valid service types should work
    for (const serviceType of ["house_removal", "furniture_delivery", "office_move", "courier"] as const) {
      const result = await caller.leads.create({
        name: "Test",
        phone: "07123456789",
        serviceType,
        source: "form",
      });
      expect(result).toBeDefined();
    }
  });
});

describe("quotes.create", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a quote with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quotes.create({
      serviceType: "house_removal",
      pickupAddress: "Falkirk",
      deliveryAddress: "Edinburgh",
      estimatedPrice: "150.00",
      itemCount: 10,
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
  });
});

describe("chat.sendMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends a message and receives AI response", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.sendMessage({
      sessionId: "test-session-123",
      message: "What services do you offer?",
      conversationHistory: [],
    });

    expect(result).toBeDefined();
    expect(result.response).toBe("Hello! How can I help you today?");
  });

  it("handles conversation history", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.sendMessage({
      sessionId: "test-session-456",
      message: "How much for a house move?",
      conversationHistory: [
        { role: "assistant", content: "Hi! How can I help?" },
        { role: "user", content: "I need a quote" },
      ],
    });

    expect(result).toBeDefined();
    expect(result.response).toBeTruthy();
  });
});
