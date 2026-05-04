export interface UserProfile {
  id: string;
  principal: { toText: () => string } | string;
  age: bigint;
  gender?: string;
  city: string;
  educationLevel: string;
  currentStatus: string;
  monthlyIncome: bigint;
  monthlyExpenses: bigint;
  familyResponsibility: string;
  currentSavings: bigint;
  debtAmount: bigint;
  careerInterest: string;
  skills: string;
  businessInterest: string;
  riskLevel: string;
  goal: string;
  isPremium: boolean;
  createdAt: bigint;
  name: string;
}

export interface Expense {
  id: bigint;
  category: string;
  amount: bigint;
  description: string;
  date: bigint;
}

export interface SavingsPlan {
  monthlyIncome: bigint;
  monthlyExpenses: bigint;
  savingGoal: bigint;
  dailyTarget: bigint;
  weeklyTarget: bigint;
  emergencyFund: bigint;
  debtReduction: bigint;
  suggestions: string[];
  habitChecklist: string[];
  lastUpdated: bigint;
}

export interface AIReport {
  savingsScore: bigint;
  careerProgress: bigint;
  businessReadiness: bigint;
  recommendations: string[];
  lifeplanPhase: string;
  generatedAt: bigint;
}

export interface DailyTask {
  id: bigint;
  title: string;
  category: string;
  completed: boolean;
  dueDate: bigint;
}

export interface PremiumSubscription {
  plan: string;
  status: string;
  startDate: bigint;
  endDate: bigint;
  stripeSessionId: string;
}

export interface AdminStats {
  totalUsers: bigint;
  premiumUsers: bigint;
  totalRevenue: bigint;
  popularCareers: string[];
  popularBusinessIdeas: string[];
}

export type RiskLevel = "low" | "medium" | "high";
export type GoalType = "save" | "business" | "career" | "education" | "income";
export type PlanType =
  | "basic"
  | "premium_monthly"
  | "premium_yearly"
  | "lifetime";
