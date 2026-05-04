import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Compass,
  GraduationCap,
  Lightbulb,
  LineChart,
  PiggyBank,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Framer Motion Variants ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── Nav ────────────────────────────────────────────────────────────
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" data-ocid="nav.logo">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            SaveFuture <span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a
            href="#features"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.features_link"
          >
            Features
          </a>
          <a
            href="#career"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.career_link"
          >
            Career
          </a>
          <a
            href="#business"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.business_link"
          >
            Business
          </a>
          <a
            href="#pricing"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.pricing_link"
          >
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/onboarding">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex"
              data-ocid="nav.login_button"
            >
              Log In
            </Button>
          </Link>
          <Link to="/onboarding">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="nav.start_button"
            >
              Start Free
            </Button>
          </Link>
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.mobile_menu_button"
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-card border-t border-border"
          >
            <div className="flex flex-col gap-1 p-4">
              {["#features", "#career", "#business", "#pricing"].map(
                (href, i) => (
                  <a
                    key={href}
                    href={href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMenuOpen(false)}
                    data-ocid={`nav.mobile_link.${i + 1}`}
                  >
                    {["Features", "Career", "Business", "Pricing"][i]}
                  </a>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────
function HeroSection() {
  const stats = [
    { label: "Avg. Suggested Savings", value: "₹5,000/mo", icon: PiggyBank },
    { label: "Careers Explored", value: "50,000+", icon: Compass },
    { label: "Life Plan Horizon", value: "10 Years", icon: Calendar },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.035 255) 0%, oklch(0.2 0.04 255) 40%, oklch(0.28 0.12 200) 70%, oklch(0.38 0.18 190) 100%)",
      }}
    >
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.75 0.15 190) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.2 190 / 0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge className="px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              AI-Powered Financial &amp; Career Guidance
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl"
            style={{ color: "oklch(0.97 0.01 260)" }}
          >
            Save Money.{" "}
            <span style={{ color: "oklch(0.65 0.2 190)" }}>Build Career.</span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.15 60), oklch(0.78 0.18 55))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Secure Your Next 10 Years.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "oklch(0.75 0.02 260)" }}
          >
            Get personalized savings plans, career guidance, education roadmap,
            and business ideas <em>based on your real-life situation</em>.
            Estimated outcomes tailored to your goals.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/onboarding" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 shadow-lg shadow-primary/30 transition-smooth font-semibold"
                data-ocid="hero.start_free_button"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Free Plan
              </Button>
            </Link>
            <Link to="/premium" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 py-6 font-semibold transition-smooth"
                style={{
                  borderColor: "oklch(0.72 0.15 60 / 0.7)",
                  color: "oklch(0.72 0.15 60)",
                  background: "oklch(0.72 0.15 60 / 0.07)",
                }}
                data-ocid="hero.premium_button"
              >
                <Star className="w-4 h-4 mr-2" />
                Get Premium Guidance
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1] as unknown as [
              number,
              number,
              number,
              number,
            ],
          }}
          className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          <img
            src="/assets/generated/hero-fintech.dim_1200x630.jpg"
            alt="SaveFuture AI — premium fintech dashboard preview"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              custom={i + 4}
              className="rounded-2xl border border-white/10 backdrop-blur-md p-4 flex items-center gap-3"
              style={{ background: "oklch(1 0 0 / 0.07)" }}
              data-ocid={`hero.stat_card.${i + 1}`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.65 0.2 190 / 0.25)" }}
              >
                <stat.icon
                  className="w-5 h-5"
                  style={{ color: "oklch(0.65 0.2 190)" }}
                />
              </div>
              <div className="text-left">
                <div
                  className="font-display font-bold text-xl"
                  style={{ color: "oklch(0.97 0.01 260)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.65 0.02 260)" }}
                >
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Problem Section ─────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    {
      icon: AlertCircle,
      title: "No Budget Plan",
      desc: "Without a clear monthly budget, every rupee slips away. Most people track nothing until it's too late.",
    },
    {
      icon: Briefcase,
      title: "Wrong Career Choice",
      desc: "Choosing the wrong stream after 10th or 12th locks you into years of low-income frustration.",
    },
    {
      icon: TrendingUp,
      title: "No Income Growth",
      desc: "Staying in a flat-salary job without side income means savings never compound or grow.",
    },
    {
      icon: AlertCircle,
      title: "Bad Spending Habits",
      desc: "Impulsive buying, EMIs on wants, and no emergency fund create a cycle of financial anxiety.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30" id="problem">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Why People Struggle
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-3xl md:text-4xl text-foreground"
          >
            4 Reasons Why People Fail to Save
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-3 text-muted-foreground max-w-xl mx-auto"
          >
            Millions earn decent incomes yet live paycheck to paycheck.
            Here&apos;s why — and how SaveFuture AI may help.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp} custom={i}>
              <Card
                className="h-full card-elevated border-border hover:shadow-md transition-smooth group"
                data-ocid={`problem.card.${i + 1}`}
              >
                <CardContent className="pt-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <p.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Solution Section ─────────────────────────────────────────────────
function SolutionSection() {
  const points = [
    "Monthly income & expense analysis",
    "Age & life stage-appropriate plan",
    "Education level & career potential",
    "Skill-based business opportunities",
    "Personal goals & risk tolerance",
    "Family responsibilities & obligations",
    "Debt & loan reduction strategy",
    "Lifestyle optimization suggestions",
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as unknown as [
                number,
                number,
                number,
                number,
              ],
            }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.14 0.035 255) 0%, oklch(0.28 0.12 200) 100%)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.72 0.15 60), transparent)",
                }}
              />
              <div className="relative z-10">
                <div
                  className="text-4xl font-display font-black mb-1"
                  style={{ color: "oklch(0.72 0.15 60)" }}
                >
                  ₹25,000
                </div>
                <div
                  className="text-xs mb-6"
                  style={{ color: "oklch(0.65 0.02 260)" }}
                >
                  Monthly Income (Suggested Example)
                </div>

                {[
                  { label: "Expenses", pct: 72, color: "oklch(0.55 0.22 25)" },
                  {
                    label: "Estimated Savings",
                    pct: 28,
                    color: "oklch(0.65 0.2 190)",
                  },
                  {
                    label: "Emergency Fund Goal",
                    pct: 15,
                    color: "oklch(0.72 0.15 60)",
                  },
                ].map((bar) => (
                  <div key={bar.label} className="mb-4">
                    <div
                      className="flex justify-between text-xs mb-1.5"
                      style={{ color: "oklch(0.75 0.02 260)" }}
                    >
                      <span>{bar.label}</span>
                      <span>{bar.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.3,
                        }}
                        viewport={{ once: true }}
                        className="h-full rounded-full"
                        style={{ background: bar.color }}
                      />
                    </div>
                  </div>
                ))}

                <Separator className="my-5 bg-white/10" />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Daily Saving Target", value: "₹170" },
                    { label: "Emergency Fund", value: "₹30,000" },
                    { label: "Debt Reduction", value: "₹2,000/mo" },
                    { label: "6-Month Plan", value: "Ready" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl p-3"
                      style={{ background: "oklch(1 0 0 / 0.07)" }}
                    >
                      <div
                        className="font-display font-bold text-lg"
                        style={{ color: "oklch(0.72 0.15 60)" }}
                      >
                        {item.value}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.6 0.02 260)" }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as unknown as [
                number,
                number,
                number,
                number,
              ],
            }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                How It Works
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight">
                SaveFuture AI Analyzes{" "}
                <span className="text-primary">Everything</span> About You
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our AI engine processes 15+ personal data points to generate a
                suggested, personalized plan — not a generic template. Expected
                results are shown based on your profile.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2.5 text-sm text-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  {point}
                </motion.li>
              ))}
            </ul>

            <Link to="/onboarding">
              <Button
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                data-ocid="solution.cta_button"
              >
                Analyze My Profile
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: PiggyBank,
      title: "Money Saving AI",
      desc: "Suggested monthly budget, daily saving targets, and bad-spending alerts based on your income and expenses.",
      badge: "Free",
    },
    {
      icon: Compass,
      title: "Career Guidance",
      desc: "Personalized career paths after 10th, 12th, or graduation — with expected salary ranges and job opportunities.",
      badge: "Free",
    },
    {
      icon: Lightbulb,
      title: "Business Ideas",
      desc: "Curated business ideas from basic to advanced, matched to your skills, budget, and risk appetite.",
      badge: "Free",
    },
    {
      icon: Calendar,
      title: "10-Year Life Plan",
      desc: "A structured roadmap from Year 1 to Year 12 — covering career, income, savings, investment, and family.",
      badge: "Premium",
    },
    {
      icon: GraduationCap,
      title: "Education Roadmap",
      desc: "Best streams, courses, certifications, and skill paths suggested based on your goals and age.",
      badge: "Premium",
    },
    {
      icon: LineChart,
      title: "Smart Dashboard",
      desc: "Track savings score, expense trends, career progress, and business readiness in one clean view.",
      badge: "Free",
    },
  ];

  return (
    <section className="py-24 bg-muted/30" id="features">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            What You Get
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-3xl md:text-4xl text-foreground"
          >
            Everything You Need to Take Control
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-3 text-muted-foreground max-w-xl mx-auto"
          >
            Six AI-powered modules covering every dimension of your financial
            and career life.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} custom={i}>
              <Card
                className="h-full card-elevated border-border hover:shadow-lg transition-smooth group cursor-default"
                data-ocid={`features.card.${i + 1}`}
              >
                <CardContent className="pt-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge
                      className={`text-xs ${
                        f.badge === "Premium"
                          ? "bg-accent/15 text-accent-foreground border-accent/40"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {f.badge}
                    </Badge>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────
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
    { feature: "Priority AI Recommendations", free: false, premium: true },
  ];

  function Cell({ val }: { val: boolean | string }) {
    if (val === true)
      return <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />;
    if (val === false)
      return <XCircle className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
    return <span className="text-sm text-foreground font-medium">{val}</span>;
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Plan Comparison
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-3xl md:text-4xl text-foreground"
          >
            Free vs Premium
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-border shadow-sm"
          data-ocid="comparison.table"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-muted/50">
            <div className="p-4 font-display font-semibold text-foreground">
              Feature
            </div>
            <div className="p-4 font-display font-semibold text-center text-muted-foreground">
              Free
            </div>
            <div
              className="p-4 font-display font-bold text-center rounded-t-lg"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.72 0.15 60 / 0.15), transparent)",
                color: "oklch(0.55 0.15 60)",
                borderTop: "2px solid oklch(0.72 0.15 60 / 0.5)",
              }}
            >
              ✦ Premium
            </div>
          </div>
          <Separator />
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-border last:border-b-0 ${
                i % 2 === 0 ? "bg-card" : "bg-muted/20"
              }`}
              data-ocid={`comparison.row.${i + 1}`}
            >
              <div className="p-3.5 text-sm text-foreground">{row.feature}</div>
              <div className="p-3.5 flex items-center justify-center">
                <Cell val={row.free} />
              </div>
              <div
                className="p-3.5 flex items-center justify-center"
                style={{ borderLeft: "1px solid oklch(0.72 0.15 60 / 0.2)" }}
              >
                <Cell val={row.premium} />
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <Link to="/premium">
            <Button
              size="lg"
              className="font-semibold px-10"
              style={{
                background: "oklch(0.72 0.15 60)",
                color: "oklch(0.12 0.02 60)",
              }}
              data-ocid="comparison.upgrade_button"
            >
              <Star className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Success Roadmap ─────────────────────────────────────────────────
function RoadmapSection() {
  const steps = [
    {
      num: "01",
      title: "Complete Your Profile",
      desc: "Share your income, expenses, age, education, and goals in under 3 minutes.",
    },
    {
      num: "02",
      title: "Get Your AI Plan",
      desc: "Receive a suggested savings plan, career path, and business ideas tailored to your situation.",
    },
    {
      num: "03",
      title: "Take Daily Action",
      desc: "Follow your personalized daily tasks, spending limits, and career milestones.",
    },
    {
      num: "04",
      title: "Track Your Progress",
      desc: "Monitor savings score, emergency fund, career growth, and life plan milestones on your dashboard.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Your Journey
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-3xl md:text-4xl text-foreground"
          >
            Start to Financial Clarity in 4 Steps
          </motion.h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/30 via-primary to-accent/50 z-0" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-center text-center gap-4"
                data-ocid={`roadmap.step.${i + 1}`}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-2xl shadow-lg"
                  style={{
                    background:
                      i < 3
                        ? "linear-gradient(135deg, oklch(0.65 0.2 190), oklch(0.55 0.22 195))"
                        : "linear-gradient(135deg, oklch(0.72 0.15 60), oklch(0.65 0.18 55))",
                    color: "oklch(0.97 0.01 260)",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      initials: "RK",
      name: "Rahul Khandelwal",
      location: "Jaipur, Rajasthan",
      stars: 5,
      quote:
        "I was spending ₹4,000 on food delivery every month and had zero savings. SaveFuture AI suggested a budget and I've now saved ₹18,000 in 4 months. The plan felt like it was written just for me.",
      color: "oklch(0.65 0.2 190)",
    },
    {
      initials: "PS",
      name: "Priya Shetty",
      location: "Bangalore, Karnataka",
      stars: 5,
      quote:
        "After 12th I was totally confused about which stream to choose. The career guidance section showed me expected salaries and job roles clearly. I'm now pursuing BCA with a clear roadmap.",
      color: "oklch(0.72 0.15 60)",
    },
    {
      initials: "AM",
      name: "Arjun Mishra",
      location: "Lucknow, UP",
      stars: 5,
      quote:
        "As a delivery worker earning ₹15,000/month, I never thought I could build savings. The app's suggested daily saving target of ₹100 felt doable. My emergency fund is growing steadily now.",
      color: "oklch(0.6 0.18 280)",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Real Stories
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-3xl md:text-4xl text-foreground"
          >
            People Like You, Taking Control
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-3 text-muted-foreground"
          >
            Based on suggested plans. Individual results may vary.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp} custom={i}>
              <Card
                className="h-full card-elevated hover:shadow-lg transition-smooth"
                data-ocid={`testimonials.card.${i + 1}`}
              >
                <CardContent className="pt-6 flex flex-col gap-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star
                        key={`star-${t.name}-${si}`}
                        className="w-4 h-4 fill-current"
                        style={{ color: "oklch(0.72 0.15 60)" }}
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm text-foreground leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-display font-bold flex-shrink-0"
                      style={{
                        background: t.color,
                        color: "oklch(0.97 0.01 260)",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────────
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
        "Ad-supported",
      ],
      cta: "Start Free",
      highlight: false,
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
        "No ads",
      ],
      cta: "Get Monthly",
      highlight: false,
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
        "Save ₹389 vs monthly",
      ],
      cta: "Get Yearly",
      highlight: true,
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
        "Highest priority support",
      ],
      cta: "Get Lifetime",
      highlight: false,
    },
  ];

  return (
    <section className="py-24 bg-muted/30" id="pricing">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-3xl md:text-4xl text-foreground"
          >
            Simple, Transparent Plans
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-3 text-muted-foreground"
          >
            Start free. Upgrade when you&apos;re ready for the full picture.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              custom={i}
              className="flex"
            >
              <Card
                className={`w-full flex flex-col ${
                  plan.highlight ? "relative shadow-xl" : "card-elevated"
                }`}
                style={
                  plan.highlight
                    ? { border: "2px solid oklch(0.72 0.15 60 / 0.7)" }
                    : {}
                }
                data-ocid={`pricing.card.${i + 1}`}
              >
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                    style={{
                      background: "oklch(0.72 0.15 60)",
                      color: "oklch(0.12 0.02 60)",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}
                <CardContent className="pt-6 flex flex-col flex-1 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      {plan.name}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="font-display font-black text-4xl text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground text-sm pb-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/premium">
                    <Button
                      className="w-full mt-4 font-semibold transition-smooth"
                      style={
                        plan.highlight
                          ? {
                              background: "oklch(0.72 0.15 60)",
                              color: "oklch(0.12 0.02 60)",
                            }
                          : {}
                      }
                      variant={plan.highlight ? undefined : "outline"}
                      data-ocid={`pricing.cta_button.${i + 1}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    {
      q: "Is SaveFuture AI free to use?",
      a: "Yes! The basic plan is completely free with access to a basic savings planner, monthly budget generator, and 3 business ideas. Premium plans unlock the full 10-year roadmap, advanced career guidance, and more.",
    },
    {
      q: "How does the AI suggestion work?",
      a: "After you complete your profile (income, expenses, age, goals, skills), our AI analyzes your data and generates a suggested personalized plan. Results are estimates based on your profile — not guaranteed outcomes.",
    },
    {
      q: "Is my personal and financial data safe?",
      a: "Yes. Your data is stored securely on a decentralized network with end-to-end protection. We never sell or share your personal information with third parties.",
    },
    {
      q: "Can I cancel my Premium subscription anytime?",
      a: "Absolutely. Monthly and yearly plans can be cancelled at any time from your profile settings. You retain access until the end of your billing period.",
    },
    {
      q: "What if I'm a student with no income?",
      a: "SaveFuture AI is designed for students too! You can enter ₹0 income and still get a career roadmap, education planner, and business ideas suited to your situation. Many students find the career guidance feature especially helpful.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-display font-bold text-3xl md:text-4xl text-foreground"
          >
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3"
          data-ocid="faq.list"
        >
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-border overflow-hidden"
              data-ocid={`faq.item.${i + 1}`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-foreground hover:bg-muted/50 transition-smooth"
                onClick={() => setOpen(open === i ? null : i)}
                data-ocid={`faq.toggle.${i + 1}`}
              >
                <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const trustBadges = [
    { icon: Shield, label: "256-bit Secure" },
    { icon: Sparkles, label: "AI-Powered" },
    { icon: Users, label: "50K+ Users" },
  ];

  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                SaveFuture <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Suggested savings plans, career guidance, and life planning for
              every Indian.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {trustBadges.map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground"
                >
                  <b.icon className="w-3 h-3" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: [
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Career Guidance", href: "/career" },
                { label: "Business Ideas", href: "/business" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "Home", href: "/" },
                { label: "About", href: "/" },
                { label: "Blog", href: "/" },
                { label: "Support", href: "/" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy Policy", href: "/" },
                { label: "Terms of Service", href: "/" },
                { label: "Refund Policy", href: "/" },
                { label: "Cookie Policy", href: "/" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-center">
            Results shown are <em>estimated</em> and <em>suggested</em> based on
            profile data. Individual outcomes may vary.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Composition ─────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen" data-ocid="landing.page">
      <NavBar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <ComparisonSection />
        <RoadmapSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
