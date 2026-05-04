import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Expense {
    id: UserId;
    userId: string;
    date: Timestamp;
    description: string;
    category: string;
    amount: number;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type UserId = string;
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface AdminStats {
    popularBusinessIdeas: Array<string>;
    premiumUsers: bigint;
    popularCareers: Array<string>;
    totalUsers: bigint;
    totalRevenue: number;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface AIReport {
    suggestions: Array<string>;
    userId: string;
    generatedAt: Timestamp;
    budgetBreakdown: Array<[string, number]>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface SavingsPlan {
    suggestions: Array<string>;
    dailyTarget: number;
    userId: string;
    emergencyFundCurrent: number;
    habits: Array<string>;
    emergencyFundTarget: number;
    monthlyTarget: number;
    debtPlan: string;
    weeklyTarget: number;
}
export interface PremiumSubscription {
    status: string;
    userId: string;
    plan: string;
    currentPeriodEnd: Timestamp;
    stripeCustomerId: string;
}
export interface UserProfile {
    id: UserId;
    age: bigint;
    principal: Principal;
    debtAmount: bigint;
    familyResponsibility: string;
    isPremium: boolean;
    city: string;
    goal: string;
    name: string;
    createdAt: Timestamp;
    gender?: string;
    careerInterest: string;
    businessInterest: string;
    currentSavings: bigint;
    skills: string;
    educationLevel: string;
    riskLevel: string;
    currentStatus: string;
    monthlyExpenses: bigint;
    monthlyIncome: bigint;
}
export interface DailyTask {
    id: UserId;
    userId: string;
    date: Timestamp;
    text: string;
    completed: boolean;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addExpense(expense: Expense): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrUpdateProfile(profile: UserProfile): Promise<UserProfile>;
    deleteExpense(expenseId: string): Promise<void>;
    generateSavingsPlan(): Promise<SavingsPlan>;
    getAIReport(): Promise<AIReport | null>;
    getAdminStats(): Promise<AdminStats>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDailyTasks(): Promise<Array<DailyTask>>;
    getExpenses(): Promise<Array<Expense>>;
    getMySubscription(): Promise<PremiumSubscription | null>;
    getProfile(): Promise<UserProfile | null>;
    getSavingsPlan(): Promise<SavingsPlan | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAIReport(report: AIReport): Promise<void>;
    updatePremiumStatus(userId: string, isPremium: boolean): Promise<void>;
    updateSavingsPlan(plan: SavingsPlan): Promise<void>;
    updateTaskCompletion(taskId: string, completed: boolean): Promise<void>;
    upsertSubscription(sub: PremiumSubscription): Promise<void>;
}
