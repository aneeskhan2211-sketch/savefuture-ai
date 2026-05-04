import { Layout } from "@/components/Layout";
import { PremiumGuard } from "@/components/PremiumGuard";
import { BookOpen, Shield, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const AI_RECS = [
  {
    icon: TrendingUp,
    category: "Savings",
    title: "Reduce food delivery expenses",
    detail:
      "Suggested saving: ₹1,500/month. Cook 3 extra meals per week to reduce delivery orders.",
    impact: "High",
  },
  {
    icon: Shield,
    category: "Emergency Fund",
    title: "Build ₹30,000 emergency buffer",
    detail: "Save ₹5,000/month for 6 months. Keep in a liquid savings account.",
    impact: "Critical",
  },
  {
    icon: BookOpen,
    category: "Career",
    title: "Complete a free online certification",
    detail:
      "Google Career Certificate (3 months) may increase earning potential by 30–50%.",
    impact: "High",
  },
  {
    icon: Sparkles,
    category: "Income",
    title: "Start a weekend freelance project",
    detail:
      "Based on your skills, you may earn an estimated ₹5,000–₹15,000/month freelancing.",
    impact: "Medium",
  },
  {
    icon: TrendingUp,
    category: "Debt",
    title: "Pay off highest-interest debt first",
    detail:
      "Avalanche method — tackle highest APR debt first to minimize total interest paid.",
    impact: "High",
  },
  {
    icon: BookOpen,
    category: "Investment",
    title: "Start ₹500/month SIP investment",
    detail:
      "A small SIP started now may grow significantly over 10 years via compound returns. Estimated — not guaranteed.",
    impact: "Medium",
  },
];

const IMPACT_COLOR: Record<string, string> = {
  High: "bg-primary/10 text-primary",
  Critical: "bg-destructive/10 text-destructive",
  Medium: "bg-accent/15 text-accent",
};

export default function AISuggestions() {
  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-6"
        data-ocid="ai_suggestions.page"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              AI Recommendations
            </h1>
            <p className="text-sm text-muted-foreground">
              Personalized suggestions based on your profile. Estimates —
              individual results may vary.
            </p>
          </div>
        </div>

        <PremiumGuard
          title="Full AI Recommendations"
          description="Upgrade to get unlimited personalized AI-powered financial and career recommendations."
        >
          <div className="grid md:grid-cols-2 gap-4">
            {AI_RECS.map((rec, i) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border p-5 card-elevated hover:shadow-premium transition-smooth"
                data-ocid={`ai_suggestions.rec_card.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <rec.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {rec.category}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${IMPACT_COLOR[rec.impact]}`}
                  >
                    {rec.impact}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {rec.title}
                </h3>
                <p className="text-sm text-muted-foreground">{rec.detail}</p>
              </motion.div>
            ))}
          </div>
        </PremiumGuard>
      </div>
    </Layout>
  );
}
