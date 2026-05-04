import { FeatureLockOverlay } from "@/components/FeatureLockOverlay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { useAppStore } from "@/store/appStore";
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  IndianRupee,
  Lightbulb,
  MapPin,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface CareerPath {
  id: string;
  title: string;
  icon: string;
  duration: string;
  durationYears: number;
  feesRange: string;
  skills: string[];
  jobOpportunities: string[];
  salaryRange: string;
  salaryGrowth: string;
  futureGrowth: string;
  whoShouldChoose: string;
  whatYouCanBecome: string[];
  suitableFor: string[];
  salaryPotential: number; // 1-5 for sorting
}

type TabKey = "after10th" | "after12th" | "afterGraduation";
type DurationFilter = "all" | "1yr" | "2yr" | "3yr" | "4yr+";

// ─── Static Career Data ───────────────────────────────────────────────────────
const after10thPaths: CareerPath[] = [
  {
    id: "science-stream",
    title: "Science Stream",
    icon: "🔬",
    duration: "2 years (Class 11–12)",
    durationYears: 2,
    feesRange: "₹5,000 – ₹40,000/year",
    skills: ["Analytical thinking", "Mathematics", "Research"],
    jobOpportunities: ["Engineering", "Medical", "Research", "Defense", "IT"],
    salaryRange: "₹3–8 LPA (entry level after further study)",
    salaryGrowth: "High — opens doors to top-paying fields",
    futureGrowth:
      "Science stream is the gateway to engineering, medical, and research careers with high income potential.",
    whoShouldChoose:
      "Students strong in Maths & Science who want engineering, medical, or research careers.",
    whatYouCanBecome: [
      "Engineer",
      "Doctor",
      "Scientist",
      "Pilot",
      "Data Analyst",
    ],
    suitableFor: ["students"],
    salaryPotential: 5,
  },
  {
    id: "commerce-stream",
    title: "Commerce Stream",
    icon: "📊",
    duration: "2 years (Class 11–12)",
    durationYears: 2,
    feesRange: "₹4,000 – ₹30,000/year",
    skills: ["Accounting", "Business math", "Economics"],
    jobOpportunities: ["Banking", "Finance", "CA", "Business", "Management"],
    salaryRange: "₹2.5–6 LPA (entry level after further study)",
    salaryGrowth: "Very good — finance and management careers pay well",
    futureGrowth:
      "Commerce is ideal for business, finance, and management roles with stable long-term growth.",
    whoShouldChoose:
      "Students interested in business, finance, accounting, or entrepreneurship.",
    whatYouCanBecome: [
      "CA",
      "BBA Graduate",
      "Financial Analyst",
      "Business Owner",
      "Banker",
    ],
    suitableFor: ["students"],
    salaryPotential: 4,
  },
  {
    id: "arts-stream",
    title: "Arts / Humanities Stream",
    icon: "🎨",
    duration: "2 years (Class 11–12)",
    durationYears: 2,
    feesRange: "₹3,000 – ₹20,000/year",
    skills: ["Creative thinking", "Communication", "Social awareness"],
    jobOpportunities: [
      "UPSC/Civil Services",
      "Journalism",
      "Law",
      "Social work",
      "Teaching",
    ],
    salaryRange: "₹2–5 LPA (entry level after further study)",
    salaryGrowth:
      "Moderate — government and civil service roles offer stability",
    futureGrowth:
      "Arts stream supports civil services, law, journalism, and creative industries.",
    whoShouldChoose:
      "Students interested in social sciences, creative fields, civil services, or law.",
    whatYouCanBecome: [
      "IAS/IPS Officer",
      "Lawyer",
      "Journalist",
      "Teacher",
      "Social Entrepreneur",
    ],
    suitableFor: ["students"],
    salaryPotential: 3,
  },
  {
    id: "iti-vocational",
    title: "ITI / Vocational Training",
    icon: "🔧",
    duration: "1–2 years",
    durationYears: 1,
    feesRange: "₹2,000 – ₹15,000/year",
    skills: ["Technical skills", "Hands-on work", "Problem solving"],
    jobOpportunities: [
      "Electrician",
      "Plumber",
      "Fitter",
      "Welder",
      "Mechanic",
    ],
    salaryRange: "₹1.5–4 LPA",
    salaryGrowth: "Steady — skilled trades are always in demand",
    futureGrowth:
      "ITI provides quick employment with government and private sector opportunities. Many ITI graduates start their own businesses.",
    whoShouldChoose:
      "Students who want quick employment, prefer hands-on work, or have financial constraints.",
    whatYouCanBecome: [
      "Electrician",
      "AC Technician",
      "Auto Mechanic",
      "Workshop Owner",
      "Industrial Supervisor",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 2,
  },
  {
    id: "diploma-courses",
    title: "Diploma Courses",
    icon: "📜",
    duration: "3 years",
    durationYears: 3,
    feesRange: "₹10,000 – ₹60,000/year",
    skills: ["Technical knowledge", "Practical application", "Industry skills"],
    jobOpportunities: [
      "Junior Engineer",
      "Technician",
      "Supervisor",
      "Quality Control",
    ],
    salaryRange: "₹2–5 LPA",
    salaryGrowth: "Good — lateral entry to B.Tech possible",
    futureGrowth:
      "Diploma holders can join industry directly or pursue lateral entry into engineering degree programs.",
    whoShouldChoose:
      "Students who want technical careers but prefer shorter, cost-effective programs.",
    whatYouCanBecome: [
      "Junior Engineer",
      "Technical Supervisor",
      "B.Tech Graduate (lateral entry)",
      "Entrepreneur",
    ],
    suitableFor: ["students"],
    salaryPotential: 3,
  },
  {
    id: "skill-certification",
    title: "Skill Certification Courses",
    icon: "🏅",
    duration: "3–12 months",
    durationYears: 1,
    feesRange: "₹500 – ₹20,000",
    skills: ["Digital literacy", "Soft skills", "Domain skills"],
    jobOpportunities: [
      "Freelancing",
      "Customer service",
      "Digital roles",
      "Small business",
    ],
    salaryRange: "₹1–3 LPA",
    salaryGrowth: "Depends on skill — digital skills have higher growth",
    futureGrowth:
      "Short skill courses from NSDC, Skill India, or online platforms provide quick employment in service sectors.",
    whoShouldChoose:
      "Students who need quick income, want to learn specific skills, or are exploring career options.",
    whatYouCanBecome: [
      "Freelancer",
      "Customer Support Executive",
      "Content Creator",
      "Digital Marketer (junior)",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 2,
  },
  {
    id: "govt-exam-prep",
    title: "Government Exam Preparation",
    icon: "🏛️",
    duration: "1–3 years prep",
    durationYears: 2,
    feesRange: "₹5,000 – ₹50,000 (coaching)",
    skills: [
      "Reasoning",
      "General knowledge",
      "English",
      "Quantitative aptitude",
    ],
    jobOpportunities: [
      "Railway",
      "Army",
      "Police",
      "Banking (clerk)",
      "State govt jobs",
    ],
    salaryRange: "₹2.5–6 LPA",
    salaryGrowth: "Stable — government jobs offer security and perks",
    futureGrowth:
      "Government jobs offer lifetime job security, pension, and social status. Railway, defence, and police exams are accessible after 10th.",
    whoShouldChoose:
      "Students who want job security, government benefits, and a stable career path.",
    whatYouCanBecome: [
      "Railway Staff",
      "Army Soldier",
      "Police Constable",
      "Bank Clerk",
      "Peon/Multi-Tasking Staff",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3,
  },
  {
    id: "entrepreneurship-10th",
    title: "Entrepreneurship Track",
    icon: "🚀",
    duration: "Self-paced",
    durationYears: 1,
    feesRange: "₹0 – ₹10,000 (courses)",
    skills: ["Business mindset", "Sales", "Problem solving", "Networking"],
    jobOpportunities: [
      "Small business",
      "Freelancing",
      "Reselling",
      "Service business",
    ],
    salaryRange: "₹0.5–5 LPA (depends on business)",
    salaryGrowth: "Variable — high upside with the right idea",
    futureGrowth:
      "Starting small businesses early builds experience. Many successful entrepreneurs started young with service-based businesses.",
    whoShouldChoose:
      "Students with business mindset, creativity, and willingness to take calculated risks.",
    whatYouCanBecome: [
      "Business Owner",
      "Franchise Owner",
      "Freelancer",
      "Social Entrepreneur",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 4,
  },
];

const after12thPaths: CareerPath[] = [
  {
    id: "engineering-btech",
    title: "Engineering (B.Tech)",
    icon: "⚙️",
    duration: "4 years",
    durationYears: 4,
    feesRange: "₹80,000 – ₹3,00,000/year",
    skills: [
      "Mathematics",
      "Programming",
      "Problem solving",
      "Technical analysis",
    ],
    jobOpportunities: [
      "Software Engineer",
      "Hardware Engineer",
      "Product Manager",
      "Data Analyst",
      "Consultant",
    ],
    salaryRange: "₹3–20 LPA (entry to mid-level)",
    salaryGrowth: "Very high — top engineers earn ₹30–80 LPA",
    futureGrowth:
      "Engineering is one of the highest-paying careers in India. IT, core, and emerging tech fields offer tremendous growth.",
    whoShouldChoose:
      "Students who are strong in Maths & Physics and want high-paying technical careers.",
    whatYouCanBecome: [
      "Software Developer",
      "Systems Architect",
      "CTO",
      "Product Manager",
      "Tech Entrepreneur",
    ],
    suitableFor: ["students"],
    salaryPotential: 5,
  },
  {
    id: "medical-mbbs",
    title: "Medical / MBBS",
    icon: "🩺",
    duration: "5.5 years (including internship)",
    durationYears: 4,
    feesRange: "₹50,000 – ₹15,00,000/year",
    skills: ["Biology", "Chemistry", "Empathy", "Attention to detail"],
    jobOpportunities: [
      "Doctor",
      "Surgeon",
      "Hospital Admin",
      "Research",
      "Public Health",
    ],
    salaryRange: "₹6–25 LPA (after completion)",
    salaryGrowth: "High — specialist doctors earn ₹40–100+ LPA",
    futureGrowth:
      "Medicine is one of the most respected and high-earning professions globally. Specialization increases income exponentially.",
    whoShouldChoose:
      "Students with strong Biology, Chemistry, dedication, and genuine interest in serving patients.",
    whatYouCanBecome: [
      "General Physician",
      "Surgeon",
      "Cardiologist",
      "Dermatologist",
      "Hospital Owner",
    ],
    suitableFor: ["students"],
    salaryPotential: 5,
  },
  {
    id: "bcom-accounting",
    title: "B.Com / Accounting",
    icon: "📒",
    duration: "3 years",
    durationYears: 3,
    feesRange: "₹10,000 – ₹80,000/year",
    skills: ["Accounting", "Taxation", "Financial reporting", "Tally/Excel"],
    jobOpportunities: [
      "Accountant",
      "Finance Manager",
      "Tax Consultant",
      "Banking",
      "CA Article Clerk",
    ],
    salaryRange: "₹2–6 LPA (entry level)",
    salaryGrowth: "Good — CA/CMA adds significant income potential",
    futureGrowth:
      "B.Com is affordable and opens doors to finance, banking, and CA careers. Every business needs accountants.",
    whoShouldChoose:
      "Commerce stream students interested in finance, accounting, and business operations.",
    whatYouCanBecome: [
      "Accountant",
      "Tax Consultant",
      "Finance Manager",
      "CA",
      "CFO",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3,
  },
  {
    id: "bba-management",
    title: "BBA / Management",
    icon: "💼",
    duration: "3 years",
    durationYears: 3,
    feesRange: "₹30,000 – ₹2,00,000/year",
    skills: ["Leadership", "Marketing", "Business strategy", "Communication"],
    jobOpportunities: [
      "Marketing Executive",
      "Business Analyst",
      "Sales Manager",
      "HR",
      "Consultant",
    ],
    salaryRange: "₹2.5–7 LPA (entry level)",
    salaryGrowth: "High — MBA after BBA can lead to ₹15–30 LPA",
    futureGrowth:
      "BBA + MBA combination is powerful for corporate and business careers. Great foundation for entrepreneurship.",
    whoShouldChoose:
      "Students interested in business, management, and corporate careers. Good for future entrepreneurs.",
    whatYouCanBecome: [
      "Business Manager",
      "Marketing Head",
      "Startup Founder",
      "MBA Graduate",
      "Consultant",
    ],
    suitableFor: ["students"],
    salaryPotential: 4,
  },
  {
    id: "bca-it",
    title: "BCA / IT",
    icon: "💻",
    duration: "3 years",
    durationYears: 3,
    feesRange: "₹20,000 – ₹1,50,000/year",
    skills: ["Programming", "Database", "Web development", "Problem solving"],
    jobOpportunities: [
      "Software Developer",
      "Web Developer",
      "Database Admin",
      "IT Support",
      "Testing",
    ],
    salaryRange: "₹2.5–8 LPA (entry level)",
    salaryGrowth: "Very high — IT skills are globally in demand",
    futureGrowth:
      "BCA is a cost-effective IT degree. With additional skills and MCA, graduates can earn comparable to B.Tech.",
    whoShouldChoose:
      "Students who want IT careers but didn't take Science in 12th, or want an affordable tech degree.",
    whatYouCanBecome: [
      "Software Developer",
      "App Developer",
      "Web Designer",
      "System Analyst",
      "IT Entrepreneur",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 4,
  },
  {
    id: "hotel-management",
    title: "Hotel Management",
    icon: "🏨",
    duration: "3–4 years",
    durationYears: 3,
    feesRange: "₹50,000 – ₹2,00,000/year",
    skills: [
      "Hospitality",
      "Communication",
      "Customer service",
      "Culinary arts",
    ],
    jobOpportunities: [
      "Hotel Operations",
      "F&B Manager",
      "Travel Agency",
      "Airline crew",
      "Event Management",
    ],
    salaryRange: "₹2.5–8 LPA (India), higher abroad",
    salaryGrowth:
      "Good — international opportunities significantly increase pay",
    futureGrowth:
      "Hotel management offers global career opportunities. India's tourism sector is growing rapidly, creating demand.",
    whoShouldChoose:
      "Students who enjoy working with people, travelling, and the hospitality industry.",
    whatYouCanBecome: [
      "Hotel Manager",
      "Chef",
      "Airline Crew",
      "Resort Owner",
      "Event Planner",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: "📱",
    duration: "6 months – 1 year (certification)",
    durationYears: 1,
    feesRange: "₹15,000 – ₹80,000",
    skills: ["SEO", "Social media", "Content creation", "Analytics"],
    jobOpportunities: [
      "Digital Marketer",
      "Content Creator",
      "SEO Specialist",
      "Social Media Manager",
      "Freelancer",
    ],
    salaryRange: "₹2–8 LPA (experience-based)",
    salaryGrowth: "High — skilled digital marketers are highly sought after",
    futureGrowth:
      "Digital marketing is one of the fastest-growing fields. Every business needs online presence, creating massive job demand.",
    whoShouldChoose:
      "Creative students who understand social media, want flexible work, or wish to freelance.",
    whatYouCanBecome: [
      "Digital Marketing Manager",
      "Content Strategist",
      "Agency Owner",
      "YouTube Creator",
      "Freelancer",
    ],
    suitableFor: ["students", "freshers", "career-changers"],
    salaryPotential: 4,
  },
  {
    id: "aviation",
    title: "Aviation",
    icon: "✈️",
    duration: "2–4 years",
    durationYears: 3,
    feesRange: "₹80,000 – ₹15,00,000 (pilot training)",
    skills: [
      "English proficiency",
      "Customer service",
      "Technical knowledge",
      "Presence of mind",
    ],
    jobOpportunities: [
      "Pilot",
      "Cabin Crew",
      "Ground Staff",
      "ATC",
      "Airport Operations",
    ],
    salaryRange: "₹3–15 LPA (cabin crew), ₹15–50 LPA (pilots)",
    salaryGrowth: "High for pilots, moderate for cabin crew",
    futureGrowth:
      "India's aviation sector is one of the fastest-growing globally. Demand for trained aviation professionals is rising.",
    whoShouldChoose:
      "Students who meet physical requirements, have good English, and want travel-based careers.",
    whatYouCanBecome: [
      "Commercial Pilot",
      "Cabin Crew",
      "Airport Manager",
      "Air Traffic Controller",
    ],
    suitableFor: ["students"],
    salaryPotential: 4,
  },
  {
    id: "nursing-paramedical",
    title: "Nursing / Paramedical",
    icon: "🏥",
    duration: "3–4 years",
    durationYears: 3,
    feesRange: "₹20,000 – ₹1,00,000/year",
    skills: [
      "Patient care",
      "Medical knowledge",
      "Empathy",
      "Attention to detail",
    ],
    jobOpportunities: [
      "Staff Nurse",
      "Paramedic",
      "Lab Technician",
      "Physiotherapist",
      "Radiology Tech",
    ],
    salaryRange: "₹2–6 LPA (India), much higher abroad",
    salaryGrowth: "High for international opportunities",
    futureGrowth:
      "Healthcare is always in demand. Nursing has strong overseas career prospects in USA, UK, and Gulf countries.",
    whoShouldChoose:
      "Students interested in healthcare, patient care, and those considering international career opportunities.",
    whatYouCanBecome: [
      "Registered Nurse",
      "Head Nurse",
      "Hospital Administrator",
      "Healthcare Entrepreneur",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3,
  },
  {
    id: "govt-exams-12th",
    title: "Government Exams (UPSC/SSC)",
    icon: "🏛️",
    duration: "2–5 years prep",
    durationYears: 3,
    feesRange: "₹10,000 – ₹1,50,000 (coaching)",
    skills: [
      "General knowledge",
      "Current affairs",
      "Analytical reasoning",
      "Essay writing",
    ],
    jobOpportunities: ["IAS", "IPS", "SSC CGL", "Banking", "State PSC"],
    salaryRange: "₹4–12 LPA + perks",
    salaryGrowth:
      "Stable — senior officials earn significantly higher with perks",
    futureGrowth:
      "Government services offer unmatched job security, social status, and perks. IAS/IPS officers have nationwide impact.",
    whoShouldChoose:
      "Students with discipline, strong reading habits, and interest in public service.",
    whatYouCanBecome: [
      "IAS Officer",
      "IPS Officer",
      "Bank Manager",
      "Tax Inspector",
      "SSC Officer",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3,
  },
  {
    id: "skill-based-careers",
    title: "Skill-Based Careers",
    icon: "🎯",
    duration: "6 months – 2 years",
    durationYears: 1,
    feesRange: "₹5,000 – ₹50,000",
    skills: [
      "Specific technical skill",
      "Portfolio building",
      "Self-marketing",
    ],
    jobOpportunities: [
      "Graphic Designer",
      "Video Editor",
      "Photographer",
      "Web Designer",
      "App Developer",
    ],
    salaryRange: "₹1.5–10 LPA (skill-dependent)",
    salaryGrowth:
      "High for in-demand skills like design, coding, video editing",
    futureGrowth:
      "Skill-based careers offer flexibility and growing income. Freelancing and remote work options are abundant.",
    whoShouldChoose:
      "Creative, self-driven students who prefer hands-on learning over traditional degrees.",
    whatYouCanBecome: [
      "Graphic Designer",
      "UI/UX Designer",
      "Video Creator",
      "Freelancer",
      "Creative Agency Owner",
    ],
    suitableFor: ["students", "freshers", "career-changers"],
    salaryPotential: 3,
  },
];

const afterGraduationPaths: CareerPath[] = [
  {
    id: "mba-masters",
    title: "MBA / Masters",
    icon: "🎓",
    duration: "2 years",
    durationYears: 2,
    feesRange: "₹1,50,000 – ₹20,00,000/year",
    skills: [
      "Leadership",
      "Strategic thinking",
      "Business analytics",
      "Communication",
    ],
    jobOpportunities: [
      "Management Consultant",
      "Product Manager",
      "Finance Manager",
      "Marketing Director",
      "Startup Founder",
    ],
    salaryRange: "₹8–30 LPA (IIM graduates ₹25–80 LPA)",
    salaryGrowth: "Very high — IIM/top MBA is a career accelerator",
    futureGrowth:
      "MBA from a reputed institute can multiply salary 3-5x. Opens doors to leadership and C-suite roles.",
    whoShouldChoose:
      "Graduates who want corporate leadership roles, career switches, or to scale a business.",
    whatYouCanBecome: [
      "CEO/COO",
      "Management Consultant",
      "Investment Banker",
      "Startup Founder",
      "Business Head",
    ],
    suitableFor: ["freshers", "workers"],
    salaryPotential: 5,
  },
  {
    id: "law-llb",
    title: "Law (LLB)",
    icon: "⚖️",
    duration: "3 years (LLB) or 5 years (BA LLB)",
    durationYears: 3,
    feesRange: "₹20,000 – ₹3,00,000/year",
    skills: [
      "Legal reasoning",
      "Research",
      "Articulation",
      "Critical thinking",
    ],
    jobOpportunities: [
      "Advocate",
      "Corporate Lawyer",
      "Legal Advisor",
      "Judiciary",
      "Government Law",
    ],
    salaryRange: "₹3–20 LPA (experience-dependent)",
    salaryGrowth: "High for corporate and specialization areas",
    futureGrowth:
      "Law is a respected profession with diverse practice areas. Corporate lawyers and specialized attorneys earn very well.",
    whoShouldChoose:
      "Graduates with strong reasoning, writing skills, and interest in justice, business law, or civil services.",
    whatYouCanBecome: [
      "Senior Advocate",
      "Corporate Counsel",
      "Judge",
      "Legal Entrepreneur",
      "Policy Expert",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 4,
  },
  {
    id: "ca-cma",
    title: "CA / CMA",
    icon: "🧮",
    duration: "3–5 years (after B.Com/12th)",
    durationYears: 4,
    feesRange: "₹30,000 – ₹1,00,000 (ICAI fees)",
    skills: ["Accounting", "Taxation", "Auditing", "Financial analysis"],
    jobOpportunities: [
      "Chartered Accountant",
      "Tax Consultant",
      "CFO",
      "Auditor",
      "Financial Advisor",
    ],
    salaryRange: "₹6–25 LPA (Big 4 firms can pay more)",
    salaryGrowth: "Very high — senior CAs earn ₹30–80 LPA",
    futureGrowth:
      "CA is one of the highest-paying professional qualifications in India. Demand is consistent across all sectors.",
    whoShouldChoose:
      "Committed graduates who are strong in finance, can handle rigorous study, and want professional qualification.",
    whatYouCanBecome: [
      "Chartered Accountant",
      "Tax Partner",
      "CFO",
      "Finance Director",
      "CA Firm Owner",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 5,
  },
  {
    id: "government-services",
    title: "Government Services",
    icon: "🏛️",
    duration: "2–4 years prep",
    durationYears: 3,
    feesRange: "₹20,000 – ₹2,00,000 (coaching)",
    skills: [
      "Current affairs",
      "Administrative ability",
      "Ethics",
      "Decision making",
    ],
    jobOpportunities: ["IAS", "IPS", "IRS", "UPSC Civil Services", "State PSC"],
    salaryRange: "₹7–15 LPA + perks (IAS in-hand)",
    salaryGrowth: "Stable — career progression is structured and assured",
    futureGrowth:
      "Civil services offer power, prestige, and opportunity to drive national change. Post-retirement options are also strong.",
    whoShouldChoose:
      "Graduates with public service mindset, discipline, and ability to handle high-pressure examination.",
    whatYouCanBecome: [
      "IAS Officer",
      "IPS Officer",
      "Collector",
      "Commissioner",
      "District Magistrate",
    ],
    suitableFor: ["students", "freshers"],
    salaryPotential: 3,
  },
  {
    id: "it-software",
    title: "IT / Software",
    icon: "💻",
    duration: "Immediate + skill building",
    durationYears: 1,
    feesRange: "₹10,000 – ₹1,00,000 (bootcamps/courses)",
    skills: ["Programming", "System design", "Cloud", "Agile"],
    jobOpportunities: [
      "Software Engineer",
      "DevOps",
      "Cloud Architect",
      "Security Analyst",
      "Tech Lead",
    ],
    salaryRange: "₹5–25 LPA (India), ₹50–150 LPA (USA)",
    salaryGrowth: "Very high — especially in product companies",
    futureGrowth:
      "IT is the highest-paying career sector. Remote work opportunities allow earning global salaries from India.",
    whoShouldChoose:
      "Tech graduates who want high salaries, remote work, and international career opportunities.",
    whatYouCanBecome: [
      "Senior Engineer",
      "Principal Architect",
      "Engineering Manager",
      "CTO",
      "Tech Entrepreneur",
    ],
    suitableFor: ["students", "freshers", "workers"],
    salaryPotential: 5,
  },
  {
    id: "data-science-ai",
    title: "Data Science / AI",
    icon: "🤖",
    duration: "6 months – 1 year (additional)",
    durationYears: 1,
    feesRange: "₹20,000 – ₹2,00,000 (courses)",
    skills: ["Python", "Statistics", "Machine learning", "Data visualization"],
    jobOpportunities: [
      "Data Scientist",
      "ML Engineer",
      "AI Researcher",
      "Business Analyst",
      "Quant Analyst",
    ],
    salaryRange: "₹8–40 LPA (India), higher abroad",
    salaryGrowth: "Extremely high — AI skills are the most in-demand globally",
    futureGrowth:
      "AI and data science are transforming every industry. This is the fastest-growing and highest-paying field globally.",
    whoShouldChoose:
      "Tech/math graduates who enjoy analysis, want cutting-edge careers, and have strong coding interest.",
    whatYouCanBecome: [
      "Data Scientist",
      "AI Engineer",
      "Research Scientist",
      "AI Startup Founder",
      "Consultant",
    ],
    suitableFor: ["students", "freshers", "workers"],
    salaryPotential: 5,
  },
  {
    id: "entrepreneurship-grad",
    title: "Entrepreneurship",
    icon: "🚀",
    duration: "Self-paced",
    durationYears: 1,
    feesRange: "Depends on business (₹0 – ₹5 lakh)",
    skills: ["Business development", "Sales", "Operations", "Leadership"],
    jobOpportunities: [
      "Startup Founder",
      "Franchise Owner",
      "E-commerce",
      "Service Business",
      "Consulting",
    ],
    salaryRange: "Variable — ₹0 in early stage to unlimited",
    salaryGrowth: "Unlimited potential with the right idea and execution",
    futureGrowth:
      "Entrepreneurship is the path to financial independence. Most successful businesses start small and scale.",
    whoShouldChoose:
      "Graduates with ideas, risk appetite, and willingness to put in effort for 2-3 years without guaranteed income.",
    whatYouCanBecome: [
      "CEO/Founder",
      "Franchise Network Owner",
      "Export Business Owner",
      "Tech Startup Founder",
    ],
    suitableFor: ["freshers", "workers"],
    salaryPotential: 5,
  },
  {
    id: "freelancing-consulting",
    title: "Freelancing / Consulting",
    icon: "🌐",
    duration: "3–12 months to build client base",
    durationYears: 1,
    feesRange: "₹5,000 – ₹50,000 (skill courses)",
    skills: [
      "Domain expertise",
      "Client management",
      "Self-marketing",
      "Project management",
    ],
    jobOpportunities: [
      "Independent Consultant",
      "Remote Freelancer",
      "Agency Owner",
      "Online Trainer",
      "Coach",
    ],
    salaryRange: "₹2–30 LPA (skill and client base dependent)",
    salaryGrowth: "High — international clients pay significantly more",
    futureGrowth:
      "Freelancing offers freedom, flexibility, and global income. With the right skills, earning ₹1–3 lakh/month is achievable.",
    whoShouldChoose:
      "Graduates with specialized skills, entrepreneurial spirit, and preference for flexible work arrangements.",
    whatYouCanBecome: [
      "Independent Consultant",
      "Agency Founder",
      "Online Coach",
      "Remote Professional",
    ],
    suitableFor: ["freshers", "workers", "career-changers"],
    salaryPotential: 4,
  },
];

const tabData: Record<TabKey, CareerPath[]> = {
  after10th: after10thPaths,
  after12th: after12thPaths,
  afterGraduation: afterGraduationPaths,
};

const TAB_LABELS: { key: TabKey; label: string }[] = [
  { key: "after10th", label: "After 10th" },
  { key: "after12th", label: "After 12th" },
  { key: "afterGraduation", label: "After Graduation" },
];

const DURATION_FILTER_OPTIONS: { value: DurationFilter; label: string }[] = [
  { value: "all", label: "All Durations" },
  { value: "1yr", label: "Up to 1 Year" },
  { value: "2yr", label: "2 Years" },
  { value: "3yr", label: "3 Years" },
  { value: "4yr+", label: "4+ Years" },
];

const ROADMAP_SUGGESTIONS: Record<
  string,
  { stream: string; why: string; outcomes: string[] }
> = {
  science: {
    stream: "Science → Engineering / Medical",
    why: "Your analytical profile and tech interest align with science-based careers.",
    outcomes: [
      "High starting salary (₹4–12 LPA)",
      "Global job opportunities",
      "Path to ₹25+ LPA in 5 years",
    ],
  },
  commerce: {
    stream: "Commerce → CA / MBA / Finance",
    why: "Your goal of financial stability aligns with commerce and finance career paths.",
    outcomes: [
      "Stable career with growth",
      "CA earning ₹8–25 LPA",
      "Respected professional qualification",
    ],
  },
  arts: {
    stream: "Arts → Civil Services / Law / Media",
    why: "Your interest in public service and communication makes arts stream ideal.",
    outcomes: [
      "Government job security",
      "Social impact career",
      "Diverse industry options",
    ],
  },
  default: {
    stream: "Skill-First → Digital Career",
    why: "Based on your profile, building marketable skills is the fastest path to income growth.",
    outcomes: [
      "Start earning in 6–12 months",
      "Freelance or job ready",
      "Path to ₹5–15 LPA with experience",
    ],
  },
};

// ─── Career Card Component ────────────────────────────────────────────────────
function CareerCard({
  career,
  index,
  onViewDetails,
}: {
  career: CareerPath;
  index: number;
  onViewDetails: (c: CareerPath) => void;
}) {
  return (
    <Card
      className="card-elevated hover:card-premium transition-smooth group border-border bg-card h-full"
      data-ocid={`career.card.${index}`}
    >
      <CardContent className="p-5 flex flex-col gap-4 h-full">
        <div className="flex items-start gap-3">
          <span
            className="text-3xl leading-none flex-shrink-0"
            role="img"
            aria-label={career.title}
          >
            {career.icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground leading-tight text-sm">
              {career.title}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs truncate">{career.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-primary font-medium">
          <IndianRupee className="w-3 h-3" />
          <span>{career.feesRange}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {career.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs px-2 py-0.5"
            >
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-auto pt-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth text-xs"
            onClick={() => onViewDetails(career)}
            data-ocid={`career.view_details_button.${index}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Career Detail Drawer ─────────────────────────────────────────────────────
function CareerDetailDrawer({
  career,
  isPremium,
  onClose,
}: {
  career: CareerPath | null;
  isPremium: boolean;
  onClose: () => void;
}) {
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);

  if (!career) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      data-ocid="career.detail_drawer"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close dialog"
      />
      <div className="relative z-10 w-full sm:max-w-2xl max-h-[90vh] bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b border-border">
          <span className="text-4xl" role="img" aria-label={career.title}>
            {career.icon}
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-foreground text-lg leading-tight">
              {career.title}
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Duration: {career.duration}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1.5 hover:bg-muted transition-colors"
            aria-label="Close"
            data-ocid="career.detail.close_button"
            type="button"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-5">
            {/* Fees */}
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Estimated Fees Range
              </h4>
              <p className="text-foreground font-medium">{career.feesRange}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                *Fees vary by institution and location
              </p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Skills Needed
              </h4>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Job Opportunities */}
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Suggested Job Opportunities
              </h4>
              <ul className="space-y-1.5">
                {career.jobOpportunities.map((job) => (
                  <li key={job} className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{job}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Salary — Premium Lock */}
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Expected Salary Range
              </h4>
              <FeatureLockOverlay
                locked={!isPremium}
                title="Salary & Growth Data"
                description="Upgrade to Premium to unlock salary ranges, growth projections, and detailed career data."
              >
                <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {career.salaryRange}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        *Estimated range based on market data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {career.salaryGrowth}
                    </p>
                  </div>
                </div>
              </FeatureLockOverlay>
            </div>

            {/* Future Growth — Premium Lock */}
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Future Growth Potential
              </h4>
              <FeatureLockOverlay
                locked={!isPremium}
                title="Growth Analysis"
                description="Unlock detailed growth analysis with Premium."
              >
                <p className="text-sm text-foreground leading-relaxed p-3 bg-muted/30 rounded-lg">
                  {career.futureGrowth}
                </p>
              </FeatureLockOverlay>
            </div>

            {/* Who Should Choose */}
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Who May Benefit From This Path
              </h4>
              <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <Users className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">
                  {career.whoShouldChoose}
                </p>
              </div>
            </div>

            {/* What You Can Become */}
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Possible Roles After Completion
              </h4>
              <div className="flex flex-wrap gap-2">
                {career.whatYouCanBecome.map((role) => (
                  <Badge
                    key={role}
                    className="bg-accent/10 text-accent-foreground border-accent/30 text-xs"
                  >
                    <Star className="w-2.5 h-2.5 mr-1" />
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            {!isPremium && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-display font-semibold text-foreground">
                  Get Full Career Report
                </p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Premium includes salary data, growth projections, personalized
                  roadmap, and PDF report.
                </p>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={openPremiumModal}
                  data-ocid="career.detail.upgrade_button"
                >
                  Upgrade to Premium
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// ─── Education Roadmap Section ────────────────────────────────────────────────
function EducationRoadmap({
  profile,
  isPremium,
}: {
  profile: { educationLevel?: string; careerInterest?: string } | null;
  isPremium: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);

  const suggestion = useMemo(() => {
    if (!profile) return ROADMAP_SUGGESTIONS.default;
    const level = (profile.educationLevel || "").toLowerCase();
    const interest = (profile.careerInterest || "").toLowerCase();
    if (
      interest.includes("tech") ||
      interest.includes("engineer") ||
      interest.includes("science")
    )
      return ROADMAP_SUGGESTIONS.science;
    if (
      interest.includes("business") ||
      interest.includes("finance") ||
      level.includes("commerce")
    )
      return ROADMAP_SUGGESTIONS.commerce;
    if (
      interest.includes("civil") ||
      interest.includes("law") ||
      interest.includes("arts")
    )
      return ROADMAP_SUGGESTIONS.arts;
    return ROADMAP_SUGGESTIONS.default;
  }, [profile]);

  return (
    <div
      className="rounded-2xl border border-border bg-card overflow-hidden mb-6 card-elevated"
      data-ocid="career.roadmap_section"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors text-left"
        onClick={() => setExpanded((v) => !v)}
        data-ocid="career.roadmap.toggle"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-sm">
              Education Roadmap
            </p>
            <p className="text-xs text-muted-foreground">
              Suggested path based on your profile
            </p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <FeatureLockOverlay
          locked={!isPremium}
          title="Personalized Roadmap"
          description="Upgrade to Premium for your personalized education roadmap based on your profile."
        >
          <div className="px-5 pb-5 grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-display font-semibold text-primary text-sm mb-1">
                Recommended Stream
              </h4>
              <p className="text-foreground font-medium text-sm">
                {suggestion.stream}
              </p>
            </div>
            <div className="sm:col-span-1 p-4 rounded-xl bg-muted/40">
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Why This Path
              </h4>
              <p className="text-foreground text-sm">{suggestion.why}</p>
            </div>
            <div className="sm:col-span-1 p-4 rounded-xl bg-accent/5 border border-accent/20">
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Expected Outcomes
              </h4>
              <ul className="space-y-1.5">
                {suggestion.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-0.5">✦</span>
                    <span className="text-foreground">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {!isPremium && (
            <div className="px-5 pb-5 text-center">
              <Button
                type="button"
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={openPremiumModal}
                data-ocid="career.roadmap.upgrade_button"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Unlock Full Personalized Roadmap
              </Button>
            </div>
          )}
        </FeatureLockOverlay>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Career() {
  const { data: profile } = useProfile();
  const [activeTab, setActiveTab] = useState<TabKey>("after10th");
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [search, setSearch] = useState("");
  const [durationFilter, setDurationFilter] = useState<DurationFilter>("all");
  const [sortBySalary, setSortBySalary] = useState(false);

  const { data: sub } = useSubscription();
  const isPremium = sub?.status === "active";

  const profileData = profile
    ? {
        educationLevel: profile.educationLevel,
        careerInterest: profile.careerInterest,
      }
    : null;

  const filteredCareers = useMemo(() => {
    let list = tabData[activeTab];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }

    if (durationFilter !== "all") {
      list = list.filter((c) => {
        if (durationFilter === "1yr") return c.durationYears <= 1;
        if (durationFilter === "2yr") return c.durationYears === 2;
        if (durationFilter === "3yr") return c.durationYears === 3;
        if (durationFilter === "4yr+") return c.durationYears >= 4;
        return true;
      });
    }

    if (sortBySalary) {
      list = [...list].sort((a, b) => b.salaryPotential - a.salaryPotential);
    }

    return list;
  }, [activeTab, search, durationFilter, sortBySalary]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Career Guidance
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Find the right path based on your education and goals
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            className="flex gap-1 mt-6 border-b border-border -mb-px"
            role="tablist"
            data-ocid="career.tabs"
          >
            {TAB_LABELS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={activeTab === key}
                onClick={() => {
                  setActiveTab(key);
                  setSearch("");
                  setDurationFilter("all");
                  setSortBySalary(false);
                }}
                className={`px-4 py-2.5 text-sm font-medium font-display transition-colors relative whitespace-nowrap ${
                  activeTab === key
                    ? "text-primary border-b-2 border-primary -mb-px"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`career.tab.${key}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Education Roadmap */}
        <EducationRoadmap profile={profileData} isPremium={isPremium} />

        {/* Filter Bar */}
        <div
          className="bg-card rounded-2xl border border-border p-4 mb-6 flex flex-col sm:flex-row gap-3"
          data-ocid="career.filter_bar"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search careers or skills…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
              data-ocid="career.search_input"
            />
          </div>

          {/* Duration Filter */}
          <div className="flex gap-1 flex-wrap">
            {DURATION_FILTER_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setDurationFilter(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${
                  durationFilter === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`career.duration_filter.${value}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <button
            type="button"
            onClick={() => setSortBySalary((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth whitespace-nowrap ${
              sortBySalary
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="career.sort_salary_toggle"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Sort by Salary
          </button>
        </div>

        {/* Career Grid */}
        {filteredCareers.length > 0 ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="career.cards_list"
          >
            {filteredCareers.map((career, index) => (
              <CareerCard
                key={career.id}
                career={career}
                index={index + 1}
                onViewDetails={setSelectedCareer}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="career.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground">
              No careers found
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Try adjusting your search or filters.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearch("");
                setDurationFilter("all");
                setSortBySalary(false);
              }}
              data-ocid="career.empty_state.reset_button"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Premium CTA Banner */}
        {!isPremium && (
          <div className="mt-10 rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Premium Career Guidance
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  Get Your Full Career Roadmap
                </h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Unlock salary data, personalized education roadmap, PDF career
                  report, and detailed 10-year career planning — based on your
                  profile.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
                  data-ocid="career.premium_cta.upgrade_button"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Premium — ₹99/month
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Cancel anytime
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Career Detail Drawer */}
      <CareerDetailDrawer
        career={selectedCareer}
        isPremium={isPremium}
        onClose={() => setSelectedCareer(null)}
      />
    </div>
  );
}
