import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GoalType, RiskLevel, UserProfile } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  CheckCircle2,
  Loader2,
  LogIn,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// --- Types ---

interface FormData {
  name: string;
  age: number;
  gender?: string;
  city: string;
  educationLevel: string;
  currentStatus: string;
  monthlyIncome: bigint;
  monthlyExpenses: bigint;
  currentSavings: bigint;
  debtAmount: bigint;
  familyResponsibility: string;
  careerInterest: string;
  skills: string;
  businessInterest: string;
  riskLevel: RiskLevel;
  goal: GoalType;
}

type FieldError = Partial<Record<keyof FormData, string>>;

// --- Constants ---

const STEPS = [
  {
    label: "Personal Info",
    subheading: "Tell us about yourself",
    description: "Your background helps us personalise your plan",
  },
  {
    label: "Financial Info",
    subheading: "Your financial snapshot",
    description: "Honest numbers lead to the best advice",
  },
  {
    label: "Goals & Interests",
    subheading: "Your goals and dreams",
    description: "What matters most to you in the next 10 years?",
  },
];

const SKILL_OPTIONS = [
  "Communication",
  "Programming",
  "Sales",
  "Teaching",
  "Management",
  "Design",
  "Writing",
  "Other",
];

const RISK_OPTIONS: {
  value: RiskLevel;
  label: string;
  desc: string;
  icon: string;
}[] = [
  {
    value: "low",
    label: "Low Risk",
    desc: "I prefer safety and stability",
    icon: "🛡️",
  },
  {
    value: "medium",
    label: "Balanced",
    desc: "I can handle moderate risk",
    icon: "⚖️",
  },
  {
    value: "high",
    label: "High Risk",
    desc: "I'm ready for bold moves",
    icon: "🚀",
  },
];

const GOAL_OPTIONS: {
  value: GoalType;
  label: string;
  desc: string;
  icon: string;
}[] = [
  {
    value: "save",
    label: "Save Money",
    desc: "Build savings & cut expenses",
    icon: "💰",
  },
  {
    value: "business",
    label: "Start Business",
    desc: "Launch my own venture",
    icon: "🏢",
  },
  {
    value: "career",
    label: "Career Growth",
    desc: "Find the right career path",
    icon: "📈",
  },
  {
    value: "education",
    label: "Education Plan",
    desc: "Chart my learning journey",
    icon: "🎓",
  },
  {
    value: "income",
    label: "Grow Income",
    desc: "Increase earning potential",
    icon: "📹",
  },
];

const DEFAULT_FORM: FormData = {
  name: "",
  age: 22,
  gender: undefined,
  city: "",
  educationLevel: "",
  currentStatus: "",
  monthlyIncome: BigInt(0),
  monthlyExpenses: BigInt(0),
  currentSavings: BigInt(0),
  debtAmount: BigInt(0),
  familyResponsibility: "none",
  careerInterest: "",
  skills: "",
  businessInterest: "",
  riskLevel: "medium",
  goal: "save",
};

// --- Helpers ---

function validateStep(step: number, form: FormData): FieldError {
  const errors: FieldError = {};
  if (step === 0) {
    if (!form.name.trim()) errors.name = "Name is required";
    if (form.age < 10 || form.age > 80)
      errors.age = "Enter a valid age (10–80)";
    if (!form.city.trim()) errors.city = "City / Country is required";
    if (!form.educationLevel)
      errors.educationLevel = "Please select your education level";
    if (!form.currentStatus.trim())
      errors.currentStatus = "Please describe your current status";
  }
  if (step === 1) {
    if (!form.familyResponsibility)
      errors.familyResponsibility = "Please select an option";
  }
  if (step === 2) {
    if (!form.careerInterest)
      errors.careerInterest = "Please select a career interest";
    if (!form.businessInterest)
      errors.businessInterest = "Please select a business interest";
    if (!form.goal) errors.goal = "Please select a primary goal";
  }
  return errors;
}

// --- Step Indicator ---

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8 w-full">
      {STEPS.map((s, i) => (
        <div key={s.label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-smooth border-2 ${
                i < current
                  ? "border-accent bg-accent text-accent-foreground"
                  : i === current
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px_oklch(var(--primary)/0.15)]"
                    : "border-border bg-muted text-muted-foreground"
              }`}
            >
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-[10px] font-medium hidden sm:block whitespace-nowrap transition-smooth ${
                i <= current ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex-1 mx-2 mb-4">
              <div
                className={`h-0.5 rounded-full transition-smooth ${
                  i < current ? "progress-gradient" : "bg-border"
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// --- Radio Card ---

function RadioCard<T extends string>({
  option,
  selected,
  onSelect,
}: {
  option: { value: T; label: string; desc: string; icon: string };
  selected: boolean;
  onSelect: (v: T) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={`w-full text-left rounded-xl border-2 transition-smooth px-3 py-2.5 flex items-start gap-3 ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02]"
      }`}
    >
      <span className="text-lg leading-none mt-0.5">{option.icon}</span>
      <div className="min-w-0 flex-1">
        <p
          className={`font-semibold text-sm ${selected ? "text-primary" : "text-foreground"}`}
        >
          {option.label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
          {option.desc}
        </p>
      </div>
      <div
        className={`ml-auto mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-smooth ${
          selected ? "border-primary bg-primary" : "border-muted-foreground"
        }`}
      >
        {selected && (
          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
        )}
      </div>
    </button>
  );
}

// --- Skill Tag Picker ---

function SkillTagPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const selected = value
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const [custom, setCustom] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = (skill: string) => {
    const exists = selected.includes(skill);
    const next = exists
      ? selected.filter((s) => s !== skill)
      : [...selected, skill];
    onChange(next.join(", "));
  };

  const addCustom = () => {
    const trimmed = custom.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    toggle(trimmed);
    setCustom("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {SKILL_OPTIONS.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => toggle(skill)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-smooth ${
              selected.includes(skill)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-border hover:border-primary/60"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          placeholder="Add custom skill…"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          className="text-sm h-8"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addCustom}
          className="h-8 px-3"
        >
          Add
        </Button>
      </div>
      {selected
        .filter((s) => !SKILL_OPTIONS.includes(s))
        .map((s) => (
          <Badge
            key={s}
            variant="secondary"
            className="w-fit cursor-pointer"
            onClick={() => toggle(s)}
          >
            {s} ×
          </Badge>
        ))}
    </div>
  );
}

// --- Field Wrapper ---

function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor} className={error ? "text-destructive" : ""}>
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// --- Steps ---

function Step1({
  form,
  errors,
  set,
}: {
  form: FormData;
  errors: FieldError;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  return (
    <div className="grid gap-4">
      <Field label="Full Name *" error={errors.name} htmlFor="name">
        <Input
          id="name"
          placeholder="e.g. Priya Sharma"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className={errors.name ? "border-destructive" : ""}
          data-ocid="onboarding.name_input"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Age *" error={errors.age} htmlFor="age">
          <Input
            id="age"
            type="number"
            min={10}
            max={80}
            value={form.age}
            onChange={(e) => set("age", Number(e.target.value))}
            className={errors.age ? "border-destructive" : ""}
            data-ocid="onboarding.age_input"
          />
        </Field>
        <Field label="Gender (optional)">
          <Select
            value={form.gender ?? ""}
            onValueChange={(v) => set("gender", v || undefined)}
          >
            <SelectTrigger data-ocid="onboarding.gender_select">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="City / Country *" error={errors.city} htmlFor="city">
        <Input
          id="city"
          placeholder="e.g. Mumbai, India"
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
          className={errors.city ? "border-destructive" : ""}
          data-ocid="onboarding.city_input"
        />
      </Field>

      <Field label="Education Level *" error={errors.educationLevel}>
        <Select
          value={form.educationLevel}
          onValueChange={(v) => set("educationLevel", v)}
        >
          <SelectTrigger
            className={errors.educationLevel ? "border-destructive" : ""}
            data-ocid="onboarding.education_select"
          >
            <SelectValue placeholder="Select your education" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10th">10th Grade</SelectItem>
            <SelectItem value="12th">12th Grade</SelectItem>
            <SelectItem value="diploma">Diploma / ITI</SelectItem>
            <SelectItem value="graduate">
              Graduate (BA / BSc / BCom / BTech)
            </SelectItem>
            <SelectItem value="postgraduate">Post Graduate</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field
        label="Current Class / Degree / Job *"
        error={errors.currentStatus}
        htmlFor="status"
      >
        <Input
          id="status"
          placeholder="e.g. Class 12 Science, B.Tech CSE, Software Engineer"
          value={form.currentStatus}
          onChange={(e) => set("currentStatus", e.target.value)}
          className={errors.currentStatus ? "border-destructive" : ""}
          data-ocid="onboarding.status_input"
        />
      </Field>
    </div>
  );
}

function Step2({
  form,
  errors,
  set,
}: {
  form: FormData;
  errors: FieldError;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  const moneyFields: {
    field: keyof FormData;
    label: string;
    placeholder: string;
    ocid: string;
  }[] = [
    {
      field: "monthlyIncome",
      label: "Monthly Income (₹) *",
      placeholder: "e.g. 25000 (enter 0 if student)",
      ocid: "onboarding.income_input",
    },
    {
      field: "monthlyExpenses",
      label: "Monthly Expenses (₹) *",
      placeholder: "e.g. 18000",
      ocid: "onboarding.expenses_input",
    },
    {
      field: "currentSavings",
      label: "Current Savings (₹) *",
      placeholder: "e.g. 5000 (0 is fine)",
      ocid: "onboarding.savings_input",
    },
    {
      field: "debtAmount",
      label: "Debt / Loan Amount (₹)",
      placeholder: "e.g. 50000 or 0 if none",
      ocid: "onboarding.debt_input",
    },
  ];

  return (
    <div className="grid gap-4">
      <div className="rounded-xl bg-primary/5 border border-primary/15 px-4 py-3 flex items-start gap-3">
        <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Be honest — even ₹0 savings is a great starting point. We'll help you
          build from there.
        </p>
      </div>

      {moneyFields.map(({ field, label, placeholder, ocid }) => (
        <Field key={field} label={label}>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              ₹
            </span>
            <Input
              type="number"
              min={0}
              placeholder={placeholder}
              defaultValue={Number(form[field] as bigint)}
              onChange={(e) => {
                const val = BigInt(Math.max(0, Number(e.target.value) || 0));
                set(field, val);
              }}
              className="pl-7"
              data-ocid={ocid}
            />
          </div>
        </Field>
      ))}

      <Field
        label="Family Responsibility *"
        error={errors.familyResponsibility}
      >
        <Select
          value={form.familyResponsibility}
          onValueChange={(v) => set("familyResponsibility", v)}
        >
          <SelectTrigger
            className={errors.familyResponsibility ? "border-destructive" : ""}
            data-ocid="onboarding.family_select"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None — Independent</SelectItem>
            <SelectItem value="self">Supporting myself</SelectItem>
            <SelectItem value="parents">Supporting parents</SelectItem>
            <SelectItem value="family">
              Supporting family (spouse / children)
            </SelectItem>
            <SelectItem value="joint">Joint family</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}

function Step3({
  form,
  errors,
  set,
}: {
  form: FormData;
  errors: FieldError;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  return (
    <div className="grid gap-5">
      <Field label="Career Interest *" error={errors.careerInterest}>
        <Select
          value={form.careerInterest}
          onValueChange={(v) => set("careerInterest", v)}
        >
          <SelectTrigger
            className={errors.careerInterest ? "border-destructive" : ""}
            data-ocid="onboarding.career_select"
          >
            <SelectValue placeholder="Select your career area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology & IT</SelectItem>
            <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
            <SelectItem value="finance">Finance & Banking</SelectItem>
            <SelectItem value="education">Education & Teaching</SelectItem>
            <SelectItem value="business">
              Business & Entrepreneurship
            </SelectItem>
            <SelectItem value="arts">Arts, Media & Design</SelectItem>
            <SelectItem value="government">
              Government & Public Service
            </SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field label="Your Skills (select all that apply)">
        <SkillTagPicker
          value={form.skills}
          onChange={(v) => set("skills", v)}
        />
      </Field>

      <Field label="Business Interest *" error={errors.businessInterest}>
        <Select
          value={form.businessInterest}
          onValueChange={(v) => set("businessInterest", v)}
        >
          <SelectTrigger
            className={errors.businessInterest ? "border-destructive" : ""}
            data-ocid="onboarding.business_select"
          >
            <SelectValue placeholder="Select your business interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Not interested in business</SelectItem>
            <SelectItem value="small">Small local business</SelectItem>
            <SelectItem value="medium">Medium business</SelectItem>
            <SelectItem value="online">Online / Digital business</SelectItem>
            <SelectItem value="large">Large enterprise</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <div className="grid gap-1.5">
        <Label>Risk Tolerance *</Label>
        <div className="grid gap-2">
          {RISK_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              option={opt}
              selected={form.riskLevel === opt.value}
              onSelect={(v) => set("riskLevel", v)}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label>Primary Goal *</Label>
        {errors.goal && (
          <p className="text-xs text-destructive">{errors.goal}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {GOAL_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              option={opt}
              selected={form.goal === opt.value}
              onSelect={(v) => set("goal", v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---

export default function Onboarding() {
  const navigate = useNavigate();
  const { isAuthenticated, login, isInitializing } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const goNext = () => {
    const errs = validateStep(step, form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setErrors({});
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    const errs = validateStep(2, form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!actor) {
      toast.error("Not connected. Please refresh and try again.");
      return;
    }
    setLoading(true);
    try {
      const profile = {
        id: "",
        principal: Principal.fromText("aaaaa-aa"),
        name: form.name,
        age: BigInt(form.age || 0),
        gender: form.gender,
        city: form.city,
        educationLevel: form.educationLevel,
        currentStatus: form.currentStatus,
        monthlyIncome: BigInt(form.monthlyIncome),
        monthlyExpenses: BigInt(form.monthlyExpenses),
        familyResponsibility: form.familyResponsibility,
        currentSavings: BigInt(form.currentSavings),
        debtAmount: BigInt(form.debtAmount),
        careerInterest: form.careerInterest,
        skills: Array.isArray(form.skills)
          ? (form.skills as string[]).join(", ")
          : form.skills,
        businessInterest: form.businessInterest,
        riskLevel: form.riskLevel,
        goal: form.goal,
        isPremium: false,
        createdAt: BigInt(Date.now()),
      };
      await actor.saveCallerUserProfile(profile);
      await qc.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile saved! Your personalised plan is ready. 🎉");
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error("saveCallerUserProfile failed:", err);
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(
        msg.includes("reject")
          ? "Could not save profile — please check your connection and try again."
          : "Failed to save profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div
          className="min-h-[80vh] flex items-center justify-center px-4"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 0%, oklch(var(--primary)/0.08) 0%, transparent 70%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border p-8 max-w-sm w-full text-center card-premium"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display font-bold text-xl text-foreground mb-2">
              Sign in to get started
            </h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Create your personalised savings plan, career roadmap and 10-year
              life plan with SaveFuture AI.
            </p>
            <Button
              type="button"
              onClick={() => login()}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
              data-ocid="onboarding.signin_button"
            >
              <LogIn className="w-4 h-4" />
              Sign in with Internet Identity
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Free to use · No credit card required
            </p>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
  };

  return (
    <Layout>
      <div
        className="min-h-[90vh] flex items-start justify-center px-4 py-10"
        style={{
          background:
            "radial-gradient(ellipse 140% 60% at 50% -10%, oklch(var(--primary)/0.07) 0%, transparent 65%)",
        }}
      >
        <div className="w-full max-w-lg">
          {/* Page header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
              Step {step + 1} of {STEPS.length}
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              {STEPS[step].subheading}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {STEPS[step].description}
            </p>
          </div>

          {/* Step indicator */}
          <StepIndicator current={step} />

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden card-premium">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
                className="p-6 sm:p-7"
              >
                {step === 0 && <Step1 form={form} errors={errors} set={set} />}
                {step === 1 && <Step2 form={form} errors={errors} set={set} />}
                {step === 2 && <Step3 form={form} errors={errors} set={set} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="px-6 sm:px-7 pb-6 sm:pb-7 flex gap-3 border-t border-border pt-4">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="w-28 h-11"
                  data-ocid="onboarding.back_button"
                >
                  ← Back
                </Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={goNext}
                  className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  data-ocid="onboarding.next_button"
                >
                  Continue →
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 h-11 rounded-md font-bold text-sm gap-2 flex items-center justify-center transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(var(--accent)), oklch(0.78 0.18 45))",
                    color: "oklch(var(--accent-foreground))",
                  }}
                  data-ocid="onboarding.submit_button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating your plan…
                    </>
                  ) : (
                    <>✨ Generate My Plan</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Trust strip */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            🔒 Your data is private and securely stored · No spam ever
          </p>
        </div>
      </div>
    </Layout>
  );
}
