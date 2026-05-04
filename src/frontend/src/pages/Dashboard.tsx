import { createActor } from "@/backend";
import { FeatureLockOverlay } from "@/components/FeatureLockOverlay";
import { Layout } from "@/components/Layout";
import { ProgressRing } from "@/components/ProgressRing";
import { SavingsCard } from "@/components/SavingsCard";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useExpenses } from "@/hooks/useExpenses";
import { useProfile } from "@/hooks/useProfile";
import { useSavingsPlan } from "@/hooks/useSavingsPlan";
import { useSubscription } from "@/hooks/useSubscription";
import type { AIReport, DailyTask } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  CreditCard,
  Crown,
  DollarSign,
  Flame,
  Lightbulb,
  ListTodo,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip as RTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function fmt(n: bigint | number) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function todayLabel() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const PIE_COLORS = [
  "oklch(0.65 0.2 190)",
  "oklch(0.72 0.15 60)",
  "oklch(0.6 0.18 280)",
  "oklch(0.55 0.16 150)",
  "oklch(0.55 0.22 25)",
  "oklch(0.4 0.1 260)",
];

const _CATEGORY_ICONS: Record<string, typeof Wallet> = {
  food: Flame,
  transport: TrendingDown,
  shopping: DollarSign,
  education: BookOpen,
  health: ShieldCheck,
  entertainment: Brain,
};

const AI_RECOMMENDATION_DATA = [
  {
    icon: TrendingDown,
    title: "Reduce Food Delivery Spend",
    description:
      "Based on your profile, cutting food delivery by ₹1,500/month may help you reach your savings goal 2 months faster.",
    tag: "Estimated savings: ₹18,000/year",
    color: "destructive" as const,
  },
  {
    icon: PiggyBank,
    title: "Automate Your Daily Savings",
    description:
      "Setting up a daily auto-transfer of your suggested daily target may help build the saving habit consistently.",
    tag: "Suggested habit",
    color: "primary" as const,
  },
  {
    icon: ShieldCheck,
    title: "Build Emergency Fund First",
    description:
      "Suggested priority: reach 3 months of expenses as emergency fund before investing. Expected range: 4–6 months.",
    tag: "Based on your profile",
    color: "accent" as const,
  },
  {
    icon: Brain,
    title: "Upskill for Income Growth",
    description:
      "Based on your career interest, a 3-month online certification may help increase earning potential by an estimated 15–30%.",
    tag: "May help you",
    color: "primary" as const,
  },
  {
    icon: Lightbulb,
    title: "Side Income Opportunity",
    description:
      "Based on your skills, freelancing 8–10 hours/week could generate an estimated ₹5,000–₹15,000 additional monthly income.",
    tag: "Estimated range",
    color: "accent" as const,
  },
];

function useTasks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DailyTask[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { listMyTasks: () => Promise<DailyTask[]> }
      ).listMyTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

function useAIReport() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AIReport | null>({
    queryKey: ["aiReport"],
    queryFn: async () => {
      if (!actor) return null;
      const r = await (
        actor as unknown as { getMyReport: () => Promise<[] | [AIReport]> }
      ).getMyReport();
      return Array.isArray(r) && r.length > 0 ? (r[0] as AIReport) : null;
    },
    enabled: !!actor && !isFetching,
  });
}

function useCompleteTask() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) return;
      await (
        actor as unknown as { setTaskCompleted: (id: bigint) => Promise<void> }
      ).setTaskCompleted(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

function buildSavingsTrend(
  monthlyGoal: number,
): { month: string; amount: number }[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((m, i) => ({
    month: m,
    amount: Math.round(monthlyGoal * (i + 1) * 1.03 ** i),
  }));
}

function buildExpensePie(expenses: { category: string; amount: bigint }[]) {
  const map: Record<string, number> = {};
  for (const e of expenses) {
    const cat = e.category.toLowerCase();
    map[cat] = (map[cat] ?? 0) + Number(e.amount);
  }
  if (Object.keys(map).length === 0) {
    return [
      { name: "Food", value: 8000 },
      { name: "Transport", value: 3000 },
      { name: "Shopping", value: 4500 },
      { name: "Entertainment", value: 2000 },
      { name: "Other", value: 2500 },
    ];
  }
  return Object.entries(map).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));
}

// ── Loading skeleton ────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-6 space-y-6"
        data-ocid="dashboard.loading_state"
      >
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-44" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-40 rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    </Layout>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: plan, isLoading: loadingPlan } = useSavingsPlan();
  const { data: sub } = useSubscription();
  const { data: expenses = [], isLoading: loadingExpenses } = useExpenses();
  const { data: tasks = [], isLoading: loadingTasks } = useTasks();
  const { data: report } = useAIReport();
  const completeTask = useCompleteTask();

  const isPremium = sub?.status === "active";

  // Redirect if no profile
  useEffect(() => {
    if (!loadingProfile && !profile) {
      navigate({ to: "/onboarding" });
    }
  }, [profile, loadingProfile, navigate]);

  if (loadingProfile || loadingPlan) return <DashboardSkeleton />;
  if (!profile) return null;

  const income = plan
    ? Number(plan.monthlyIncome)
    : Number(profile.monthlyIncome);
  const expensesAmt = plan
    ? Number(plan.monthlyExpenses)
    : Number(profile.monthlyExpenses);
  const savings = income - expensesAmt;
  const savingGoal = plan ? Number(plan.savingGoal) : savings;
  const dailyTarget = plan
    ? Number(plan.dailyTarget)
    : Math.round(savings / 30);
  const weeklyTarget = plan
    ? Number(plan.weeklyTarget)
    : Math.round(savings / 4);
  const emergencyFund = plan ? Number(plan.emergencyFund) : expensesAmt * 3;
  const currentSavings = Number(profile.currentSavings);
  const savingsScore = report
    ? Number(report.savingsScore)
    : Math.min(100, Math.round((savings / Math.max(income, 1)) * 500));
  const careerProgress = report ? Number(report.careerProgress) : 0;
  const businessReadiness = report ? Number(report.businessReadiness) : 0;

  const emergencyPct =
    emergencyFund > 0
      ? Math.min(100, Math.round((currentSavings / emergencyFund) * 100))
      : 0;
  const monthsToEmergency =
    emergencyFund > 0 && savings > 0
      ? Math.ceil((emergencyFund - currentSavings) / savings)
      : null;

  const trendData = buildSavingsTrend(savingGoal);
  const pieData = buildExpensePie(expenses);

  const aiRecs = isPremium
    ? AI_RECOMMENDATION_DATA
    : AI_RECOMMENDATION_DATA.slice(0, 3);

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-6 pb-24 md:pb-6 space-y-6"
        data-ocid="dashboard.page"
      >
        {/* ── Greeting header ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-tight">
              {getGreeting()}, {profile.name}!{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Here is your financial overview · {todayLabel()}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isPremium ? (
              <Badge className="bg-accent/15 text-accent border-accent/30 gap-1 font-semibold">
                <Crown className="w-3 h-3" /> Premium
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-muted-foreground text-xs"
              >
                Free Plan
              </Badge>
            )}
          </div>
        </motion.div>

        {/* ── Top 4 stat cards ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          data-ocid="dashboard.stats_section"
        >
          {(
            [
              {
                icon: Wallet,
                label: "Monthly Income",
                value: fmt(income),
                subtitle: "Estimated",
                accentColor: "primary" as const,
                ocid: "dashboard.stat_card.1",
              },
              {
                icon: CreditCard,
                label: "Monthly Expenses",
                value: fmt(expensesAmt),
                subtitle: "Estimated",
                accentColor: "destructive" as const,
                ocid: "dashboard.stat_card.2",
              },
              {
                icon: PiggyBank,
                label: "Current Savings",
                value: fmt(currentSavings),
                subtitle: "Saved so far",
                accentColor: "success" as const,
                ocid: "dashboard.stat_card.3",
              },
              {
                icon: Target,
                label: "Saving Score",
                value: `${savingsScore}/100`,
                subtitle: "Based on your profile",
                accentColor: "accent" as const,
                ocid: "dashboard.stat_card.4",
              },
            ] as const
          ).map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.07 }}
              data-ocid={s.ocid}
            >
              <StatCard
                icon={s.icon}
                label={s.label}
                value={s.value}
                subtitle={s.subtitle}
                accentColor={s.accentColor}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Saving targets row ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-foreground">
              Savings Targets{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (Suggested)
              </span>
            </h2>
          </div>
          <div
            className="grid grid-cols-3 gap-3"
            data-ocid="dashboard.savings_targets_section"
          >
            <SavingsCard
              icon={Calendar}
              title="Daily Target"
              amount={`${fmt(dailyTarget)}/day`}
              subtitle="Suggested daily saving"
              data-ocid="dashboard.savings_card.1"
            />
            <SavingsCard
              icon={TrendingUp}
              title="Weekly Target"
              amount={`${fmt(weeklyTarget)}/week`}
              subtitle="Suggested weekly saving"
              data-ocid="dashboard.savings_card.2"
            />
            <SavingsCard
              icon={PiggyBank}
              title="Monthly Goal"
              amount={`${fmt(savingGoal)}/month`}
              subtitle="Suggested monthly saving"
              variant="premium"
              data-ocid="dashboard.savings_card.3"
            />
          </div>
        </motion.div>

        {/* ── Emergency Fund + Progress Rings ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Emergency fund */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card rounded-2xl border border-border p-5 card-elevated"
            data-ocid="dashboard.emergency_fund_card"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground text-sm">
                  Emergency Fund
                </h2>
                <p className="text-xs text-muted-foreground">
                  Based on your profile
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between mb-2">
              <span className="font-display font-bold text-2xl text-foreground">
                {fmt(currentSavings)}
              </span>
              <span className="text-sm text-muted-foreground">
                Target: {fmt(emergencyFund)}
              </span>
            </div>
            <Progress
              value={emergencyPct}
              className="h-3 rounded-full"
              data-ocid="dashboard.emergency_fund_progress"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-primary font-medium">
                {emergencyPct}% funded
              </span>
              {monthsToEmergency !== null && monthsToEmergency > 0 ? (
                <span className="text-xs text-muted-foreground">
                  Est. completion: ~{monthsToEmergency} months
                </span>
              ) : (
                <span className="text-xs text-primary font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Goal reached!
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-3 bg-muted/60 rounded-lg px-3 py-2">
              Suggested: 3 months of expenses (₹{fmt(expensesAmt * 3).slice(1)})
              as safety net
            </p>
          </motion.div>

          {/* Progress rings */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border p-5 card-elevated"
            data-ocid="dashboard.progress_rings_card"
          >
            <h2 className="font-display font-semibold text-foreground mb-4">
              Score Overview
            </h2>
            <div className="grid grid-cols-3 gap-2 place-items-center">
              <ProgressRing
                value={savingsScore}
                label={`${savingsScore}`}
                sublabel="Savings Score"
                color="primary"
                size={88}
              />
              <ProgressRing
                value={careerProgress}
                label={`${careerProgress}%`}
                sublabel="Career Progress"
                color="accent"
                size={88}
              />
              <ProgressRing
                value={businessReadiness}
                label={`${businessReadiness}%`}
                sublabel="Business Ready"
                color="success"
                size={88}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Scores are estimated based on your profile and activity
            </p>
          </motion.div>
        </div>

        {/* ── Charts row ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Savings trend line chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border p-5 card-elevated"
            data-ocid="dashboard.savings_trend_chart"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-semibold text-foreground">
                  Estimated Savings Growth
                </h2>
                <p className="text-xs text-muted-foreground">
                  6-month projected trajectory
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                Estimated
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <RTooltip
                  contentStyle={{
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [fmt(v), "Estimated savings"]}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="oklch(0.65 0.2 190)"
                  strokeWidth={2.5}
                  dot={{ fill: "oklch(0.65 0.2 190)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Expense breakdown donut */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-5 card-elevated"
            data-ocid="dashboard.expense_donut_chart"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-semibold text-foreground">
                  Expense Breakdown
                </h2>
                <p className="text-xs text-muted-foreground">
                  {loadingExpenses ? "Loading..." : "Based on recent expenses"}
                </p>
              </div>
              <Link to="/expenses">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary gap-1"
                  data-ocid="dashboard.view_expenses_link"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11 }}
                />
                <RTooltip
                  contentStyle={{
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [fmt(v), "Amount"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── AI Recommendations + Daily Tasks ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border p-5 card-elevated"
            data-ocid="dashboard.ai_recommendations_panel"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> AI Recommendations
              </h2>
              <Link to="/ai-suggestions">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary gap-1"
                  data-ocid="dashboard.view_ai_button"
                >
                  See all <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {aiRecs.map((rec, i) => {
                const Icon = rec.icon;
                const colorClass =
                  rec.color === "destructive"
                    ? "bg-destructive/10 text-destructive"
                    : rec.color === "accent"
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/10 text-primary";
                return (
                  <motion.div
                    key={rec.title}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-smooth"
                    data-ocid={`dashboard.ai_rec.${i + 1}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-display font-semibold text-sm text-foreground">
                        {rec.title}
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        {rec.description}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs w-fit mt-0.5 border-border/60"
                      >
                        {rec.tag}
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
              {!isPremium && (
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-1 py-2 border-t border-border">
                  <Crown className="w-3 h-3 text-accent" />
                  Premium unlocks {AI_RECOMMENDATION_DATA.length - 3} more AI
                  recommendations
                </div>
              )}
            </div>
          </motion.div>

          {/* Daily Tasks checklist */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-5 card-elevated"
            data-ocid="dashboard.daily_tasks_panel"
          >
            <div className="flex items-center gap-2 mb-1">
              <ListTodo className="w-4 h-4 text-primary" />
              <h2 className="font-display font-semibold text-foreground">
                Daily Tasks
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Good habit building for your financial goals
            </p>
            {loadingTasks ? (
              <div className="flex flex-col gap-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 rounded-lg" />
                ))}
              </div>
            ) : tasks.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {tasks.slice(0, 6).map((task, i) => (
                  <li
                    key={String(task.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-smooth"
                    data-ocid={`dashboard.task.${i + 1}`}
                  >
                    <Checkbox
                      id={`task-${String(task.id)}`}
                      checked={task.completed}
                      disabled={task.completed || completeTask.isPending}
                      onCheckedChange={() => {
                        if (!task.completed) completeTask.mutate(task.id);
                      }}
                      data-ocid={`dashboard.task_checkbox.${i + 1}`}
                    />
                    <label
                      htmlFor={`task-${String(task.id)}`}
                      className={`text-sm flex-1 cursor-pointer ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </label>
                    {task.completed && (
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <FallbackTasks
                completeTask={completeTask.mutate}
                isPending={completeTask.isPending}
              />
            )}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              {tasks.filter((t) => t.completed).length}/{tasks.length || 5}{" "}
              tasks completed today
            </p>
          </motion.div>
        </div>

        {/* ── Premium upsell banner (free users only) ── */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/8 via-card to-primary/8 p-6"
            data-ocid="dashboard.premium_upsell_banner"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-accent/10 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                  <Crown className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-lg">
                    Unlock your full potential
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Get the full 10-year roadmap, advanced AI suggestions,
                    education planner, unlimited business ideas, and PDF
                    reports.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "10-Year Roadmap",
                      "Advanced AI",
                      "PDF Reports",
                      "No Ads",
                    ].map((f) => (
                      <Badge
                        key={f}
                        variant="outline"
                        className="text-xs border-accent/30 text-accent"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link to="/premium">
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2 shadow-premium"
                    data-ocid="dashboard.upgrade_premium_button"
                  >
                    <Crown className="w-4 h-4" /> Upgrade to Premium
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Starting ₹99/month
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Premium locked: 10-year plan teaser ── */}
        <FeatureLockOverlay
          locked={!isPremium}
          title="Full 10-Year Life Roadmap"
          description="Upgrade to Premium to see your personalized 10–12 year financial, career, and life plan."
        >
          <div className="bg-muted/40 rounded-xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold text-foreground">
                10-Year Life Roadmap
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["Year 1", "Year 2–3", "Year 4–6", "Year 7–10"].map((y) => (
                <div key={y} className="bg-card rounded-lg p-3 text-center">
                  <span className="text-xs text-muted-foreground">{y}</span>
                </div>
              ))}
            </div>
          </div>
        </FeatureLockOverlay>
      </div>
    </Layout>
  );
}

// ── Fallback tasks (when backend returns no tasks yet) ──────────────────────
const FALLBACK_TASKS = [
  { id: 1n, title: "Log today's expenses", completed: false },
  { id: 2n, title: "Review your budget vs actual spend", completed: false },
  { id: 3n, title: "Read one financial tip or article", completed: false },
  { id: 4n, title: "Avoid one impulse purchase today", completed: false },
  { id: 5n, title: "Check your saving progress", completed: false },
];

function FallbackTasks({
  completeTask: _completeTask,
  isPending,
}: {
  completeTask: (id: bigint) => void;
  isPending: boolean;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {FALLBACK_TASKS.map((task, i) => (
        <li
          key={String(task.id)}
          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-smooth"
          data-ocid={`dashboard.task.${i + 1}`}
        >
          <Checkbox
            id={`ftask-${String(task.id)}`}
            checked={task.completed}
            disabled={isPending}
            data-ocid={`dashboard.task_checkbox.${i + 1}`}
          />
          <label
            htmlFor={`ftask-${String(task.id)}`}
            className="text-sm flex-1 cursor-pointer text-foreground"
          >
            {task.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
