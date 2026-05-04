import type { backendInterface, UserProfile, SavingsPlan, AIReport, AdminStats, DailyTask, Expense, PremiumSubscription, UserRole } from "../backend";

const sampleProfile: UserProfile = {
  id: "user-1",
  age: BigInt(24),
  principal: { toText: () => "user-principal-1" } as any,
  primaryGoal: "save money",
  debtAmount: 15000,
  familyResponsibility: "self",
  isPremium: false,
  city: "Mumbai",
  name: "Rahul Sharma",
  createdAt: BigInt(Date.now()),
  gender: "Male",
  careerInterest: "Software Engineering",
  businessInterest: "Digital Marketing",
  currentSavings: 8000,
  currentStudy: "B.Tech CSE",
  skills: ["JavaScript", "Python", "Communication"],
  educationLevel: "graduation",
  riskLevel: "medium",
  monthlyExpenses: 18000,
  monthlyIncome: 25000,
};

const sampleSavingsPlan: SavingsPlan = {
  suggestions: [
    "Reduce food delivery expenses by ₹1,500/month",
    "Cancel unused subscriptions saving ₹500/month",
    "Use public transport instead of cab to save ₹1,000/month",
    "Cook meals at home 5 days a week",
    "Set up automatic savings transfer on salary day",
  ],
  dailyTarget: 233,
  userId: "user-1",
  emergencyFundCurrent: 8000,
  habits: [
    "Track every expense daily",
    "Avoid impulse purchases",
    "Review budget weekly",
    "Pack lunch 4 days a week",
  ],
  emergencyFundTarget: 75000,
  monthlyTarget: 7000,
  debtPlan: "Pay ₹2,000/month towards debt to clear in 8 months",
  weeklyTarget: 1750,
};

const sampleAIReport: AIReport = {
  suggestions: [
    "Based on your profile, switching to a skill-based career could increase income by 40% in 2 years",
    "Start a small digital marketing side project for extra ₹5,000-10,000/month income",
    "Invest ₹500/month in index funds for long-term wealth building",
    "Clear your ₹15,000 debt in 8 months with ₹2,000 monthly payments",
  ],
  userId: "user-1",
  generatedAt: BigInt(Date.now()),
  budgetBreakdown: [
    ["Housing", 8000],
    ["Food", 4000],
    ["Transport", 2500],
    ["Entertainment", 2000],
    ["Savings", 7000],
    ["Debt Payment", 2000],
  ],
};

const sampleAdminStats: AdminStats = {
  popularBusinessIdeas: ["Digital Marketing Agency", "Cloud Kitchen", "E-commerce Store", "Freelancing", "Coaching Center"],
  premiumUsers: BigInt(127),
  popularCareers: ["Software Engineering", "Digital Marketing", "Data Science", "CA/Finance", "Government Exams"],
  totalUsers: BigInt(843),
  totalRevenue: 89473,
};

const sampleDailyTasks: DailyTask[] = [
  { id: "task-1", userId: "user-1", date: BigInt(Date.now()), text: "Track all expenses for today", completed: true },
  { id: "task-2", userId: "user-1", date: BigInt(Date.now()), text: "Pack lunch instead of ordering food delivery", completed: false },
  { id: "task-3", userId: "user-1", date: BigInt(Date.now()), text: "Transfer ₹233 to savings account", completed: false },
  { id: "task-4", userId: "user-1", date: BigInt(Date.now()), text: "Review monthly budget spreadsheet", completed: false },
  { id: "task-5", userId: "user-1", date: BigInt(Date.now()), text: "Watch 30 mins of skill-building content", completed: true },
];

const sampleExpenses: Expense[] = [
  { id: "exp-1", userId: "user-1", date: BigInt(Date.now() - 86400000), description: "Grocery shopping", category: "Food", amount: 850 },
  { id: "exp-2", userId: "user-1", date: BigInt(Date.now() - 172800000), description: "Zomato order", category: "Food Delivery", amount: 320 },
  { id: "exp-3", userId: "user-1", date: BigInt(Date.now() - 259200000), description: "Uber ride", category: "Transport", amount: 180 },
  { id: "exp-4", userId: "user-1", date: BigInt(Date.now() - 345600000), description: "Netflix subscription", category: "Entertainment", amount: 199 },
  { id: "exp-5", userId: "user-1", date: BigInt(Date.now() - 432000000), description: "Electricity bill", category: "Utilities", amount: 1200 },
];

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  addExpense: async (_expense) => undefined,
  assignCallerUserRole: async (_user, _role) => undefined,
  createCheckoutSession: async (_items, _successUrl, _cancelUrl) => "cs_test_session_123",
  createOrUpdateProfile: async (profile) => profile,
  deleteExpense: async (_expenseId) => undefined,
  generateSavingsPlan: async () => sampleSavingsPlan,
  getAIReport: async () => sampleAIReport,
  getAdminStats: async () => sampleAdminStats,
  getCallerUserProfile: async () => sampleProfile,
  getCallerUserRole: async () => "user" as unknown as UserRole,
  getDailyTasks: async () => sampleDailyTasks,
  getExpenses: async () => sampleExpenses,
  getMySubscription: async () => null,
  getProfile: async () => sampleProfile,
  getSavingsPlan: async () => sampleSavingsPlan,
  getStripeSessionStatus: async (_sessionId) => ({ __kind__: "failed", failed: { error: "Not configured" } }),
  getUserProfile: async (_user) => sampleProfile,
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => false,
  saveCallerUserProfile: async (_profile) => undefined,
  setStripeConfiguration: async (_config) => undefined,
  transform: async (input) => ({ status: BigInt(200), body: input.response.body, headers: [] }),
  updateAIReport: async (_report) => undefined,
  updatePremiumStatus: async (_userId, _isPremium) => undefined,
  updateSavingsPlan: async (_plan) => undefined,
  updateTaskCompletion: async (_taskId, _completed) => undefined,
  upsertSubscription: async (_sub) => undefined,
};
