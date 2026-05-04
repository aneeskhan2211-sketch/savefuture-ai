import { a as useInternetIdentity, b as useActor, r as reactExports, j as jsxRuntimeExports, p as Skeleton, d as createActor } from "./index-DyUgiqXz.js";
import { L as Layout, u as ue } from "./Layout-D65che65.js";
import { c as createLucideIcon, S as Sparkles, B as Button } from "./trending-up-CtEt7QQ9.js";
import { S as Separator } from "./separator-DAkvhRG-.js";
import { u as useSubscription, X } from "./useSubscription-DmQaFjSs.js";
import { m as motion } from "./proxy-Cu4d283p.js";
import { C as Crown } from "./crown-JJ01DNbT.js";
import { L as Lock } from "./lock-CEB4_A0Z.js";
import { S as Shield } from "./shield-CST_LQJP.js";
import { S as Star } from "./star-B-dD39_P.js";
import "./index-DkugzxL2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const PLAN_ITEMS = {
  premium_monthly: {
    productName: "SaveFuture AI Premium Monthly",
    productDescription: "Full access to all premium features — monthly billing",
    quantity: BigInt(1),
    priceInCents: BigInt(9900),
    currency: "INR"
  },
  premium_yearly: {
    productName: "SaveFuture AI Premium Yearly",
    productDescription: "Full access — yearly billing (save 33%)",
    quantity: BigInt(1),
    priceInCents: BigInt(79900),
    currency: "INR"
  },
  lifetime: {
    productName: "SaveFuture AI Lifetime Access",
    productDescription: "One-time payment for lifetime access",
    quantity: BigInt(1),
    priceInCents: BigInt(199900),
    currency: "INR"
  }
};
const PLANS = [
  {
    id: "basic",
    name: "Free",
    price: "₹0",
    period: "",
    desc: "Get started with essential tools.",
    features: [
      "Basic savings plan",
      "3 business ideas",
      "Basic career info",
      "Basic dashboard",
      "Limited AI suggestions",
      "Ads shown"
    ],
    cta: "Start Free",
    isPremium: false,
    gold: false
  },
  {
    id: "premium_monthly",
    name: "Premium Monthly",
    price: "₹99",
    period: "/month",
    desc: "Full access, cancel anytime.",
    features: [
      "Full personalized savings plan",
      "All business ideas (unlimited)",
      "Full career details + salary data",
      "10–12 year life roadmap",
      "Education planning",
      "Priority AI recommendations",
      "No ads"
    ],
    cta: "Subscribe Monthly",
    isPremium: true,
    gold: false
  },
  {
    id: "premium_yearly",
    name: "Premium Yearly",
    price: "₹799",
    period: "/year",
    saving: "Save 33%",
    badge: "Most Popular",
    desc: "Best value — 2 months free vs monthly.",
    features: [
      "Everything in Premium Monthly",
      "PDF report download",
      "Annual progress review",
      "Investment basics guide",
      "Debt reduction roadmap",
      "Family budget planner",
      "No ads"
    ],
    cta: "Subscribe Yearly",
    isPremium: true,
    gold: true
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "₹1,999",
    period: " one-time",
    desc: "Pay once. Use forever.",
    features: [
      "Everything in Premium Yearly",
      "All future features included",
      "Career consultation credits",
      "Priority support"
    ],
    cta: "Get Lifetime Access",
    isPremium: true,
    gold: false
  }
];
const FEATURE_ROWS = [
  { label: "Basic savings plan", free: true, premium: true },
  { label: "Full personalized savings plan", free: false, premium: true },
  { label: "Business ideas (limited)", free: true, premium: true },
  { label: "Unlimited business ideas", free: false, premium: true },
  { label: "Basic career info", free: true, premium: true },
  { label: "Full career roadmap + salary data", free: false, premium: true },
  { label: "Basic dashboard", free: true, premium: true },
  { label: "10–12 year life roadmap", free: false, premium: true },
  { label: "Education planning", free: false, premium: true },
  { label: "PDF report download", free: false, premium: true },
  { label: "Debt reduction roadmap", free: false, premium: true },
  { label: "Family budget planner", free: false, premium: true },
  { label: "Investment basics guide", free: false, premium: true },
  { label: "Priority AI recommendations", free: false, premium: true },
  { label: "Monthly progress review", free: false, premium: true },
  { label: "No ads", free: false, premium: true }
];
const TRUST_BADGES = [
  { icon: Shield, label: "256-bit SSL Secure" },
  { icon: X, label: "Cancel Anytime" },
  { icon: Zap, label: "Instant Activation" }
];
function formatExpiry(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function isActivePlan(sub, planId) {
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
  onLogin
}) {
  const isCurrent = isActivePlan(sub, plan.id);
  const isLoading = loading === plan.id;
  const goldCls = "border-[oklch(0.78_0.18_60)] bg-gradient-to-b from-[oklch(0.99_0.02_60)] to-card shadow-[0_4px_24px_0_oklch(0.78_0.18_60/0.22)] scale-[1.02]";
  const normalCls = "border-border bg-card card-elevated";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.08, duration: 0.4 },
      className: `relative flex flex-col rounded-2xl border p-6 transition-smooth ${plan.gold ? goldCls : normalCls}`,
      "data-ocid": `premium.plan_card.${index + 1}`,
      children: [
        plan.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[oklch(0.75_0.18_60)] text-[oklch(0.15_0.05_60)] shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
          plan.badge
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: plan.name }),
            plan.saving && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-[oklch(0.78_0.18_60/0.18)] text-[oklch(0.48_0.14_60)]", children: plan.saving })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-display font-extrabold text-4xl ${plan.gold ? "text-[oklch(0.58_0.17_60)]" : plan.isPremium ? "text-primary" : "text-foreground"}`,
                children: plan.price
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground mb-1", children: plan.period })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: plan.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2 flex-1 mb-5", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-2 text-sm text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                BadgeCheck,
                {
                  className: `w-4 h-4 shrink-0 mt-0.5 ${plan.gold ? "text-[oklch(0.58_0.17_60)]" : plan.isPremium ? "text-primary" : "text-muted-foreground"}`
                }
              ),
              f
            ]
          },
          f
        )) }),
        isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-center",
            "data-ocid": `premium.current_plan.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary flex items-center justify-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3.5 h-3.5" }),
                " Current Plan"
              ] }),
              (sub == null ? void 0 : sub.currentPeriodEnd) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Renews ",
                formatExpiry(sub.currentPeriodEnd)
              ] })
            ]
          }
        ) : plan.isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: () => isAuthenticated ? onSubscribe(plan.id) : onLogin(),
            disabled: isLoading,
            className: `w-full font-semibold transition-smooth ${plan.gold ? "bg-[oklch(0.7_0.18_60)] hover:bg-[oklch(0.65_0.18_60)] text-[oklch(0.12_0.04_60)] shadow-md" : "bg-primary hover:bg-primary/90 text-primary-foreground"}`,
            "data-ocid": `premium.subscribe_button.${index + 1}`,
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }),
              "Processing..."
            ] }) : !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
              " Sign in to Purchase"
            ] }) : plan.cta
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "w-full",
            "data-ocid": "premium.free_cta",
            onClick: () => {
              if (isAuthenticated) {
                window.location.href = "/dashboard";
              } else {
                onLogin();
              }
            },
            children: plan.cta
          }
        )
      ]
    }
  );
}
function FeatureTable() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      className: "overflow-x-auto",
      "data-ocid": "premium.feature_table",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 pr-4 font-semibold text-foreground w-1/2", children: "Feature" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-center font-semibold text-muted-foreground", children: "Free" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 text-center font-semibold text-primary", children: "Premium" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: FEATURE_ROWS.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-foreground", children: row.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4 text-center", children: row.free ? /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-4 h-4 text-primary mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground/40 mx-auto" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4 text-center", children: row.premium ? /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-4 h-4 text-primary mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground/40 mx-auto" }) })
            ]
          },
          row.label
        )) })
      ] })
    }
  );
}
function Premium() {
  const { isAuthenticated, login } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const { data: sub, isLoading: subLoading } = useSubscription();
  const [loadingPlan, setLoadingPlan] = reactExports.useState(null);
  const handleSubscribe = async (planId) => {
    if (!actor) {
      ue.error("Not connected to backend. Please try again.");
      return;
    }
    const item = PLAN_ITEMS[planId];
    if (!item) return;
    setLoadingPlan(planId);
    try {
      const configured = await actor.isStripeConfigured();
      if (!configured) {
        ue.error(
          "Payment system is not configured yet. Please try again later."
        );
        return;
      }
      const successUrl = `${window.location.origin}/premium?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/premium`;
      const checkoutUrl = await actor.createCheckoutSession(
        [item],
        successUrl,
        cancelUrl
      );
      if (checkoutUrl) {
        window.open(checkoutUrl, "_blank", "noopener,noreferrer");
      } else {
        ue.error("Could not create checkout session. Please try again.");
      }
    } catch (err) {
      console.error(err);
      ue.error("Payment initiation failed. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "premium.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border pt-14 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[oklch(0.78_0.18_60/0.15)] text-[oklch(0.5_0.14_60)] text-xs font-semibold border border-[oklch(0.78_0.18_60/0.4)] mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3.5 h-3.5" }),
              " Premium Membership"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-4xl md:text-5xl text-foreground tracking-tight", children: "Choose Your Plan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-xl mx-auto text-base", children: "Unlock your full financial and career potential with personalized AI-powered guidance, lifetime roadmaps, and expert tools." })
          ]
        }
      ),
      !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          className: "mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm text-muted-foreground",
          "data-ocid": "premium.auth_notice",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: login,
                  className: "text-primary font-semibold hover:underline",
                  "data-ocid": "premium.signin_link",
                  children: "Sign in"
                }
              ),
              " ",
              "to purchase a plan and track your subscription."
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: subLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto",
        "data-ocid": "premium.plans_grid.loading_state",
        children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 rounded-2xl" }, i))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto items-start",
        "data-ocid": "premium.plans_grid",
        children: PLANS.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlanCard,
          {
            plan,
            index: i,
            sub,
            onSubscribe: handleSubscribe,
            loading: loadingPlan,
            isAuthenticated: !!isAuthenticated,
            onLogin: login
          },
          plan.id
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-y border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-6 md:gap-14", children: TRUST_BADGES.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2.5 text-sm font-medium text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
          label
        ]
      },
      label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          className: "text-center mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Free vs Premium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "See exactly what is included in each plan." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-4 md:p-6 card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureTable, {}) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-[oklch(0.7_0.18_60)] mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "font-display text-xl font-semibold text-foreground leading-relaxed", children: "Upgrading to Premium changed how I manage money. I saved 18,000 more in just 3 months than the entire last year." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-primary fill-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Priya Sharma" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mumbai, India" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1 mt-3", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: "w-4 h-4 text-[oklch(0.78_0.18_60)] fill-[oklch(0.78_0.18_60)]"
            },
            s
          )) })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "All plans provide suggested, estimated guidance and not guaranteed financial or career advice. Results may vary based on individual circumstances. Pricing is in Indian Rupees. Premium plans auto-renew unless cancelled." })
    ] }) })
  ] }) });
}
export {
  Premium as default
};
