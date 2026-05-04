import { j as jsxRuntimeExports, r as reactExports, L as Link } from "./index-B9bWIxQ1.js";
import { B as Badge } from "./badge-COekOkXS.js";
import { c as createLucideIcon, T as TrendingUp, B as Button, S as Sparkles, a as Briefcase, L as Lightbulb } from "./trending-up-SaD7OCZj.js";
import { C as Card, a as CardContent } from "./card-D9ci1S6G.js";
import { S as Separator } from "./separator-DsBFwCgw.js";
import { C as ChevronDown } from "./chevron-down-HEPoaS0J.js";
import { A as AnimatePresence } from "./index-CIYdDehy.js";
import { m as motion } from "./proxy-DD2murxF.js";
import { S as Star } from "./star-0LDu6hVL.js";
import { P as PiggyBank } from "./piggy-bank-jYI3tX3l.js";
import { C as Calendar } from "./calendar-B0Nx1W7_.js";
import { C as CircleCheck } from "./circle-check-DI0pjUTv.js";
import { G as GraduationCap } from "./graduation-cap-CIpoCQ64.js";
import { S as Shield } from "./shield-DSjQV_w6.js";
import { U as Users } from "./users-BfoZ_H6T.js";
import "./index-DbgaXzGo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "m19 9-5 5-4-4-3 3", key: "2osh9i" }]
];
const ChartLine = createLucideIcon("chart-line", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
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
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode);
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};
function NavBar() {
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", "data-ocid": "nav.logo", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg text-foreground", children: [
          "SaveFuture ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "AI" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#features",
            className: "hover:text-foreground transition-colors",
            "data-ocid": "nav.features_link",
            children: "Features"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#career",
            className: "hover:text-foreground transition-colors",
            "data-ocid": "nav.career_link",
            children: "Career"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#business",
            className: "hover:text-foreground transition-colors",
            "data-ocid": "nav.business_link",
            children: "Business"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#pricing",
            className: "hover:text-foreground transition-colors",
            "data-ocid": "nav.pricing_link",
            children: "Pricing"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "hidden md:flex",
            "data-ocid": "nav.login_button",
            children: "Log In"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "bg-primary text-primary-foreground hover:bg-primary/90",
            "data-ocid": "nav.start_button",
            children: "Start Free"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground",
            onClick: () => setMenuOpen((v) => !v),
            "aria-label": "Toggle menu",
            "data-ocid": "nav.mobile_menu_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                className: `w-5 h-5 transition-transform ${menuOpen ? "rotate-180" : ""}`
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.25 },
        className: "md:hidden overflow-hidden bg-card border-t border-border",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1 p-4", children: ["#features", "#career", "#business", "#pricing"].map(
          (href, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href,
              className: "px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
              onClick: () => setMenuOpen(false),
              "data-ocid": `nav.mobile_link.${i + 1}`,
              children: ["Features", "Career", "Business", "Pricing"][i]
            },
            href
          )
        ) })
      }
    ) })
  ] });
}
function HeroSection() {
  const stats = [
    { label: "Avg. Suggested Savings", value: "₹5,000/mo", icon: PiggyBank },
    { label: "Careers Explored", value: "50,000+", icon: Compass },
    { label: "Life Plan Horizon", value: "10 Years", icon: Calendar }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "hero",
      className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16",
      style: {
        background: "linear-gradient(135deg, oklch(0.14 0.035 255) 0%, oklch(0.2 0.04 255) 40%, oklch(0.28 0.12 200) 70%, oklch(0.38 0.18 190) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none opacity-20",
            style: {
              backgroundImage: "radial-gradient(circle, oklch(0.75 0.15 190) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, oklch(0.65 0.2 190 / 0.18) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              variants: staggerContainer,
              initial: "hidden",
              animate: "show",
              className: "flex flex-col items-center gap-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeUp, custom: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary border-primary/30 backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "AI-Powered Financial & Career Guidance"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    variants: fadeUp,
                    custom: 1,
                    className: "font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl",
                    style: { color: "oklch(0.97 0.01 260)" },
                    children: [
                      "Save Money.",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.65 0.2 190)" }, children: "Build Career." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            background: "linear-gradient(90deg, oklch(0.72 0.15 60), oklch(0.78 0.18 55))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                          },
                          children: "Secure Your Next 10 Years."
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.p,
                  {
                    variants: fadeUp,
                    custom: 2,
                    className: "text-lg md:text-xl max-w-2xl leading-relaxed",
                    style: { color: "oklch(0.75 0.02 260)" },
                    children: [
                      "Get personalized savings plans, career guidance, education roadmap, and business ideas ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "based on your real-life situation" }),
                      ". Estimated outcomes tailored to your goals."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    variants: fadeUp,
                    custom: 3,
                    className: "flex flex-col sm:flex-row gap-4 w-full sm:w-auto",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "lg",
                          className: "w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 shadow-lg shadow-primary/30 transition-smooth font-semibold",
                          "data-ocid": "hero.start_free_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                            "Start Free Plan"
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/premium", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "lg",
                          variant: "outline",
                          className: "w-full sm:w-auto text-base px-8 py-6 font-semibold transition-smooth",
                          style: {
                            borderColor: "oklch(0.72 0.15 60 / 0.7)",
                            color: "oklch(0.72 0.15 60)",
                            background: "oklch(0.72 0.15 60 / 0.07)"
                          },
                          "data-ocid": "hero.premium_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 mr-2" }),
                            "Get Premium Guidance"
                          ]
                        }
                      ) })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 40, scale: 0.97 },
              animate: { opacity: 1, y: 0, scale: 1 },
              transition: {
                duration: 0.7,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              },
              className: "w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/hero-fintech.dim_1200x630.jpg",
                  alt: "SaveFuture AI — premium fintech dashboard preview",
                  className: "w-full h-auto"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: staggerContainer,
              initial: "hidden",
              animate: "show",
              className: "grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl",
              children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: fadeUp,
                  custom: i + 4,
                  className: "rounded-2xl border border-white/10 backdrop-blur-md p-4 flex items-center gap-3",
                  style: { background: "oklch(1 0 0 / 0.07)" },
                  "data-ocid": `hero.stat_card.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                        style: { background: "oklch(0.65 0.2 190 / 0.25)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          stat.icon,
                          {
                            className: "w-5 h-5",
                            style: { color: "oklch(0.65 0.2 190)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-display font-bold text-xl",
                          style: { color: "oklch(0.97 0.01 260)" },
                          children: stat.value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-xs",
                          style: { color: "oklch(0.65 0.02 260)" },
                          children: stat.label
                        }
                      )
                    ] })
                  ]
                },
                stat.value
              ))
            }
          )
        ] })
      ]
    }
  );
}
function ProblemSection() {
  const problems = [
    {
      icon: CircleAlert,
      title: "No Budget Plan",
      desc: "Without a clear monthly budget, every rupee slips away. Most people track nothing until it's too late."
    },
    {
      icon: Briefcase,
      title: "Wrong Career Choice",
      desc: "Choosing the wrong stream after 10th or 12th locks you into years of low-income frustration."
    },
    {
      icon: TrendingUp,
      title: "No Income Growth",
      desc: "Staying in a flat-salary job without side income means savings never compound or grow."
    },
    {
      icon: CircleAlert,
      title: "Bad Spending Habits",
      desc: "Impulsive buying, EMIs on wants, and no emergency fund create a cycle of financial anxiety."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-muted/30", id: "problem", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "text-center mb-14",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3",
              children: "Why People Struggle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              custom: 1,
              className: "font-display font-bold text-3xl md:text-4xl text-foreground",
              children: "4 Reasons Why People Fail to Save"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              custom: 2,
              className: "mt-3 text-muted-foreground max-w-xl mx-auto",
              children: "Millions earn decent incomes yet live paycheck to paycheck. Here's why — and how SaveFuture AI may help."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
        children: problems.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeUp, custom: i, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "h-full card-elevated border-border hover:shadow-md transition-smooth group",
            "data-ocid": `problem.card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "w-6 h-6 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: p.desc })
            ] })
          }
        ) }, p.title))
      }
    )
  ] }) });
}
function SolutionSection() {
  const points = [
    "Monthly income & expense analysis",
    "Age & life stage-appropriate plan",
    "Education level & career potential",
    "Skill-based business opportunities",
    "Personal goals & risk tolerance",
    "Family responsibilities & obligations",
    "Debt & loan reduction strategy",
    "Lifestyle optimization suggestions"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -30 },
        whileInView: { opacity: 1, x: 0 },
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        },
        viewport: { once: true },
        className: "relative",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-3xl p-8 relative overflow-hidden",
            style: {
              background: "linear-gradient(135deg, oklch(0.14 0.035 255) 0%, oklch(0.28 0.12 200) 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 right-0 w-40 h-40 rounded-full opacity-20",
                  style: {
                    background: "radial-gradient(circle, oklch(0.72 0.15 60), transparent)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-4xl font-display font-black mb-1",
                    style: { color: "oklch(0.72 0.15 60)" },
                    children: "₹25,000"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-xs mb-6",
                    style: { color: "oklch(0.65 0.02 260)" },
                    children: "Monthly Income (Suggested Example)"
                  }
                ),
                [
                  { label: "Expenses", pct: 72, color: "oklch(0.55 0.22 25)" },
                  {
                    label: "Estimated Savings",
                    pct: 28,
                    color: "oklch(0.65 0.2 190)"
                  },
                  {
                    label: "Emergency Fund Goal",
                    pct: 15,
                    color: "oklch(0.72 0.15 60)"
                  }
                ].map((bar) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between text-xs mb-1.5",
                      style: { color: "oklch(0.75 0.02 260)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: bar.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          bar.pct,
                          "%"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      whileInView: { width: `${bar.pct}%` },
                      transition: {
                        duration: 1,
                        ease: "easeOut",
                        delay: 0.3
                      },
                      viewport: { once: true },
                      className: "h-full rounded-full",
                      style: { background: bar.color }
                    }
                  ) })
                ] }, bar.label)),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-5 bg-white/10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                  { label: "Daily Saving Target", value: "₹170" },
                  { label: "Emergency Fund", value: "₹30,000" },
                  { label: "Debt Reduction", value: "₹2,000/mo" },
                  { label: "6-Month Plan", value: "Ready" }
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-3",
                    style: { background: "oklch(1 0 0 / 0.07)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-display font-bold text-lg",
                          style: { color: "oklch(0.72 0.15 60)" },
                          children: item.value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-xs",
                          style: { color: "oklch(0.6 0.02 260)" },
                          children: item.label
                        }
                      )
                    ]
                  },
                  item.label
                )) })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 30 },
        whileInView: { opacity: 1, x: 0 },
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        },
        viewport: { once: true },
        className: "flex flex-col gap-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3", children: "How It Works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground leading-tight", children: [
              "SaveFuture AI Analyzes",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Everything" }),
              " About You"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "Our AI engine processes 15+ personal data points to generate a suggested, personalized plan — not a generic template. Expected results are shown based on your profile." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: points.map((point, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.li,
            {
              initial: { opacity: 0, x: 10 },
              whileInView: { opacity: 1, x: 0 },
              transition: { delay: i * 0.07, duration: 0.4 },
              viewport: { once: true },
              className: "flex items-center gap-2.5 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                point
              ]
            },
            point
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 mt-2",
              "data-ocid": "solution.cta_button",
              children: "Analyze My Profile"
            }
          ) })
        ]
      }
    )
  ] }) }) });
}
function FeaturesSection() {
  const features = [
    {
      icon: PiggyBank,
      title: "Money Saving AI",
      desc: "Suggested monthly budget, daily saving targets, and bad-spending alerts based on your income and expenses.",
      badge: "Free"
    },
    {
      icon: Compass,
      title: "Career Guidance",
      desc: "Personalized career paths after 10th, 12th, or graduation — with expected salary ranges and job opportunities.",
      badge: "Free"
    },
    {
      icon: Lightbulb,
      title: "Business Ideas",
      desc: "Curated business ideas from basic to advanced, matched to your skills, budget, and risk appetite.",
      badge: "Free"
    },
    {
      icon: Calendar,
      title: "10-Year Life Plan",
      desc: "A structured roadmap from Year 1 to Year 12 — covering career, income, savings, investment, and family.",
      badge: "Premium"
    },
    {
      icon: GraduationCap,
      title: "Education Roadmap",
      desc: "Best streams, courses, certifications, and skill paths suggested based on your goals and age.",
      badge: "Premium"
    },
    {
      icon: ChartLine,
      title: "Smart Dashboard",
      desc: "Track savings score, expense trends, career progress, and business readiness in one clean view.",
      badge: "Free"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-muted/30", id: "features", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "text-center mb-14",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3",
              children: "What You Get"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              custom: 1,
              className: "font-display font-bold text-3xl md:text-4xl text-foreground",
              children: "Everything You Need to Take Control"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              custom: 2,
              className: "mt-3 text-muted-foreground max-w-xl mx-auto",
              children: "Six AI-powered modules covering every dimension of your financial and career life."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeUp, custom: i, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "h-full card-elevated border-border hover:shadow-lg transition-smooth group cursor-default",
            "data-ocid": `features.card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-6 h-6 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${f.badge === "Premium" ? "bg-accent/15 text-accent-foreground border-accent/40" : "bg-muted text-muted-foreground border-border"}`,
                    children: f.badge
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: f.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: f.desc })
            ] })
          }
        ) }, f.title))
      }
    )
  ] }) });
}
function ComparisonSection() {
  const rows = [
    { feature: "Basic Savings Plan", free: true, premium: true },
    { feature: "Monthly Budget Generator", free: true, premium: true },
    { feature: "Career Suggestions", free: "Basic", premium: "Full Roadmap" },
    { feature: "Business Ideas", free: "3 ideas", premium: "Unlimited" },
    { feature: "10-Year Life Plan", free: false, premium: true },
    { feature: "Education Planner", free: false, premium: true },
    { feature: "PDF Report Download", free: false, premium: true },
    { feature: "Debt Reduction Roadmap", free: false, premium: true },
    { feature: "Family Budget Planner", free: false, premium: true },
    { feature: "Investment Basics Guide", free: false, premium: true },
    { feature: "Monthly Progress Review", free: false, premium: true },
    { feature: "Ads", free: true, premium: false },
    { feature: "Priority AI Recommendations", free: false, premium: true }
  ];
  function Cell({ val }) {
    if (val === true)
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary mx-auto" });
    if (val === false)
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-muted-foreground/40 mx-auto" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: val });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "text-center mb-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3",
              children: "Plan Comparison"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              custom: 1,
              className: "font-display font-bold text-3xl md:text-4xl text-foreground",
              children: "Free vs Premium"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true },
        className: "rounded-2xl overflow-hidden border border-border shadow-sm",
        "data-ocid": "comparison.table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 font-display font-semibold text-foreground", children: "Feature" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 font-display font-semibold text-center text-muted-foreground", children: "Free" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "p-4 font-display font-bold text-center rounded-t-lg",
                style: {
                  background: "linear-gradient(180deg, oklch(0.72 0.15 60 / 0.15), transparent)",
                  color: "oklch(0.55 0.15 60)",
                  borderTop: "2px solid oklch(0.72 0.15 60 / 0.5)"
                },
                children: "✦ Premium"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `grid grid-cols-3 border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`,
              "data-ocid": `comparison.row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3.5 text-sm text-foreground", children: row.feature }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3.5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { val: row.free }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "p-3.5 flex items-center justify-center",
                    style: { borderLeft: "1px solid oklch(0.72 0.15 60 / 0.2)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { val: row.premium })
                  }
                )
              ]
            },
            row.feature
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.2 },
        viewport: { once: true },
        className: "flex justify-center mt-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/premium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "font-semibold px-10",
            style: {
              background: "oklch(0.72 0.15 60)",
              color: "oklch(0.12 0.02 60)"
            },
            "data-ocid": "comparison.upgrade_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 mr-2" }),
              "Upgrade to Premium"
            ]
          }
        ) })
      }
    )
  ] }) });
}
function RoadmapSection() {
  const steps = [
    {
      num: "01",
      title: "Complete Your Profile",
      desc: "Share your income, expenses, age, education, and goals in under 3 minutes."
    },
    {
      num: "02",
      title: "Get Your AI Plan",
      desc: "Receive a suggested savings plan, career path, and business ideas tailored to your situation."
    },
    {
      num: "03",
      title: "Take Daily Action",
      desc: "Follow your personalized daily tasks, spending limits, and career milestones."
    },
    {
      num: "04",
      title: "Track Your Progress",
      desc: "Monitor savings score, emergency fund, career growth, and life plan milestones on your dashboard."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "text-center mb-14",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3",
              children: "Your Journey"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              custom: 1,
              className: "font-display font-bold text-3xl md:text-4xl text-foreground",
              children: "Start to Financial Clarity in 4 Steps"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/30 via-primary to-accent/50 z-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          variants: staggerContainer,
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true },
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10",
          children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              variants: fadeUp,
              custom: i,
              className: "flex flex-col items-center text-center gap-4",
              "data-ocid": `roadmap.step.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-2xl shadow-lg",
                    style: {
                      background: i < 3 ? "linear-gradient(135deg, oklch(0.65 0.2 190), oklch(0.55 0.22 195))" : "linear-gradient(135deg, oklch(0.72 0.15 60), oklch(0.65 0.18 55))",
                      color: "oklch(0.97 0.01 260)"
                    },
                    children: step.num
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground mb-1.5", children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.desc })
                ] })
              ]
            },
            step.num
          ))
        }
      )
    ] })
  ] }) });
}
function TestimonialsSection() {
  const testimonials = [
    {
      initials: "RK",
      name: "Rahul Khandelwal",
      location: "Jaipur, Rajasthan",
      stars: 5,
      quote: "I was spending ₹4,000 on food delivery every month and had zero savings. SaveFuture AI suggested a budget and I've now saved ₹18,000 in 4 months. The plan felt like it was written just for me.",
      color: "oklch(0.65 0.2 190)"
    },
    {
      initials: "PS",
      name: "Priya Shetty",
      location: "Bangalore, Karnataka",
      stars: 5,
      quote: "After 12th I was totally confused about which stream to choose. The career guidance section showed me expected salaries and job roles clearly. I'm now pursuing BCA with a clear roadmap.",
      color: "oklch(0.72 0.15 60)"
    },
    {
      initials: "AM",
      name: "Arjun Mishra",
      location: "Lucknow, UP",
      stars: 5,
      quote: "As a delivery worker earning ₹15,000/month, I never thought I could build savings. The app's suggested daily saving target of ₹100 felt doable. My emergency fund is growing steadily now.",
      color: "oklch(0.6 0.18 280)"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "text-center mb-14",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3",
              children: "Real Stories"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              custom: 1,
              className: "font-display font-bold text-3xl md:text-4xl text-foreground",
              children: "People Like You, Taking Control"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              custom: 2,
              className: "mt-3 text-muted-foreground",
              children: "Based on suggested plans. Individual results may vary."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
        children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: fadeUp, custom: i, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "h-full card-elevated hover:shadow-lg transition-smooth",
            "data-ocid": `testimonials.card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: Array.from({ length: t.stars }).map((_, si) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: "w-4 h-4 fill-current",
                  style: { color: "oklch(0.72 0.15 60)" }
                },
                `star-${t.name}-${si}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-sm text-foreground leading-relaxed flex-1", children: [
                "“",
                t.quote,
                "”"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex items-center justify-center text-sm font-display font-bold flex-shrink-0",
                    style: {
                      background: t.color,
                      color: "oklch(0.97 0.01 260)"
                    },
                    children: t.initials
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-foreground", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.location })
                ] })
              ] })
            ] })
          }
        ) }, t.name))
      }
    )
  ] }) });
}
function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      badge: null,
      features: [
        "Basic savings plan",
        "Monthly budget generator",
        "3 business ideas",
        "Basic career suggestion",
        "Limited AI recommendations",
        "Ad-supported"
      ],
      cta: "Start Free",
      highlight: false
    },
    {
      name: "Premium Monthly",
      price: "₹99",
      period: "/month",
      badge: null,
      features: [
        "Everything in Free",
        "Full 10–12 year roadmap",
        "Advanced career roadmap",
        "Unlimited business ideas",
        "Education planning",
        "PDF report download",
        "No ads"
      ],
      cta: "Get Monthly",
      highlight: false
    },
    {
      name: "Premium Yearly",
      price: "₹799",
      period: "/year",
      badge: "Most Popular",
      features: [
        "Everything in Monthly",
        "Monthly progress review",
        "Debt reduction roadmap",
        "Family budget planner",
        "Investment basics guide",
        "Priority AI support",
        "Save ₹389 vs monthly"
      ],
      cta: "Get Yearly",
      highlight: true
    },
    {
      name: "Lifetime",
      price: "₹1,999",
      period: "one-time",
      badge: null,
      features: [
        "Everything in Yearly",
        "Lifetime access",
        "All future features",
        "Career consultation booking",
        "Business plan generator",
        "Highest priority support"
      ],
      cta: "Get Lifetime",
      highlight: false
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-muted/30", id: "pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "text-center mb-14",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3",
              children: "Pricing"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              custom: 1,
              className: "font-display font-bold text-3xl md:text-4xl text-foreground",
              children: "Simple, Transparent Plans"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              custom: 2,
              className: "mt-3 text-muted-foreground",
              children: "Start free. Upgrade when you're ready for the full picture."
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch",
        children: plans.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: fadeUp,
            custom: i,
            className: "flex",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: `w-full flex flex-col ${plan.highlight ? "relative shadow-xl" : "card-elevated"}`,
                style: plan.highlight ? { border: "2px solid oklch(0.72 0.15 60 / 0.7)" } : {},
                "data-ocid": `pricing.card.${i + 1}`,
                children: [
                  plan.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap",
                      style: {
                        background: "oklch(0.72 0.15 60)",
                        color: "oklch(0.12 0.02 60)"
                      },
                      children: plan.badge
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 flex flex-col flex-1 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground mb-1", children: plan.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-4xl text-foreground", children: plan.price }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm pb-1", children: plan.period })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2.5 flex-1", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-start gap-2 text-sm text-foreground",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
                          f
                        ]
                      },
                      f
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/premium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        className: "w-full mt-4 font-semibold transition-smooth",
                        style: plan.highlight ? {
                          background: "oklch(0.72 0.15 60)",
                          color: "oklch(0.12 0.02 60)"
                        } : {},
                        variant: plan.highlight ? void 0 : "outline",
                        "data-ocid": `pricing.cta_button.${i + 1}`,
                        children: plan.cta
                      }
                    ) })
                  ] })
                ]
              }
            )
          },
          plan.name
        ))
      }
    )
  ] }) });
}
function FAQSection() {
  const faqs = [
    {
      q: "Is SaveFuture AI free to use?",
      a: "Yes! The basic plan is completely free with access to a basic savings planner, monthly budget generator, and 3 business ideas. Premium plans unlock the full 10-year roadmap, advanced career guidance, and more."
    },
    {
      q: "How does the AI suggestion work?",
      a: "After you complete your profile (income, expenses, age, goals, skills), our AI analyzes your data and generates a suggested personalized plan. Results are estimates based on your profile — not guaranteed outcomes."
    },
    {
      q: "Is my personal and financial data safe?",
      a: "Yes. Your data is stored securely on a decentralized network with end-to-end protection. We never sell or share your personal information with third parties."
    },
    {
      q: "Can I cancel my Premium subscription anytime?",
      a: "Absolutely. Monthly and yearly plans can be cancelled at any time from your profile settings. You retain access until the end of your billing period."
    },
    {
      q: "What if I'm a student with no income?",
      a: "SaveFuture AI is designed for students too! You can enter ₹0 income and still get a career roadmap, education planner, and business ideas suited to your situation. Many students find the career guidance feature especially helpful."
    }
  ];
  const [open, setOpen] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-background", id: "faq", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true },
        className: "text-center mb-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              variants: fadeUp,
              className: "text-sm font-semibold text-primary uppercase tracking-widest mb-3",
              children: "FAQ"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              variants: fadeUp,
              custom: 1,
              className: "font-display font-bold text-3xl md:text-4xl text-foreground",
              children: "Frequently Asked Questions"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true },
        className: "flex flex-col gap-3",
        "data-ocid": "faq.list",
        children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl border border-border overflow-hidden",
            "data-ocid": `faq.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full flex items-center justify-between p-5 text-left font-semibold text-foreground hover:bg-muted/50 transition-smooth",
                  onClick: () => setOpen(open === i ? null : i),
                  "data-ocid": `faq.toggle.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pr-4 text-sm md:text-base", children: faq.q }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronDown,
                      {
                        className: `w-5 h-5 flex-shrink-0 text-primary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open === i && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { height: 0 },
                  animate: { height: "auto" },
                  exit: { height: 0 },
                  transition: { duration: 0.28, ease: "easeInOut" },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed", children: faq.a })
                },
                "content"
              ) })
            ]
          },
          faq.q
        ))
      }
    )
  ] }) });
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const trustBadges = [
    { icon: Shield, label: "256-bit Secure" },
    { icon: Sparkles, label: "AI-Powered" },
    { icon: Users, label: "50K+ Users" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-10 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg text-foreground", children: [
            "SaveFuture ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "AI" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Suggested savings plans, career guidance, and life planning for every Indian." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: trustBadges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "w-3 h-3" }),
              b.label
            ]
          },
          b.label
        )) })
      ] }),
      [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Career Guidance", href: "/career" },
            { label: "Business Ideas", href: "/business" }
          ]
        },
        {
          title: "Company",
          links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/" },
            { label: "Blog", href: "/" },
            { label: "Support", href: "/" }
          ]
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy Policy", href: "/" },
            { label: "Terms of Service", href: "/" },
            { label: "Refund Policy", href: "/" },
            { label: "Cookie Policy", href: "/" }
          ]
        }
      ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-sm text-foreground mb-4", children: col.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2.5", children: col.links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: link.href,
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: link.label
          }
        ) }, link.label)) })
      ] }, col.title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        year,
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`,
            className: "text-primary hover:underline",
            target: "_blank",
            rel: "noopener noreferrer",
            children: "caffeine.ai"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center", children: [
        "Results shown are ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "estimated" }),
        " and ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "suggested" }),
        " based on profile data. Individual outcomes may vary."
      ] })
    ] })
  ] }) });
}
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "landing.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProblemSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SolutionSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComparisonSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoadmapSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PricingSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Landing as default
};
