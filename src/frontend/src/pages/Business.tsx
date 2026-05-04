import { FeatureLockOverlay } from "@/components/FeatureLockOverlay";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import {
  BookOpen,
  Briefcase,
  ChevronRight,
  Filter,
  Lightbulb,
  Megaphone,
  Rocket,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface BusinessIdea {
  id: string;
  title: string;
  level: "Basic" | "Medium" | "Advanced";
  startingBudgetMin: number; // in ₹
  startingBudgetMax: number;
  earningMin: number;
  earningMax: number;
  riskLevel: "Low" | "Medium" | "High" | "Very Low" | "Medium-High";
  requiredSkills: string[];
  stepByStepPlan: string[];
  toolsNeeded: string[];
  marketingStrategy: string[];
  category: string;
  icon: React.ReactNode;
}

// ── Static Data ────────────────────────────────────────────────────────────
const ALL_BUSINESS_IDEAS: BusinessIdea[] = [
  // BASIC (7)
  {
    id: "tiffin-service",
    title: "Tiffin Service",
    level: "Basic",
    startingBudgetMin: 5000,
    startingBudgetMax: 15000,
    earningMin: 15000,
    earningMax: 40000,
    riskLevel: "Low",
    requiredSkills: [
      "Cooking",
      "Time management",
      "Hygiene standards",
      "Basic accounting",
    ],
    stepByStepPlan: [
      "Identify 10–15 office workers or students near your area",
      "Plan a weekly menu with 2–3 meal options per day",
      "Buy food containers, tiffin boxes, and raw materials",
      "Start with 10 tiffins/day and collect orders via WhatsApp",
      "Deliver on time consistently to build trust and referrals",
      "Scale to 30–50 tiffins/day within 2 months",
    ],
    toolsNeeded: [
      "WhatsApp Business",
      "Google Forms (orders)",
      "UPI payment app",
    ],
    marketingStrategy: [
      "Word-of-mouth from first 5 satisfied customers",
      "Post food photos in local Facebook/WhatsApp groups",
      "Offer first week discount to attract bulk orders",
    ],
    category: "food",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "reselling-business",
    title: "Reselling Business",
    level: "Basic",
    startingBudgetMin: 2000,
    startingBudgetMax: 10000,
    earningMin: 8000,
    earningMax: 25000,
    riskLevel: "Low",
    requiredSkills: [
      "Sales",
      "Communication",
      "WhatsApp usage",
      "Basic negotiation",
    ],
    stepByStepPlan: [
      "Sign up on Meesho, GlowRoad, or Shop101",
      "Choose 1–2 product categories (clothing, accessories, kitchen)",
      "Share product catalogs in WhatsApp groups and Instagram stories",
      "Take orders and let the platform handle shipping",
      "Collect payments via UPI and track profits weekly",
      "Gradually build a loyal customer base for repeat orders",
    ],
    toolsNeeded: ["Meesho / GlowRoad app", "WhatsApp Business", "UPI payment"],
    marketingStrategy: [
      "Join 10–20 local WhatsApp groups for promotions",
      "Post daily deals on Instagram Reels",
      "Refer friends for extra commission",
    ],
    category: "retail",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: "mobile-repair-shop",
    title: "Mobile Repair Shop",
    level: "Basic",
    startingBudgetMin: 15000,
    startingBudgetMax: 40000,
    earningMin: 20000,
    earningMax: 50000,
    riskLevel: "Low",
    requiredSkills: [
      "Mobile hardware knowledge",
      "Soldering",
      "Customer handling",
    ],
    stepByStepPlan: [
      "Complete a 1-month mobile repair course (₹3,000–₹5,000)",
      "Buy basic tools: screwdrivers, soldering iron, screen replacements",
      "Set up a small shop or home-based service point",
      "Offer screen replacement, battery, and charging port repairs",
      "Partner with nearby mobile accessory shops for referrals",
      "Expand to tablet and laptop repairs after 6 months",
    ],
    toolsNeeded: [
      "Screwdriver set",
      "Soldering iron",
      "Heat gun",
      "Ultrasonic cleaner",
    ],
    marketingStrategy: [
      "Print visiting cards and distribute near colleges",
      "List on JustDial and Google My Business",
      "Offer free screen cleaning to attract first-time customers",
    ],
    category: "tech",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    id: "tuition-classes",
    title: "Tuition Classes",
    level: "Basic",
    startingBudgetMin: 1000,
    startingBudgetMax: 5000,
    earningMin: 8000,
    earningMax: 30000,
    riskLevel: "Very Low",
    requiredSkills: ["Subject expertise", "Teaching patience", "Communication"],
    stepByStepPlan: [
      "Identify your strongest subjects (Math, Science, English)",
      "Start with 3–5 students from your neighbourhood",
      "Set up a clean study space at home",
      "Create a structured syllabus and study materials",
      "Expand to online classes via Zoom or Google Meet",
      "Grow to 20+ students via word-of-mouth within 6 months",
    ],
    toolsNeeded: ["Whiteboard", "Zoom / Google Meet", "Basic stationery"],
    marketingStrategy: [
      "Inform parents in housing societies and schools",
      "Share results of top-performing students",
      "Offer a free demo class to new students",
    ],
    category: "education",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: "delivery-support",
    title: "Delivery Support",
    level: "Basic",
    startingBudgetMin: 0,
    startingBudgetMax: 5000,
    earningMin: 12000,
    earningMax: 25000,
    riskLevel: "Very Low",
    requiredSkills: [
      "Two-wheeler riding",
      "Route knowledge",
      "Time management",
    ],
    stepByStepPlan: [
      "Register on Swiggy, Zomato, Dunzo, or Blinkit as delivery partner",
      "Ensure valid driving license, Aadhaar, and PAN card",
      "Pick delivery slots during peak hours (12–2pm and 7–10pm)",
      "Maintain 4.5+ rating for priority orders",
      "Earn incentive bonuses by completing weekly targets",
      "Save ₹3,000–₹5,000/month toward your next business",
    ],
    toolsNeeded: [
      "Two-wheeler",
      "Smartphone with internet",
      "Insulated delivery bag",
    ],
    marketingStrategy: [
      "Sign up for multiple platforms to maximize orders",
      "Work during festivals for extra surge earnings",
    ],
    category: "logistics",
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    id: "small-grocery",
    title: "Small Grocery Shop",
    level: "Basic",
    startingBudgetMin: 30000,
    startingBudgetMax: 80000,
    earningMin: 15000,
    earningMax: 40000,
    riskLevel: "Low",
    requiredSkills: [
      "Customer service",
      "Inventory management",
      "Basic accounting",
    ],
    stepByStepPlan: [
      "Identify a gap in your locality (no nearby grocery store)",
      "Rent a 100–200 sq ft shop space",
      "Stock daily essentials: rice, dal, oil, spices, snacks",
      "Register FSSAI license for food items",
      "Accept payments via UPI and offer home delivery for regular customers",
      "List on Swiggy Instamart or Zepto for extra orders",
    ],
    toolsNeeded: [
      "POS billing machine",
      "Shelving racks",
      "Weighing scale",
      "UPI QR",
    ],
    marketingStrategy: [
      "Loyalty cards for regular customers",
      "WhatsApp group for deals and new arrivals",
      "Home delivery for ₹25 within 1 km radius",
    ],
    category: "retail",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "freelancing-services",
    title: "Freelancing Services",
    level: "Basic",
    startingBudgetMin: 0,
    startingBudgetMax: 5000,
    earningMin: 10000,
    earningMax: 50000,
    riskLevel: "Low",
    requiredSkills: [
      "Writing / Design / Coding / Video editing",
      "Communication",
      "Deadline management",
    ],
    stepByStepPlan: [
      "Pick 1 skill: copywriting, graphic design, web dev, or video editing",
      "Create a free portfolio on Behance, GitHub, or Notion",
      "Register on Fiverr, Upwork, or Freelancer.com",
      "Offer 1 free project to build credibility and reviews",
      "Apply for 5–10 gigs daily with personalized proposals",
      "Raise rates after 10 successful projects",
    ],
    toolsNeeded: [
      "Laptop",
      "Canva / Figma / VS Code",
      "Fiverr / Upwork profile",
    ],
    marketingStrategy: [
      "Showcase work on LinkedIn and Instagram",
      "Ask clients for 5-star reviews on platform",
      "Join niche Facebook groups for referrals",
    ],
    category: "digital",
    icon: <Star className="w-5 h-5" />,
  },
  // MEDIUM (6)
  {
    id: "digital-marketing-agency",
    title: "Digital Marketing Agency",
    level: "Medium",
    startingBudgetMin: 20000,
    startingBudgetMax: 80000,
    earningMin: 50000,
    earningMax: 200000,
    riskLevel: "Medium",
    requiredSkills: [
      "SEO",
      "Social media ads",
      "Google Ads",
      "Copywriting",
      "Analytics",
    ],
    stepByStepPlan: [
      "Complete Google Ads and Meta Blueprint certifications (free)",
      "Offer free 30-day social media management to 1 local business",
      "Document results and build a case study",
      "Onboard 3–5 paying clients at ₹8,000–₹15,000/month each",
      "Hire a freelance content creator as you scale",
      "Niche down into one industry (restaurants, clinics, e-commerce) for authority",
    ],
    toolsNeeded: [
      "Canva Pro",
      "Meta Ads Manager",
      "Google Analytics",
      "Hootsuite",
      "Semrush",
    ],
    marketingStrategy: [
      "Publish LinkedIn thought leadership posts weekly",
      "Cold email 20 local businesses per day",
      "Run free webinars on digital marketing basics",
    ],
    category: "digital",
    icon: <Megaphone className="w-5 h-5" />,
  },
  {
    id: "cloud-kitchen",
    title: "Cloud Kitchen",
    level: "Medium",
    startingBudgetMin: 50000,
    startingBudgetMax: 150000,
    earningMin: 40000,
    earningMax: 150000,
    riskLevel: "Medium",
    requiredSkills: [
      "Cooking expertise",
      "Food packaging",
      "Online order management",
      "FSSAI compliance",
    ],
    stepByStepPlan: [
      "Get FSSAI license and GST registration",
      "Register on Swiggy and Zomato as a restaurant partner",
      "Start with a focused menu of 5–8 dishes",
      "Invest in good packaging for brand recognition",
      "Use Instagram to post food reels and build a local following",
      "Add a second brand on the same kitchen after 6 months",
    ],
    toolsNeeded: [
      "Commercial kitchen equipment",
      "Zomato / Swiggy partner app",
      "Packaging supplies",
    ],
    marketingStrategy: [
      "Instagram Reels showcasing food preparation",
      "Collaborate with local food bloggers",
      "Offer discount on first 50 orders on each platform",
    ],
    category: "food",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Store",
    level: "Medium",
    startingBudgetMin: 30000,
    startingBudgetMax: 100000,
    earningMin: 30000,
    earningMax: 200000,
    riskLevel: "Medium",
    requiredSkills: [
      "Product sourcing",
      "Listing optimization",
      "Marketing",
      "Customer support",
    ],
    stepByStepPlan: [
      "Find a niche product with high demand and low competition",
      "Source products from IndiaMART or wholesale markets",
      "Create a seller account on Amazon/Flipkart",
      "Optimize listings with high-quality photos and SEO titles",
      "Run Sponsored Product Ads with ₹5,000/month budget",
      "Build your own Shopify store after consistent Amazon sales",
    ],
    toolsNeeded: [
      "Amazon Seller Central",
      "Canva (photos)",
      "Jungle Scout (research)",
      "Shopify",
    ],
    marketingStrategy: [
      "Amazon PPC ads for visibility boost",
      "Collect reviews from every buyer via follow-up email",
      "Build brand presence on Instagram and YouTube",
    ],
    category: "retail",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: "laptop-resale",
    title: "Laptop Resale Business",
    level: "Medium",
    startingBudgetMin: 50000,
    startingBudgetMax: 150000,
    earningMin: 30000,
    earningMax: 80000,
    riskLevel: "Medium",
    requiredSkills: [
      "Hardware knowledge",
      "Negotiation",
      "Market pricing",
      "Sales",
    ],
    stepByStepPlan: [
      "Build supplier contacts from OLX, Quikr, and IT liquidation sales",
      "Check, refurbish, and clean laptops before resale",
      "List on OLX, Facebook Marketplace, and your own Instagram page",
      "Offer 1-month warranty to build buyer confidence",
      "Specialize in a brand (Dell / HP / Lenovo) for expertise",
      "Expand to B2B sales for schools and small offices",
    ],
    toolsNeeded: [
      "Testing software (CPU-Z, HWMonitor)",
      "Cleaning kit",
      "Packaging material",
    ],
    marketingStrategy: [
      "Instagram page showcasing refurbished laptops",
      "Partner with computer institutes for bulk deals",
      "Offer student discounts with college ID",
    ],
    category: "tech",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    id: "local-service-marketplace",
    title: "Local Service Marketplace",
    level: "Medium",
    startingBudgetMin: 30000,
    startingBudgetMax: 100000,
    earningMin: 40000,
    earningMax: 120000,
    riskLevel: "Medium",
    requiredSkills: [
      "Sales",
      "Operations management",
      "Customer service",
      "Vendor management",
    ],
    stepByStepPlan: [
      "Choose a service vertical: plumbing, AC repair, cleaning, or beauty",
      "Onboard 10–15 verified service providers in your city",
      "Build a simple booking website or WhatsApp-based booking system",
      "Charge 15–25% commission per booking",
      "Build a Google My Business profile for local discovery",
      "Expand to 3–5 more service categories after first 3 months",
    ],
    toolsNeeded: [
      "WordPress website",
      "WhatsApp Business API",
      "UPI collect link",
    ],
    marketingStrategy: [
      "Google Ads targeting local service keywords",
      "Partner with housing societies for bulk service contracts",
      "Distribute flyers in residential complexes",
    ],
    category: "services",
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: "coaching-center",
    title: "Coaching Center",
    level: "Medium",
    startingBudgetMin: 30000,
    startingBudgetMax: 100000,
    earningMin: 50000,
    earningMax: 150000,
    riskLevel: "Low",
    requiredSkills: [
      "Teaching",
      "Curriculum design",
      "Marketing",
      "Team management",
    ],
    stepByStepPlan: [
      "Choose a high-demand exam: SSC, UPSC, JEE, NEET, or IELTS",
      "Rent a small space for 30–40 students",
      "Hire 2–3 subject matter experts on revenue sharing",
      "Launch free mock tests to attract students",
      "Build a YouTube channel with free exam tips",
      "Expand online via Zoom batches for students outside your city",
    ],
    toolsNeeded: [
      "Projector",
      "Zoom / Google Meet",
      "Test management software",
    ],
    marketingStrategy: [
      "Free mock test events in local schools and colleges",
      "YouTube channel for free exam prep content",
      "Referral discount for students who bring friends",
    ],
    category: "education",
    icon: <BookOpen className="w-5 h-5" />,
  },
  // ADVANCED (6)
  {
    id: "saas-business",
    title: "SaaS Business",
    level: "Advanced",
    startingBudgetMin: 100000,
    startingBudgetMax: 500000,
    earningMin: 100000,
    earningMax: 5000000,
    riskLevel: "High",
    requiredSkills: [
      "Software development",
      "Product thinking",
      "Sales",
      "Customer success",
    ],
    stepByStepPlan: [
      "Identify a recurring problem faced by a specific industry",
      "Validate with 10 potential customers before writing code",
      "Build MVP in 3 months using no-code tools or custom dev",
      "Launch on Product Hunt and acquire first 10 paying customers",
      "Iterate weekly based on customer feedback",
      "Set up subscription billing and build an inside sales process",
    ],
    toolsNeeded: [
      "AWS / Vercel",
      "Stripe for billing",
      "Intercom for support",
      "PostHog for analytics",
    ],
    marketingStrategy: [
      "Content marketing targeting Google keywords your users search",
      "Cold outreach to potential customers via LinkedIn",
      "Build in public on Twitter/X for early traction",
    ],
    category: "tech",
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    id: "franchise-model",
    title: "Franchise Model",
    level: "Advanced",
    startingBudgetMin: 500000,
    startingBudgetMax: 2000000,
    earningMin: 80000,
    earningMax: 300000,
    riskLevel: "Medium",
    requiredSkills: [
      "Business management",
      "Customer service",
      "Compliance",
      "Team leadership",
    ],
    stepByStepPlan: [
      "Research franchise options: AMUL, Subway, DTDC, Dr. Batra's",
      "Meet 3–5 existing franchise owners in the same brand",
      "Assess ROI, location requirements, and royalty fees",
      "Secure financing via bank loan or own savings",
      "Complete brand training and launch with their support",
      "Follow the proven operational playbook for consistent results",
    ],
    toolsNeeded: [
      "POS system (provided by brand)",
      "PAN / GST registration",
      "Shop agreement",
    ],
    marketingStrategy: [
      "Leverage parent brand's national advertising",
      "Local events and offers for community engagement",
      "Google My Business for local discovery",
    ],
    category: "retail",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: "import-export",
    title: "Import / Export Business",
    level: "Advanced",
    startingBudgetMin: 200000,
    startingBudgetMax: 1000000,
    earningMin: 100000,
    earningMax: 500000,
    riskLevel: "High",
    requiredSkills: [
      "Trade regulations",
      "Logistics",
      "Negotiation",
      "Banking",
      "Market research",
    ],
    stepByStepPlan: [
      "Get IEC (Import Export Code) from DGFT — costs ₹500",
      "Research high-margin products: spices, textiles, handicrafts",
      "Find buyers on IndiaMART, Alibaba, or trade fairs",
      "Start with small test shipments to assess demand",
      "Tie up with a customs broker and freight forwarder",
      "Scale after validating profit margins on 2–3 product categories",
    ],
    toolsNeeded: [
      "IEC certificate",
      "IndiaMART / Alibaba account",
      "Customs broker contact",
    ],
    marketingStrategy: [
      "Participate in trade fairs (FICCI, CII events)",
      "Build B2B connections on LinkedIn",
      "List on IndiaMART for inbound leads",
    ],
    category: "trade",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "b2b-service-company",
    title: "B2B Service Company",
    level: "Advanced",
    startingBudgetMin: 100000,
    startingBudgetMax: 500000,
    earningMin: 200000,
    earningMax: 1000000,
    riskLevel: "Medium-High",
    requiredSkills: [
      "Domain expertise",
      "Sales",
      "Team management",
      "Project delivery",
    ],
    stepByStepPlan: [
      "Identify a high-value service: HR outsourcing, IT support, accounting",
      "Get your first anchor client via your professional network",
      "Hire 2–3 specialists on contract for initial delivery",
      "Document processes for repeatable delivery quality",
      "Build a sales team to acquire 5–10 clients",
      "Aim for ₹10L+/month ARR within 18 months",
    ],
    toolsNeeded: [
      "CRM (HubSpot Free)",
      "Project management (Asana)",
      "GST registration",
    ],
    marketingStrategy: [
      "LinkedIn outreach targeting decision makers (CFO, HR heads)",
      "Case studies from first 3 clients",
      "Referral partnerships with complementary service providers",
    ],
    category: "services",
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: "ai-automation-agency",
    title: "AI Automation Agency",
    level: "Advanced",
    startingBudgetMin: 50000,
    startingBudgetMax: 200000,
    earningMin: 80000,
    earningMax: 500000,
    riskLevel: "Medium-High",
    requiredSkills: [
      "AI tools",
      "No-code automation",
      "Sales",
      "Process analysis",
    ],
    stepByStepPlan: [
      "Master n8n, Make.com, Zapier, and ChatGPT API",
      "Build 3 automation templates for common business problems",
      "Offer a free automation audit to 1 business",
      "Package as a ₹25,000–₹1L one-time setup + retainer service",
      "Create case studies showing time/cost saved by automation",
      "Scale with a team of automation specialists",
    ],
    toolsNeeded: [
      "n8n / Make.com",
      "ChatGPT API",
      "Airtable",
      "Google Workspace",
    ],
    marketingStrategy: [
      "YouTube tutorials demonstrating automations",
      "LinkedIn outreach to operations managers and founders",
      "Partner with digital marketing agencies for referrals",
    ],
    category: "tech",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: "lead-generation-platform",
    title: "Lead Generation Platform",
    level: "Advanced",
    startingBudgetMin: 100000,
    startingBudgetMax: 500000,
    earningMin: 100000,
    earningMax: 1000000,
    riskLevel: "High",
    requiredSkills: ["Digital marketing", "Data analysis", "Tech", "Sales"],
    stepByStepPlan: [
      "Choose a target industry: real estate, insurance, education",
      "Build landing pages optimized for lead capture",
      "Run Meta and Google Ads to drive traffic",
      "Sell leads to businesses at ₹200–₹2,000 per lead",
      "Build a CRM to track lead quality and conversion rates",
      "Scale ad spend as ROI is proven",
    ],
    toolsNeeded: [
      "Landing page builder",
      "Meta Ads",
      "Google Ads",
      "CRM software",
    ],
    marketingStrategy: [
      "Performance-based pricing to attract first clients",
      "Guarantee minimum leads per month to reduce buyer risk",
      "Build a portfolio of conversion rate metrics",
    ],
    category: "digital",
    icon: <Megaphone className="w-5 h-5" />,
  },
];

const FREE_IDEAS_LIMIT = 3;

const LEVEL_META = {
  Basic: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeClass: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    description:
      "Low investment, low risk — perfect for students and beginners",
  },
  Medium: {
    color: "bg-blue-50 text-blue-700 border-blue-200",
    badgeClass: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    description:
      "Moderate capital required — suitable for working professionals",
  },
  Advanced: {
    color: "bg-violet-50 text-violet-700 border-violet-200",
    badgeClass: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
    description: "High-growth potential — for experienced entrepreneurs",
  },
};

const RISK_BADGE: Record<string, string> = {
  "Very Low": "bg-emerald-100 text-emerald-700",
  Low: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  "Medium-High": "bg-orange-100 text-orange-700",
  High: "bg-red-100 text-red-700",
};

function formatCurrency(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `₹${n}`;
}

// ── Detail Modal ───────────────────────────────────────────────────────────
function BusinessDetailModal({
  idea,
  onClose,
}: {
  idea: BusinessIdea | null;
  onClose: () => void;
}) {
  if (!idea) return null;
  const meta = LEVEL_META[idea.level];
  return (
    <Dialog open={!!idea} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="business.detail_dialog"
      >
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
              {idea.icon}
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="font-display text-xl text-foreground leading-tight">
                {idea.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${meta.color}`}
                >
                  {idea.level}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RISK_BADGE[idea.riskLevel] ?? "bg-muted text-muted-foreground"}`}
                >
                  {idea.riskLevel} Risk
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-muted/50 rounded-xl p-3.5">
            <p className="text-xs text-muted-foreground mb-0.5">
              Starting Budget
            </p>
            <p className="font-display font-bold text-foreground text-base">
              {formatCurrency(idea.startingBudgetMin)} –{" "}
              {formatCurrency(idea.startingBudgetMax)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Estimated range
            </p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3.5">
            <p className="text-xs text-muted-foreground mb-0.5">
              Monthly Earning
            </p>
            <p className="font-display font-bold text-foreground text-base">
              {formatCurrency(idea.earningMin)} –{" "}
              {formatCurrency(idea.earningMax)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Expected range
            </p>
          </div>
        </div>

        {/* Required Skills */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">
              Required Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {idea.requiredSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Step-by-step plan */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2.5">
            <ChevronRight className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Suggested Launch Plan
            </h3>
          </div>
          <ol className="flex flex-col gap-2.5">
            {idea.stepByStepPlan.map((step, i) => (
              <li
                key={step.slice(0, 30)}
                className="flex gap-3 text-sm text-muted-foreground"
              >
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Tools */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">
              Tools Needed
            </h3>
          </div>
          <ul className="flex flex-col gap-1.5">
            {idea.toolsNeeded.map((tool) => (
              <li
                key={tool}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {tool}
              </li>
            ))}
          </ul>
        </div>

        {/* Marketing Strategy */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Megaphone className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">
              Suggested Marketing Strategy
            </h3>
          </div>
          <ul className="flex flex-col gap-1.5">
            {idea.marketingStrategy.map((strategy) => (
              <li
                key={strategy}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {strategy}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
          * All figures are estimated based on market data. Actual results may
          vary based on location, effort, and market conditions.
        </p>
      </DialogContent>
    </Dialog>
  );
}

// ── Business Card ──────────────────────────────────────────────────────────
function BusinessCard({
  idea,
  index,
  isLocked,
  isRecommended,
  onViewPlan,
}: {
  idea: BusinessIdea;
  index: number;
  isLocked: boolean;
  isRecommended: boolean;
  onViewPlan: () => void;
}) {
  const meta = LEVEL_META[idea.level];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ delay: (index % 6) * 0.07 }}
      className="relative bg-card rounded-2xl border border-border p-5 card-elevated hover:shadow-premium transition-smooth flex flex-col"
      data-ocid={`business.idea_card.${index + 1}`}
    >
      {isRecommended && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-accent/15 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">
          <Star className="w-3 h-3" /> Based on your profile
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          {idea.icon}
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="font-display font-semibold text-foreground text-sm leading-tight truncate">
            {idea.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${meta.color}`}
            >
              {idea.level}
            </span>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${RISK_BADGE[idea.riskLevel] ?? "bg-muted text-muted-foreground"}`}
            >
              {idea.riskLevel} Risk
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-muted/40 rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground">Starting Budget</p>
          <p className="text-xs font-semibold text-foreground">
            {formatCurrency(idea.startingBudgetMin)} –{" "}
            {formatCurrency(idea.startingBudgetMax)}
          </p>
        </div>
        <div className="bg-muted/40 rounded-lg p-2">
          <p className="text-[10px] text-muted-foreground">Est. Monthly</p>
          <p className="text-xs font-semibold text-foreground">
            {formatCurrency(idea.earningMin)} –{" "}
            {formatCurrency(idea.earningMax)}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mb-4 flex-1">
        {idea.requiredSkills.slice(0, 3).map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="text-[10px] px-1.5 py-0"
          >
            {skill}
          </Badge>
        ))}
        {idea.requiredSkills.length > 3 && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            +{idea.requiredSkills.length - 3}
          </Badge>
        )}
      </div>

      <Button
        type="button"
        size="sm"
        className="w-full mt-auto"
        onClick={onViewPlan}
        disabled={isLocked}
        data-ocid={`business.view_plan_button.${index + 1}`}
      >
        View Full Plan <ChevronRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Business() {
  const { data: profile } = useProfile();
  const { data: sub } = useSubscription();
  const isPremium = sub?.status === "active";

  const [activeLevel, setActiveLevel] = useState<
    "Basic" | "Medium" | "Advanced" | "All"
  >("All");
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [budgetMax, setBudgetMax] = useState(1000000);
  const [riskFilters, setRiskFilters] = useState<string[]>([]);
  const [earningMin, setEarningMin] = useState(0);

  const userRisk = profile?.riskLevel?.toLowerCase() ?? "";
  const userBusinessInterest = profile?.businessInterest?.toLowerCase() ?? "";

  const isRecommended = (idea: BusinessIdea): boolean => {
    if (!userRisk) return false;
    const riskMatch =
      (userRisk === "low" && ["Very Low", "Low"].includes(idea.riskLevel)) ||
      (userRisk === "medium" && ["Low", "Medium"].includes(idea.riskLevel)) ||
      (userRisk === "high" &&
        ["Medium", "Medium-High", "High"].includes(idea.riskLevel));
    const interestMatch =
      userBusinessInterest &&
      idea.title.toLowerCase().includes(userBusinessInterest.slice(0, 4));
    return riskMatch || !!interestMatch;
  };

  const filteredIdeas = useMemo(() => {
    return ALL_BUSINESS_IDEAS.filter((idea) => {
      const levelOk = activeLevel === "All" || idea.level === activeLevel;
      const budgetOk = idea.startingBudgetMin <= budgetMax;
      const riskOk =
        riskFilters.length === 0 || riskFilters.includes(idea.riskLevel);
      const earningOk = idea.earningMax >= earningMin;
      return levelOk && budgetOk && riskOk && earningOk;
    });
  }, [activeLevel, budgetMax, riskFilters, earningMin]);

  const toggleRisk = (risk: string) => {
    setRiskFilters((prev) =>
      prev.includes(risk) ? prev.filter((r) => r !== risk) : [...prev, risk],
    );
  };

  const levels: Array<"All" | "Basic" | "Medium" | "Advanced"> = [
    "All",
    "Basic",
    "Medium",
    "Advanced",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6" data-ocid="business.page">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Business Ideas
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Suggested business ideas based on your profile, budget, and risk
                level
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-shrink-0 gap-1.5"
              onClick={() => setShowFilters((v) => !v)}
              data-ocid="business.filter_toggle"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </Button>
          </div>

          {/* Level tabs */}
          <div
            className="flex gap-2 mt-4 overflow-x-auto pb-1"
            role="tablist"
            data-ocid="business.level_tabs"
          >
            {levels.map((level, i) => (
              <button
                key={level}
                type="button"
                role="tab"
                aria-selected={activeLevel === level}
                onClick={() => setActiveLevel(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap flex items-center gap-1.5 ${
                  activeLevel === level
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground border border-border hover:text-foreground"
                }`}
                data-ocid={`business.level_tab.${i + 1}`}
              >
                {level !== "All" && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeLevel === level
                        ? "bg-primary-foreground"
                        : LEVEL_META[level].dot
                    }`}
                  />
                )}
                {level}
              </button>
            ))}
          </div>

          {/* Level description */}
          {activeLevel !== "All" && (
            <p className="text-xs text-muted-foreground mt-2 pl-1">
              {LEVEL_META[activeLevel].description}
            </p>
          )}
        </div>

        <div className="flex gap-5">
          {/* Sidebar filters — desktop */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 260 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="hidden md:block flex-shrink-0 overflow-hidden"
                data-ocid="business.filter_sidebar"
              >
                <div className="bg-card border border-border rounded-2xl p-4 w-[260px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">
                        Filters
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowFilters(false)}
                      className="text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label="Close filters"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Budget slider */}
                  <div className="mb-5">
                    <Label className="text-xs font-semibold text-foreground mb-2 block">
                      Max Starting Budget
                    </Label>
                    <Slider
                      min={0}
                      max={2000000}
                      step={10000}
                      value={[budgetMax]}
                      onValueChange={([v]) => setBudgetMax(v)}
                      data-ocid="business.budget_slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹0</span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(budgetMax)}
                      </span>
                    </div>
                  </div>

                  {/* Earning min */}
                  <div className="mb-5">
                    <Label className="text-xs font-semibold text-foreground mb-2 block">
                      Min Monthly Earning
                    </Label>
                    <Slider
                      min={0}
                      max={500000}
                      step={5000}
                      value={[earningMin]}
                      onValueChange={([v]) => setEarningMin(v)}
                      data-ocid="business.earning_slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹0</span>
                      <span className="font-semibold text-foreground">
                        {formatCurrency(earningMin)}
                      </span>
                    </div>
                  </div>

                  {/* Risk checkboxes */}
                  <div>
                    <Label className="text-xs font-semibold text-foreground mb-2 block">
                      Risk Level
                    </Label>
                    <div className="flex flex-col gap-2">
                      {["Very Low", "Low", "Medium", "Medium-High", "High"].map(
                        (risk) => (
                          <div key={risk} className="flex items-center gap-2">
                            <Checkbox
                              id={`risk-${risk}`}
                              checked={riskFilters.includes(risk)}
                              onCheckedChange={() => toggleRisk(risk)}
                              data-ocid={`business.risk_filter.${risk.toLowerCase().replace(" ", "-")}`}
                            />
                            <label
                              htmlFor={`risk-${risk}`}
                              className="text-xs text-muted-foreground cursor-pointer"
                            >
                              {risk}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {(riskFilters.length > 0 ||
                    budgetMax < 2000000 ||
                    earningMin > 0) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 text-xs"
                      onClick={() => {
                        setRiskFilters([]);
                        setBudgetMax(2000000);
                        setEarningMin(0);
                      }}
                      data-ocid="business.clear_filters_button"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Cards grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter bar */}
            {showFilters && (
              <div
                className="md:hidden bg-card border border-border rounded-2xl p-4 mb-4"
                data-ocid="business.filter_mobile"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground">
                    Filters
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="text-muted-foreground"
                    aria-label="Close filters"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mb-4">
                  <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                    Max Budget: {formatCurrency(budgetMax)}
                  </Label>
                  <Slider
                    min={0}
                    max={2000000}
                    step={10000}
                    value={[budgetMax]}
                    onValueChange={([v]) => setBudgetMax(v)}
                    data-ocid="business.budget_slider_mobile"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1.5 block">
                    Risk Level
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {["Very Low", "Low", "Medium", "Medium-High", "High"].map(
                      (risk) => (
                        <button
                          key={risk}
                          type="button"
                          onClick={() => toggleRisk(risk)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-smooth ${
                            riskFilters.includes(risk)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted text-muted-foreground border-border"
                          }`}
                          data-ocid={`business.risk_chip.${risk.toLowerCase().replace(" ", "-")}`}
                        >
                          {risk}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {filteredIdeas.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 text-center"
                data-ocid="business.empty_state"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Briefcase className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  No ideas match your filters
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting the budget or risk filters
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRiskFilters([]);
                    setBudgetMax(2000000);
                    setEarningMin(0);
                  }}
                  data-ocid="business.reset_filters_button"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                {/* Count summary */}
                <p className="text-xs text-muted-foreground mb-4">
                  Showing{" "}
                  {Math.min(
                    filteredIdeas.length,
                    isPremium
                      ? filteredIdeas.length
                      : Math.min(filteredIdeas.length, FREE_IDEAS_LIMIT + 1),
                  )}{" "}
                  of {filteredIdeas.length} ideas
                  {!isPremium && filteredIdeas.length > FREE_IDEAS_LIMIT && (
                    <span className="text-accent font-semibold">
                      {" "}
                      · Upgrade for full access
                    </span>
                  )}
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {filteredIdeas.map((idea, i) => {
                      const isLocked = !isPremium && i >= FREE_IDEAS_LIMIT;
                      return isLocked ? null : (
                        <BusinessCard
                          key={idea.id}
                          idea={idea}
                          index={i}
                          isLocked={false}
                          isRecommended={isRecommended(idea)}
                          onViewPlan={() => setSelectedIdea(idea)}
                        />
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Premium lock for ideas beyond FREE_IDEAS_LIMIT */}
                {!isPremium && filteredIdeas.length > FREE_IDEAS_LIMIT && (
                  <div
                    className="mt-6"
                    data-ocid="business.premium_lock_section"
                  >
                    <FeatureLockOverlay
                      locked={true}
                      title="Unlock All Business Ideas"
                      description="View all business ideas with detailed step-by-step launch plans, tools, and marketing strategies. Upgrade to Premium."
                    >
                      {/* Blurred preview of remaining cards */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredIdeas
                          .slice(FREE_IDEAS_LIMIT, FREE_IDEAS_LIMIT + 3)
                          .map((idea) => (
                            <div
                              key={idea.id}
                              className="bg-card rounded-2xl border border-border p-5 flex flex-col gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-muted" />
                                <div className="flex-1 space-y-1.5">
                                  <div className="h-4 bg-muted rounded w-3/4" />
                                  <div className="h-3 bg-muted rounded w-1/2" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="h-12 bg-muted/60 rounded-lg" />
                                <div className="h-12 bg-muted/60 rounded-lg" />
                              </div>
                              <div className="flex gap-1">
                                <div className="h-5 bg-muted rounded-full w-16" />
                                <div className="h-5 bg-muted rounded-full w-14" />
                              </div>
                              <div className="h-8 bg-muted rounded-lg mt-auto" />
                            </div>
                          ))}
                      </div>
                    </FeatureLockOverlay>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <BusinessDetailModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
      />
    </Layout>
  );
}
