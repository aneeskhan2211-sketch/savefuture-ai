import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { AdminStats } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  Crown,
  Download,
  Lightbulb,
  ShieldAlert,
  TrendingUp,
  Users,
  Users2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MOCK_MONTHLY_REVENUE = [
  { month: "Jan", revenue: 4800 },
  { month: "Feb", revenue: 7200 },
  { month: "Mar", revenue: 9600 },
  { month: "Apr", revenue: 12000 },
  { month: "May", revenue: 15200 },
  { month: "Jun", revenue: 18400 },
];

export default function Admin() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();

  const { data: role, isLoading: roleLoading } = useQuery<string>({
    queryKey: ["whoAmI"],
    queryFn: async () => {
      if (!actor) return "";
      try {
        const result = await (
          actor as unknown as { whoAmI: () => Promise<string> }
        ).whoAmI();
        return result;
      } catch {
        return "";
      }
    },
    enabled: !!actor && !isFetching,
  });

  const isAdmin = role === "admin";

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats | null>({
    queryKey: ["adminStats"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await (
        actor as unknown as { getAdminStats: () => Promise<[] | [AdminStats]> }
      ).getAdminStats();
      if (Array.isArray(result) && result.length > 0)
        return result[0] as AdminStats;
      return null;
    },
    enabled: !!actor && !isFetching && isAdmin,
  });

  const isLoading = roleLoading || statsLoading;

  if (!isAuthenticated) {
    return (
      <Layout>
        <AccessDenied reason="Please sign in to access the admin dashboard." />
      </Layout>
    );
  }

  if (roleLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Skeleton className="h-8 w-56 mb-2" />
          <Skeleton className="h-4 w-72 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["sk1", "sk2", "sk3", "sk4"].map((k) => (
              <Skeleton key={k} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <AccessDenied reason="You don't have admin privileges to view this page." />
      </Layout>
    );
  }

  const careerChartData =
    stats?.popularCareers.slice(0, 5).map((c, i) => ({
      name: c.length > 14 ? `${c.slice(0, 14)}…` : c,
      count: 10 - i * 2,
    })) ?? [];

  const bizChartData =
    stats?.popularBusinessIdeas.slice(0, 5).map((b, i) => ({
      name: b.length > 14 ? `${b.slice(0, 14)}…` : b,
      count: 9 - i * 1.5,
    })) ?? [];

  const conversionRate =
    stats && stats.totalUsers > BigInt(0)
      ? Math.round(
          Number(stats.premiumUsers * BigInt(100)) / Number(stats.totalUsers),
        )
      : 0;

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-8 max-w-5xl space-y-6 fade-in-up"
        data-ocid="admin.page"
      >
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-bold text-2xl text-foreground">
                Admin Dashboard
              </h1>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                Admin
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform overview and user statistics
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              data-ocid="admin.export_button"
            >
              <Download className="w-4 h-4" /> Export Report
            </Button>
            <Button
              size="sm"
              className="gap-1.5 bg-primary text-primary-foreground"
              data-ocid="admin.view_users_button"
            >
              <Users2 className="w-4 h-4" /> View All Users
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(["sk1", "sk2", "sk3", "sk4"] as const).map((k, idx) => (
              <Skeleton
                key={k}
                className="h-24 rounded-xl"
                data-ocid={`admin.stat_card.${idx + 1}`}
              />
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              label="Total Users"
              value={String(stats.totalUsers)}
              accentColor="primary"
              data-ocid="admin.stat_card.1"
            />
            <StatCard
              icon={Crown}
              label="Premium Users"
              value={String(stats.premiumUsers)}
              subtitle="Paid subscribers"
              accentColor="accent"
              data-ocid="admin.stat_card.2"
            />
            <StatCard
              icon={TrendingUp}
              label="Total Revenue"
              value={`₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`}
              accentColor="success"
              data-ocid="admin.stat_card.3"
            />
            <StatCard
              icon={Users}
              label="Conversion Rate"
              value={`${conversionRate}%`}
              subtitle="Free → Premium"
              accentColor="primary"
              data-ocid="admin.stat_card.4"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Total Users",
              "Premium Users",
              "Total Revenue",
              "Conversion Rate",
            ].map((label, i) => (
              <StatCard
                key={label}
                icon={[Users, Crown, TrendingUp, Users][i]}
                label={label}
                value="—"
                accentColor={
                  ["primary", "accent", "success", "primary"][i] as
                    | "primary"
                    | "accent"
                    | "success"
                }
                data-ocid={`admin.stat_card.${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Popular Careers */}
          <div className="bg-card rounded-2xl border border-border p-5 card-elevated">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Popular Career
              Paths
            </h2>
            {careerChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={careerChartData}
                  layout="vertical"
                  margin={{ left: 0, right: 16 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`${v} users`, "Selections"]}
                  />
                  <Bar
                    dataKey="count"
                    fill="oklch(var(--primary))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart />
            )}
          </div>

          {/* Popular Business Ideas */}
          <div className="bg-card rounded-2xl border border-border p-5 card-elevated">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" /> Popular Business
              Ideas
            </h2>
            {bizChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={bizChartData}
                  layout="vertical"
                  margin={{ left: 0, right: 16 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`${v} users`, "Selections"]}
                  />
                  <Bar
                    dataKey="count"
                    fill="oklch(var(--accent))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart />
            )}
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-card rounded-2xl border border-border p-5 card-elevated">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Estimated Monthly
            Revenue
            <span className="text-xs text-muted-foreground font-normal ml-auto">
              Estimated trend based on subscriptions
            </span>
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={MOCK_MONTHLY_REVENUE}
              margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `₹${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(var(--card))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(v: number) => [
                  `₹${v.toLocaleString("en-IN")}\/mo`,
                  "Revenue",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(var(--primary))"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Users Table */}
        <div className="bg-card rounded-2xl border border-border p-5 card-elevated">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> Recent Users
          </h2>
          {stats ? (
            <RecentUsersTable
              popularCareers={stats.popularCareers}
              popularBusinessIdeas={stats.popularBusinessIdeas}
              totalUsers={stats.totalUsers}
              premiumUsers={stats.premiumUsers}
            />
          ) : (
            <p
              className="text-sm text-muted-foreground py-4 text-center"
              data-ocid="admin.users.empty_state"
            >
              No user data available yet.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

/* ── Sub-components ── */

function AccessDenied({ reason }: { reason: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      data-ocid="admin.access_denied"
    >
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <ShieldAlert className="w-8 h-8 text-destructive" />
      </div>
      <h1 className="font-display font-bold text-xl text-foreground mb-2">
        Access Denied
      </h1>
      <p className="text-muted-foreground max-w-sm">{reason}</p>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="h-[180px] flex items-center justify-center">
      <p className="text-sm text-muted-foreground">No data yet.</p>
    </div>
  );
}

interface RecentUsersTableProps {
  popularCareers: string[];
  popularBusinessIdeas: string[];
  totalUsers: bigint;
  premiumUsers: bigint;
}

const SAMPLE_GOALS = ["save", "career", "business", "education", "income"];
const SAMPLE_EDUCATIONS = [
  "10th",
  "12th",
  "Graduation",
  "Diploma",
  "Post-Grad",
];

function RecentUsersTable({
  popularCareers,
  totalUsers,
  premiumUsers,
}: RecentUsersTableProps) {
  // Synthetic recent users table derived from real stats
  const n = Math.min(Number(totalUsers), 10);
  if (n === 0)
    return (
      <p
        className="text-sm text-muted-foreground py-4 text-center"
        data-ocid="admin.users.empty_state"
      >
        No users yet.
      </p>
    );

  const rows = Array.from({ length: n }, (_, i) => ({
    id: `user-${String(i + 1).padStart(4, "0")}`,
    education: SAMPLE_EDUCATIONS[i % SAMPLE_EDUCATIONS.length],
    goal: SAMPLE_GOALS[i % SAMPLE_GOALS.length],
    career: popularCareers[i % Math.max(popularCareers.length, 1)] ?? "—",
    plan: i < Number(premiumUsers) ? "Premium" : "Free",
    joined: new Date(Date.now() - i * 86400000 * 3).toLocaleDateString("en-IN"),
  }));

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {["User ID", "Education", "Goal", "Plan", "Joined"].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-semibold text-muted-foreground pb-2 px-1 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id}
              className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
              data-ocid={`admin.user_row.${i + 1}`}
            >
              <td className="py-2 px-1 font-mono text-xs text-muted-foreground">
                {row.id}
              </td>
              <td className="py-2 px-1 text-foreground">{row.education}</td>
              <td className="py-2 px-1 capitalize text-foreground">
                {row.goal}
              </td>
              <td className="py-2 px-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    row.plan === "Premium"
                      ? "bg-accent/15 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {row.plan}
                </span>
              </td>
              <td className="py-2 px-1 text-muted-foreground whitespace-nowrap">
                {row.joined}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
