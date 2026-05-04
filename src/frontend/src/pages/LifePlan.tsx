import { FeatureLockOverlay } from "@/components/FeatureLockOverlay";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "@tanstack/react-router";
import { CheckSquare, Crown, Sparkles, Target } from "lucide-react";
import { motion } from "motion/react";

interface Milestone {
  text: string;
}

interface Phase {
  id: string;
  label: string;
  yearRange: string;
  focus: string;
  colorDot: string;
  colorBadge: string;
  colorBorder: string;
  colorAccent: string;
  free: boolean;
  milestones: Milestone[];
  outcomeTemplate: (income: number, savings: number) => string;
}

const PHASES: Phase[] = [
  {
    id: "year-1",
    label: "Year 1",
    yearRange: "Foundation",
    focus: "Discipline & Basics",
    colorDot: "bg-primary",
    colorBadge: "bg-primary/10 text-primary",
    colorBorder: "border-primary/30",
    colorAccent: "from-primary/5 to-transparent",
    free: true,
    milestones: [
      { text: "Control daily expenses below monthly income" },
      { text: "Build ₹10,000 emergency fund" },
      { text: "Learn one marketable skill (online/offline)" },
      { text: "Track expenses every week, review every month" },
    ],
    outcomeTemplate: (income, savings) =>
      `Estimated savings by end of Year 1: ₹${Math.round((income * 0.15 + savings) / 1000)}K — Suggested path`,
  },
  {
    id: "year-2",
    label: "Year 2",
    yearRange: "Income Growth",
    focus: "Side Income & Skills",
    colorDot: "bg-chart-5",
    colorBadge: "bg-chart-5/10 text-chart-5",
    colorBorder: "border-chart-5/30",
    colorAccent: "from-chart-5/5 to-transparent",
    free: true,
    milestones: [
      { text: "Increase income by estimated 20% via skill/raise/freelance" },
      { text: "Start one side income source (₹3,000–₹10,000/mo suggested)" },
      { text: "Upgrade skill with a recognized certification" },
      {
        text: "Save 3-month emergency fund (may help reduce financial stress)",
      },
    ],
    outcomeTemplate: (income, savings) =>
      `Estimated savings by Year 2: ₹${Math.round((income * 0.2 * 12 + savings) / 1000)}K — Based on your profile`,
  },
  {
    id: "year-3-5",
    label: "Years 3–5",
    yearRange: "Stability Phase",
    focus: "Invest & Build Career",
    colorDot: "bg-accent",
    colorBadge: "bg-accent/10 text-accent-foreground",
    colorBorder: "border-accent/30",
    colorAccent: "from-accent/5 to-transparent",
    free: false,
    milestones: [
      { text: "Invest in education or business (estimated ₹50K–₹2L range)" },
      { text: "Build a stable career path aligned to your goals" },
      { text: "Start basic investing — SIP or FD basics" },
      { text: "Grow total savings to an estimated ₹2 lakh milestone" },
    ],
    outcomeTemplate: (income) =>
      `Estimated savings by Year 5: ₹${Math.round((income * 0.25 * 36) / 1000)}K — Suggested path`,
  },
  {
    id: "year-5-8",
    label: "Years 5–8",
    yearRange: "Growth Phase",
    focus: "Assets & Scale",
    colorDot: "bg-chart-4",
    colorBadge: "bg-chart-4/10 text-chart-4",
    colorBorder: "border-chart-4/30",
    colorAccent: "from-chart-4/5 to-transparent",
    free: false,
    milestones: [
      { text: "Grow income significantly via career growth or business" },
      { text: "Buy productive assets (land, equipment, digital assets)" },
      { text: "Scale business or achieve senior career position" },
      { text: "Family financial planning — insurance, child education fund" },
    ],
    outcomeTemplate: (income) =>
      `Estimated net worth by Year 8: ₹${Math.round((income * 0.3 * 72) / 1000)}K+ — Based on your profile`,
  },
  {
    id: "year-8-12",
    label: "Years 8–12",
    yearRange: "Security Phase",
    focus: "Freedom & Legacy",
    colorDot: "bg-chart-3",
    colorBadge: "bg-chart-3/10 text-chart-3",
    colorBorder: "border-chart-3/30",
    colorAccent: "from-chart-3/5 to-transparent",
    free: false,
    milestones: [
      { text: "Business expansion or high-paying career milestone" },
      { text: "Financial security for family — may reduce daily money stress" },
      { text: "Retirement planning basics — NPS, PPF, mutual funds" },
      { text: "Create passive income streams (rental, dividends, digital)" },
    ],
    outcomeTemplate: (income) =>
      `Estimated financial security milestone: ₹${Math.round((income * 0.35 * 120) / 1000)}K+ — Estimated range`,
  },
];

function MilestoneItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      key={text}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="flex items-start gap-2.5 text-sm text-foreground/80"
    >
      <CheckSquare className="w-4 h-4 text-primary/70 shrink-0 mt-0.5" />
      <span>{text}</span>
    </motion.li>
  );
}

function PhaseCard({
  phase,
  index,
  isRight,
  income,
  savings,
  locked,
}: {
  phase: Phase;
  index: number;
  isRight: boolean;
  income: number;
  savings: number;
  locked: boolean;
}) {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-card rounded-2xl border ${phase.colorBorder} p-5 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br ${phase.colorAccent}`}
      data-ocid={`lifeplan.phase-card.${index + 1}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${phase.colorBadge}`}
          >
            {phase.label}
          </span>
          {!phase.free && (
            <Crown className="w-3.5 h-3.5 text-accent" aria-label="Premium" />
          )}
        </div>
        <Badge variant="outline" className="text-xs text-muted-foreground">
          {phase.focus}
        </Badge>
      </div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
        {phase.yearRange}
      </p>
      <ul className="flex flex-col gap-2 mb-4">
        {phase.milestones.map((m, mi) => (
          <MilestoneItem key={m.text} text={m.text} index={mi} />
        ))}
      </ul>
      <div
        className={`mt-3 pt-3 border-t ${phase.colorBorder} flex items-center gap-1.5`}
      >
        <Target className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <p className="text-xs text-muted-foreground italic">
          {phase.outcomeTemplate(income, savings)}
        </p>
      </div>
    </motion.div>
  );

  if (locked) {
    return (
      <FeatureLockOverlay
        locked
        title="See your full 10-year financial roadmap"
        description="Track every milestone with personalized estimates. Premium unlocks your complete life plan."
      >
        {cardContent}
      </FeatureLockOverlay>
    );
  }

  return cardContent;
}

function TimelineDot({ phase }: { phase: Phase }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`w-5 h-5 rounded-full ${phase.colorDot} ring-4 ring-background shadow-sm shrink-0 z-10`}
    />
  );
}

function ProgressBanner({
  income,
  savings,
}: {
  income: number;
  savings: number;
}) {
  const year1Target = Math.round((income * 0.15 * 12 + savings) / 1000);
  const daily = Math.round((income * 0.15) / 30);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-primary/20 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 mb-8"
      data-ocid="lifeplan.progress_banner"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-display font-bold text-foreground text-sm">
            Year 1 of 10 — Suggested Savings Target
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Estimated ₹{year1Target}K by end of Year 1 · Suggested daily save: ₹
            {daily}/day
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <div className="text-center bg-card rounded-xl px-3 py-2 border border-border">
          <p className="text-xs text-muted-foreground">Monthly Income</p>
          <p className="font-display font-bold text-primary text-sm">
            ₹{income.toLocaleString()}
          </p>
        </div>
        <div className="text-center bg-card rounded-xl px-3 py-2 border border-border">
          <p className="text-xs text-muted-foreground">Current Savings</p>
          <p className="font-display font-bold text-chart-5 text-sm">
            ₹{savings.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LifePlan() {
  const { data: profile } = useProfile();
  const { data: subscription } = useSubscription();

  const isPremium =
    subscription?.status === "active" || subscription?.plan === "lifetime";

  const income = profile ? Number(profile.monthlyIncome) : 25000;
  const savings = profile ? Number(profile.currentSavings) : 0;

  const navigate = useNavigate();

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-8 max-w-4xl"
        data-ocid="lifeplan.page"
      >
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Life & Financial Roadmap
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
            10-Year Life &amp; Financial Roadmap
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Your estimated path to financial security and growth. Results may
            vary — this is a suggested path based on your profile.
          </p>
        </motion.div>

        {/* Safe wording disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xs text-muted-foreground/70 italic mb-6"
        >
          * All figures are estimated ranges. Actual outcomes depend on
          individual effort, market conditions, and life circumstances.
        </motion.p>

        {/* Progress banner */}
        <ProgressBanner income={income} savings={savings} />

        {/* Upgrade banner for free users */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/25 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3"
            data-ocid="lifeplan.premium_banner"
          >
            <Crown className="w-5 h-5 text-accent shrink-0" />
            <div className="flex-1">
              <p className="font-display font-semibold text-foreground text-sm">
                Unlock your complete 10-year financial roadmap
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                See personalized milestones for Years 3–12 with savings targets,
                income goals, and investment suggestions.
              </p>
            </div>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0"
              onClick={() => navigate({ to: "/premium" })}
              data-ocid="lifeplan.upgrade_cta_button"
            >
              Get Premium
            </Button>
          </motion.div>
        )}

        {/* Timeline */}
        <div className="relative" data-ocid="lifeplan.timeline">
          {/* Vertical center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-accent/30 to-chart-3/20 rounded-full z-0" />

          {/* Vertical left line — mobile */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-accent/30 to-chart-3/20 rounded-full z-0" />

          <div className="flex flex-col gap-0">
            {PHASES.map((phase, index) => {
              const isRight = index % 2 === 1;
              const locked = !phase.free && !isPremium;

              return (
                <div
                  key={phase.id}
                  className="relative"
                  data-ocid={`lifeplan.timeline-row.${index + 1}`}
                >
                  {/* Desktop: two-column alternating */}
                  <div className="hidden md:flex items-center gap-0 mb-8">
                    {/* Left column */}
                    <div className="flex-1 flex justify-end pr-6">
                      {!isRight && (
                        <div className="w-full max-w-sm">
                          <PhaseCard
                            phase={phase}
                            index={index}
                            isRight={false}
                            income={income}
                            savings={savings}
                            locked={locked}
                          />
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="flex flex-col items-center justify-center z-10">
                      <TimelineDot phase={phase} />
                    </div>

                    {/* Right column */}
                    <div className="flex-1 flex justify-start pl-6">
                      {isRight && (
                        <div className="w-full max-w-sm">
                          <PhaseCard
                            phase={phase}
                            index={index}
                            isRight
                            income={income}
                            savings={savings}
                            locked={locked}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile: single column with left dot */}
                  <div className="md:hidden flex items-start gap-4 mb-6 pl-2">
                    <div className="flex flex-col items-center mt-1.5">
                      <TimelineDot phase={phase} />
                      {index < PHASES.length - 1 && (
                        <div className="w-0.5 h-full min-h-[2rem] bg-border mt-1" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <PhaseCard
                        phase={phase}
                        index={index}
                        isRight={false}
                        income={income}
                        savings={savings}
                        locked={locked}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA for free users */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-4 bg-gradient-to-br from-primary/8 via-card to-accent/8 border border-primary/20 rounded-2xl p-6 text-center"
            data-ocid="lifeplan.bottom_cta"
          >
            <Crown className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-display font-bold text-foreground text-lg mb-1">
              See your full 10-year financial roadmap
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
              Track every milestone with personalized savings targets, income
              projections, and step-by-step guidance. Based on your real
              profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate({ to: "/premium" })}
                data-ocid="lifeplan.view_plans_button"
              >
                View Plans
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => navigate({ to: "/premium" })}
                data-ocid="lifeplan.get_premium_button"
              >
                Get Premium — ₹99/month
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
