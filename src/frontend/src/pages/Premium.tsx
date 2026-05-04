import type { PremiumSubscription, ShoppingItem } from "@/backend";
import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/hooks/useSubscription";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  BadgeCheck,
  Crown,
  Lock,
  Shield,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PLAN_ITEMS: Record<string, ShoppingItem> = {
  premium_monthly: {
    productName: "SaveFuture AI Premium Monthly",
    productDescription: "Full access to all premium features — monthly billing",
    quantity: BigInt(1),
    priceInCents: BigInt(9900),
    currency: "INR",
  },
  premium_yearly: {
    productName: "SaveFuture AI Premium Yearly",
    productDescription: "Full access — yearly billing (save 33%)",
    quantity: BigInt(1),
    priceInCents: BigInt(79900),
    currency: "INR",
  },
  lifetime: {
    productName: "SaveFuture AI Lifetime Access",
    productDescription: "One-time payment for lifetime access",
    quantity: BigInt(1),
    priceInCents: BigInt(199900),
    currency: "INR",
  },
};

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  saving?: string;
  badge?: string;
  desc: string;
  features: string[];
  cta: string;
  isPremium: boolean;
  gold: boolean;
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Free",
    price: "\u20b90",
    period: "",
    desc: "Get started with essential tools.",
    features: [
      "Basic savings plan",
      "3 business ideas",
      "Basic career info",
      "Basic dashboard",
      "Limited AI suggestions",
      "Ads shown",
    ],
    cta: "Start Free",
    isPremium: false,
    gold: false,
  },
  {
    id: "premium_monthly",
    name: "Premium Monthly",
    price: "\u20b999",
    period: "/month",
    desc: "Full access, cancel anytime.",
    features: [
      "Full personalized savings plan",
      "All business ideas (unlimited)",
      "Full career details + salary data",
      "10\u201312 year life roadmap",
      "Education planning",
      "Priority AI recommendations",
      "No ads",
    ],
    cta: "Subscribe Monthly",
    isPremium: true,
    gold: false,
  },
  {
    id: "premium_yearly",
    name: "Premium Yearly",
    price: "\u20b9799",
    period: "/year",
    saving: "Save 33%",
    badge: "Most Popular",
    desc: "Best value \u2014 2 months free vs monthly.",
    features: [
      "Everything in Premium Monthly",
      "PDF report download",
      "Annual progress review",
      "Investment basics guide",
      "Debt reduction roadmap",
      "Family budget planner",
      "No ads",
    ],
    cta: "Subscribe Yearly",
    isPremium: true,
    gold: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "\u20b91,999",
    period: " one-time",
    desc: "Pay once. Use forever.",
    features: [
      "Everything in Premium Yearly",
      "All future features included",
      "Career consultation credits",
      "Priority support",
    ],
    cta: "Get Lifetime Access",
    isPremium: true,
    gold: false,
  },
];

interface FeatureRow {
  label: string;
  free: boolean;
  premium: boolean;
}

const FEATURE_ROWS: FeatureRow[] = [
  { label: "Basic savings plan", free: true, premium: true },
  { label: "Full personalized savings plan", free: false, premium: true },
  { label: "Business ideas (limited)", free: true, premium: true },
  { label: "Unlimited business ideas", free: false, premium: true },
  { label: "Basic career info", free: true, premium: true },
  { label: "Full career roadmap + salary data", free: false, premium: true },
  { label: "Basic dashboard", free: true, premium: true },
  { label: "10\u201312 year life roadmap", free: false, premium: true },
  { label: "Education planning", free: false, premium: true },
  { label: "PDF report download", free: false, premium: true },
  { label: "Debt reduction roadmap", free: false, premium: true },
  { label: "Family budget planner", free: false, premium: true },
  { label: "Investment basics guide", free: false, premium: true },
  { label: "Priority AI recommendations", free: false, premium: true },
  { label: "Monthly progress review", free: false, premium: true },
  { label: "No ads", free: false, premium: true },
];

const TRUST_BADGES = [
  { icon: Shield, label: "256-bit SSL Secure" },
  { icon: X, label: "Cancel Anytime" },
  { icon: Zap, label: "Instant Activation" },
];

function formatExpiry(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isActivePlan(
  sub: PremiumSubscription | null | undefined,
  planId: string,
): boolean {
  if (!sub || sub.status !== "active") return false;
  return sub.plan === planId;
}

function PlanCard({
  plan,
  index,
  sub,
  onSubscribe,
  loading,
  isAuthenticated,
  onLogin,
}: {
  plan: Plan;
  index: number;
  sub: PremiumSubscription | null | undefined;
  onSubscribe: (planId: string) => void;
  loading: string | null;
  isAuthenticated: boolean;
  onLogin: () => void;
}) {
  const isCurrent = isActivePlan(sub, plan.id);
  const isLoading = loading === plan.id;
  const goldCls =
    "border-[oklch(0.78_0.18_60)] bg-gradient-to-b from-[oklch(0.99_0.02_60)] to-card shadow-[0_4px_24px_0_oklch(0.78_0.18_60/0.22)] scale-[1.02]";
  const normalCls = "border-border bg-card card-elevated";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={`relative flex flex-col rounded-2xl border p-6 transition-smooth ${
        plan.gold ? goldCls : normalCls
      }`}
      data-ocid={`premium.plan_card.${index + 1}`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[oklch(0.75_0.18_60)] text-[oklch(0.15_0.05_60)] shadow-md">
            <Star className="w-3 h-3 fill-current" />
            {plan.badge}
          </span>
        </div>
      )}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-display font-bold text-foreground">{plan.name}</p>
          {plan.saving && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[oklch(0.78_0.18_60/0.18)] text-[oklch(0.48_0.14_60)]">
              {plan.saving}
            </span>
          )}
        </div>
        <div className="flex items-end gap-1">
          <span
            className={`font-display font-extrabold text-4xl ${
              plan.gold
                ? "text-[oklch(0.58_0.17_60)]"
                : plan.isPremium
                  ? "text-primary"
                  : "text-foreground"
            }`}
          >
            {plan.price}
          </span>
          <span className="text-sm text-muted-foreground mb-1">
            {plan.period}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
      </div>
      <ul className="flex flex-col gap-2 flex-1 mb-5">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-foreground"
          >
            <BadgeCheck
              className={`w-4 h-4 shrink-0 mt-0.5 ${
                plan.gold
                  ? "text-[oklch(0.58_0.17_60)]"
                  : plan.isPremium
                    ? "text-primary"
                    : "text-muted-foreground"
              }`}
            />
            {f}
          </li>
        ))}
      </ul>
      {isCurrent ? (
        <div
          className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-center"
          data-ocid={`premium.current_plan.${index + 1}`}
        >
          <p className="text-xs font-semibold text-primary flex items-center justify-center gap-1.5">
            <Crown className="w-3.5 h-3.5" /> Current Plan
          </p>
          {sub?.currentPeriodEnd && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Renews {formatExpiry(sub.currentPeriodEnd)}
            </p>
          )}
        </div>
      ) : plan.isPremium ? (
        <Button
          type="button"
          onClick={() => (isAuthenticated ? onSubscribe(plan.id) : onLogin())}
          disabled={isLoading}
          className={`w-full font-semibold transition-smooth ${
            plan.gold
              ? "bg-[oklch(0.7_0.18_60)] hover:bg-[oklch(0.65_0.18_60)] text-[oklch(0.12_0.04_60)] shadow-md"
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
          }`}
          data-ocid={`premium.subscribe_button.${index + 1}`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : !isAuthenticated ? (
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Sign in to Purchase
            </span>
          ) : (
            plan.cta
          )}
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          data-ocid="premium.free_cta"
          onClick={() => {
            if (isAuthenticated) {
              window.location.href = "/dashboard";
            } else {
              onLogin();
            }
          }}
        >
          {plan.cta}
        </Button>
      )}
    </motion.div>
  );
}

function FeatureTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
      data-ocid="premium.feature_table"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 font-semibold text-foreground w-1/2">
              Feature
            </th>
            <th className="py-3 px-4 text-center font-semibold text-muted-foreground">
              Free
            </th>
            <th className="py-3 px-4 text-center font-semibold text-primary">
              Premium
            </th>
          </tr>
        </thead>
        <tbody>
          {FEATURE_ROWS.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-border/50 ${
                i % 2 === 0 ? "bg-muted/20" : ""
              }`}
            >
              <td className="py-2.5 pr-4 text-foreground">{row.label}</td>
              <td className="py-2.5 px-4 text-center">
                {row.free ? (
                  <BadgeCheck className="w-4 h-4 text-primary mx-auto" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                )}
              </td>
              <td className="py-2.5 px-4 text-center">
                {row.premium ? (
                  <BadgeCheck className="w-4 h-4 text-primary mx-auto" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default function Premium() {
  const { isAuthenticated, login } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const { data: sub, isLoading: subLoading } = useSubscription();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    if (!actor) {
      toast.error("Not connected to backend. Please try again.");
      return;
    }
    const item = PLAN_ITEMS[planId];
    if (!item) return;

    setLoadingPlan(planId);
    try {
      const configured = await actor.isStripeConfigured();
      if (!configured) {
        toast.error(
          "Payment system is not configured yet. Please try again later.",
        );
        return;
      }
      const successUrl = `${window.location.origin}/premium?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/premium`;
      const checkoutUrl = await actor.createCheckoutSession(
        [item],
        successUrl,
        cancelUrl,
      );
      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank", "noopener,noreferrer");
      } else {
        toast.error("Could not create checkout session. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen" data-ocid="premium.page">
        {/* Hero */}
        <section className="bg-card border-b border-border pt-14 pb-12">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[oklch(0.78_0.18_60/0.15)] text-[oklch(0.5_0.14_60)] text-xs font-semibold border border-[oklch(0.78_0.18_60/0.4)] mb-4">
                <Crown className="w-3.5 h-3.5" /> Premium Membership
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-foreground tracking-tight">
                Choose Your Plan
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
                Unlock your full financial and career potential with
                personalized AI-powered guidance, lifetime roadmaps, and expert
                tools.
              </p>
            </motion.div>
            {!isAuthenticated && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground"
                data-ocid="premium.auth_notice"
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>
                  <button
                    type="button"
                    onClick={login}
                    className="text-primary font-semibold hover:underline"
                    data-ocid="premium.signin_link"
                  >
                    Sign in
                  </button>{" "}
                  to purchase a plan and track your subscription.
                </span>
              </motion.div>
            )}
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="bg-background py-14">
          <div className="container mx-auto px-4">
            {subLoading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
                data-ocid="premium.plans_grid.loading_state"
              >
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto items-start"
                data-ocid="premium.plans_grid"
              >
                {PLANS.map((plan, i) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    index={i}
                    sub={sub}
                    onSubscribe={handleSubscribe}
                    loading={loadingPlan}
                    isAuthenticated={!!isAuthenticated}
                    onLogin={login}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-muted/30 border-y border-border py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-14">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="bg-background py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="font-display font-bold text-2xl text-foreground">
                Free vs Premium
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                See exactly what is included in each plan.
              </p>
            </motion.div>
            <div className="rounded-2xl border border-border bg-card p-4 md:p-6 card-elevated">
              <FeatureTable />
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-muted/30 border-t border-border py-14">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Sparkles className="w-6 h-6 text-[oklch(0.7_0.18_60)] mx-auto mb-4" />
              <blockquote className="font-display text-xl font-semibold text-foreground leading-relaxed">
                Upgrading to Premium changed how I manage money. I saved 18,000
                more in just 3 months than the entire last year.
              </blockquote>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">
                    Priya Sharma
                  </p>
                  <p className="text-xs text-muted-foreground">Mumbai, India</p>
                </div>
              </div>
              <div className="flex justify-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 text-[oklch(0.78_0.18_60)] fill-[oklch(0.78_0.18_60)]"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-background py-8">
          <div className="container mx-auto px-4 max-w-2xl">
            <Separator className="mb-6" />
            <p className="text-center text-xs text-muted-foreground">
              All plans provide suggested, estimated guidance and not guaranteed
              financial or career advice. Results may vary based on individual
              circumstances. Pricing is in Indian Rupees. Premium plans
              auto-renew unless cancelled.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
