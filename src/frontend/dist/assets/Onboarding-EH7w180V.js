import { u as useNavigate, a as useInternetIdentity, b as useActor, c as useQueryClient, r as reactExports, j as jsxRuntimeExports, P as Principal, d as createActor } from "./index-B9bWIxQ1.js";
import { L as Layout, a as LogIn, u as ue } from "./Layout-CfJolQ1u.js";
import { B as Badge } from "./badge-COekOkXS.js";
import { c as createLucideIcon, a as Briefcase, B as Button, T as TrendingUp } from "./trending-up-SaD7OCZj.js";
import { I as Input } from "./input-6OgbgqKB.js";
import { L as Label } from "./index-g3IIsu7s.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BWPsF0ze.js";
import { m as motion } from "./proxy-DD2murxF.js";
import { A as AnimatePresence } from "./index-CIYdDehy.js";
import { C as CircleCheck } from "./circle-check-DI0pjUTv.js";
import "./useSubscription-dZhr2mFU.js";
import "./index-DbgaXzGo.js";
import "./index-BZK2c-yQ.js";
import "./index-BA_n67RZ.js";
import "./chevron-down-HEPoaS0J.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const STEPS = [
  {
    label: "Personal Info",
    subheading: "Tell us about yourself",
    description: "Your background helps us personalise your plan"
  },
  {
    label: "Financial Info",
    subheading: "Your financial snapshot",
    description: "Honest numbers lead to the best advice"
  },
  {
    label: "Goals & Interests",
    subheading: "Your goals and dreams",
    description: "What matters most to you in the next 10 years?"
  }
];
const SKILL_OPTIONS = [
  "Communication",
  "Programming",
  "Sales",
  "Teaching",
  "Management",
  "Design",
  "Writing",
  "Other"
];
const RISK_OPTIONS = [
  {
    value: "low",
    label: "Low Risk",
    desc: "I prefer safety and stability",
    icon: "🛡️"
  },
  {
    value: "medium",
    label: "Balanced",
    desc: "I can handle moderate risk",
    icon: "⚖️"
  },
  {
    value: "high",
    label: "High Risk",
    desc: "I'm ready for bold moves",
    icon: "🚀"
  }
];
const GOAL_OPTIONS = [
  {
    value: "save",
    label: "Save Money",
    desc: "Build savings & cut expenses",
    icon: "💰"
  },
  {
    value: "business",
    label: "Start Business",
    desc: "Launch my own venture",
    icon: "🏢"
  },
  {
    value: "career",
    label: "Career Growth",
    desc: "Find the right career path",
    icon: "📈"
  },
  {
    value: "education",
    label: "Education Plan",
    desc: "Chart my learning journey",
    icon: "🎓"
  },
  {
    value: "income",
    label: "Grow Income",
    desc: "Increase earning potential",
    icon: "📹"
  }
];
const DEFAULT_FORM = {
  name: "",
  age: 22,
  gender: void 0,
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
  goal: "save"
};
function validateStep(step, form) {
  const errors = {};
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
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 mb-8 w-full", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1 last:flex-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-smooth border-2 ${i < current ? "border-accent bg-accent text-accent-foreground" : i === current ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px_oklch(var(--primary)/0.15)]" : "border-border bg-muted text-muted-foreground"}`,
          children: i < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-[10px] font-medium hidden sm:block whitespace-nowrap transition-smooth ${i <= current ? "text-foreground" : "text-muted-foreground"}`,
          children: s.label
        }
      )
    ] }),
    i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-0.5 rounded-full transition-smooth ${i < current ? "progress-gradient" : "bg-border"}`
      }
    ) })
  ] }, s.label)) });
}
function RadioCard({
  option,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onSelect(option.value),
      className: `w-full text-left rounded-xl border-2 transition-smooth px-3 py-2.5 flex items-start gap-3 ${selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02]"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none mt-0.5", children: option.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-semibold text-sm ${selected ? "text-primary" : "text-foreground"}`,
              children: option.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-snug", children: option.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `ml-auto mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-smooth ${selected ? "border-primary bg-primary" : "border-muted-foreground"}`,
            children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary-foreground" })
          }
        )
      ]
    }
  );
}
function SkillTagPicker({
  value,
  onChange
}) {
  const selected = value ? value.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const [custom, setCustom] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const toggle = (skill) => {
    const exists = selected.includes(skill);
    const next = exists ? selected.filter((s) => s !== skill) : [...selected, skill];
    onChange(next.join(", "));
  };
  const addCustom = () => {
    const trimmed = custom.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    toggle(trimmed);
    setCustom("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SKILL_OPTIONS.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => toggle(skill),
        className: `rounded-full px-3 py-1 text-xs font-medium border transition-smooth ${selected.includes(skill) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-primary/60"}`,
        children: skill
      },
      skill
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          ref: inputRef,
          placeholder: "Add custom skill…",
          value: custom,
          onChange: (e) => setCustom(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          },
          className: "text-sm h-8"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: addCustom,
          className: "h-8 px-3",
          children: "Add"
        }
      )
    ] }),
    selected.filter((s) => !SKILL_OPTIONS.includes(s)).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        variant: "secondary",
        className: "w-fit cursor-pointer",
        onClick: () => toggle(s),
        children: [
          s,
          " ×"
        ]
      },
      s
    ))
  ] });
}
function Field({
  label,
  error,
  children,
  htmlFor
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor, className: error ? "text-destructive" : "", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
function Step1({
  form,
  errors,
  set
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name *", error: errors.name, htmlFor: "name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: "name",
        placeholder: "e.g. Priya Sharma",
        value: form.name,
        onChange: (e) => set("name", e.target.value),
        className: errors.name ? "border-destructive" : "",
        "data-ocid": "onboarding.name_input"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Age *", error: errors.age, htmlFor: "age", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "age",
          type: "number",
          min: 10,
          max: 80,
          value: form.age,
          onChange: (e) => set("age", Number(e.target.value)),
          className: errors.age ? "border-destructive" : "",
          "data-ocid": "onboarding.age_input"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Gender (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: form.gender ?? "",
          onValueChange: (v) => set("gender", v || void 0),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "onboarding.gender_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "male", children: "Male" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "female", children: "Female" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "prefer_not", children: "Prefer not to say" })
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City / Country *", error: errors.city, htmlFor: "city", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id: "city",
        placeholder: "e.g. Mumbai, India",
        value: form.city,
        onChange: (e) => set("city", e.target.value),
        className: errors.city ? "border-destructive" : "",
        "data-ocid": "onboarding.city_input"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Education Level *", error: errors.educationLevel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: form.educationLevel,
        onValueChange: (v) => set("educationLevel", v),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: errors.educationLevel ? "border-destructive" : "",
              "data-ocid": "onboarding.education_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your education" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "10th", children: "10th Grade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "12th", children: "12th Grade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "diploma", children: "Diploma / ITI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "graduate", children: "Graduate (BA / BSc / BCom / BTech)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "postgraduate", children: "Post Graduate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: "Current Class / Degree / Job *",
        error: errors.currentStatus,
        htmlFor: "status",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "status",
            placeholder: "e.g. Class 12 Science, B.Tech CSE, Software Engineer",
            value: form.currentStatus,
            onChange: (e) => set("currentStatus", e.target.value),
            className: errors.currentStatus ? "border-destructive" : "",
            "data-ocid": "onboarding.status_input"
          }
        )
      }
    )
  ] });
}
function Step2({
  form,
  errors,
  set
}) {
  const moneyFields = [
    {
      field: "monthlyIncome",
      label: "Monthly Income (₹) *",
      placeholder: "e.g. 25000 (enter 0 if student)",
      ocid: "onboarding.income_input"
    },
    {
      field: "monthlyExpenses",
      label: "Monthly Expenses (₹) *",
      placeholder: "e.g. 18000",
      ocid: "onboarding.expenses_input"
    },
    {
      field: "currentSavings",
      label: "Current Savings (₹) *",
      placeholder: "e.g. 5000 (0 is fine)",
      ocid: "onboarding.savings_input"
    },
    {
      field: "debtAmount",
      label: "Debt / Loan Amount (₹)",
      placeholder: "e.g. 50000 or 0 if none",
      ocid: "onboarding.debt_input"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-primary/5 border border-primary/15 px-4 py-3 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Be honest — even ₹0 savings is a great starting point. We'll help you build from there." })
    ] }),
    moneyFields.map(({ field, label, placeholder, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium", children: "₹" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: 0,
          placeholder,
          defaultValue: Number(form[field]),
          onChange: (e) => {
            const val = BigInt(Math.max(0, Number(e.target.value) || 0));
            set(field, val);
          },
          className: "pl-7",
          "data-ocid": ocid
        }
      )
    ] }) }, field)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Field,
      {
        label: "Family Responsibility *",
        error: errors.familyResponsibility,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.familyResponsibility,
            onValueChange: (v) => set("familyResponsibility", v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: errors.familyResponsibility ? "border-destructive" : "",
                  "data-ocid": "onboarding.family_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "None — Independent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "self", children: "Supporting myself" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "parents", children: "Supporting parents" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "family", children: "Supporting family (spouse / children)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "joint", children: "Joint family" })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function Step3({
  form,
  errors,
  set
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Career Interest *", error: errors.careerInterest, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: form.careerInterest,
        onValueChange: (v) => set("careerInterest", v),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: errors.careerInterest ? "border-destructive" : "",
              "data-ocid": "onboarding.career_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your career area" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "technology", children: "Technology & IT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "healthcare", children: "Healthcare & Medical" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "finance", children: "Finance & Banking" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "education", children: "Education & Teaching" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "business", children: "Business & Entrepreneurship" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "arts", children: "Arts, Media & Design" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "government", children: "Government & Public Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your Skills (select all that apply)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SkillTagPicker,
      {
        value: form.skills,
        onChange: (v) => set("skills", v)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Business Interest *", error: errors.businessInterest, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: form.businessInterest,
        onValueChange: (v) => set("businessInterest", v),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: errors.businessInterest ? "border-destructive" : "",
              "data-ocid": "onboarding.business_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your business interest" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Not interested in business" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "small", children: "Small local business" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Medium business" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "online", children: "Online / Digital business" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "large", children: "Large enterprise" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Risk Tolerance *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: RISK_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioCard,
        {
          option: opt,
          selected: form.riskLevel === opt.value,
          onSelect: (v) => set("riskLevel", v)
        },
        opt.value
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Primary Goal *" }),
      errors.goal && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.goal }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: GOAL_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioCard,
        {
          option: opt,
          selected: form.goal === opt.value,
          onSelect: (v) => set("goal", v)
        },
        opt.value
      )) })
    ] })
  ] });
}
function Onboarding() {
  const navigate = useNavigate();
  const { isAuthenticated, login, isInitializing } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [step, setStep] = reactExports.useState(0);
  const [direction, setDirection] = reactExports.useState(1);
  const [loading, setLoading] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [form, setForm] = reactExports.useState(DEFAULT_FORM);
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));
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
      ue.error("Not connected. Please refresh and try again.");
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
        skills: Array.isArray(form.skills) ? form.skills.join(", ") : form.skills,
        businessInterest: form.businessInterest,
        riskLevel: form.riskLevel,
        goal: form.goal,
        isPremium: false,
        createdAt: BigInt(Date.now())
      };
      await actor.saveCallerUserProfile(profile);
      await qc.invalidateQueries({ queryKey: ["profile"] });
      ue.success("Profile saved! Your personalised plan is ready. 🎉");
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error("saveCallerUserProfile failed:", err);
      const msg = err instanceof Error ? err.message : String(err);
      ue.error(
        msg.includes("reject") ? "Could not save profile — please check your connection and try again." : "Failed to save profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[80vh] flex items-center justify-center px-4",
        style: {
          background: "radial-gradient(ellipse 120% 80% at 50% 0%, oklch(var(--primary)/0.08) 0%, transparent 70%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "bg-card rounded-2xl border border-border p-8 max-w-sm w-full text-center card-premium",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-7 h-7 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Sign in to get started" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 leading-relaxed", children: "Create your personalised savings plan, career roadmap and 10-year life plan with SaveFuture AI." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: () => login(),
                  className: "w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2",
                  "data-ocid": "onboarding.signin_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                    "Sign in with Internet Identity"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-4", children: "Free to use · No credit card required" })
            ]
          }
        )
      }
    ) });
  }
  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir * 48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -48 })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[90vh] flex items-start justify-center px-4 py-10",
      style: {
        background: "radial-gradient(ellipse 140% 60% at 50% -10%, oklch(var(--primary)/0.07) 0%, transparent 65%)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 mb-3", children: [
            "Step ",
            step + 1,
            " of ",
            STEPS.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: STEPS[step].subheading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: STEPS[step].description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border overflow-hidden card-premium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", custom: direction, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: direction,
              variants: slideVariants,
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition: { duration: 0.28, ease: [0.32, 0, 0.67, 0] },
              className: "p-6 sm:p-7",
              children: [
                step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step1, { form, errors, set }),
                step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step2, { form, errors, set }),
                step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step3, { form, errors, set })
              ]
            },
            step
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 sm:px-7 pb-6 sm:pb-7 flex gap-3 border-t border-border pt-4", children: [
            step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: goBack,
                className: "w-28 h-11",
                "data-ocid": "onboarding.back_button",
                children: "← Back"
              }
            ),
            step < STEPS.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: goNext,
                className: "flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold",
                "data-ocid": "onboarding.next_button",
                children: "Continue →"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSubmit,
                disabled: loading,
                className: "flex-1 h-11 rounded-md font-bold text-sm gap-2 flex items-center justify-center transition-smooth disabled:opacity-60 disabled:cursor-not-allowed",
                style: {
                  background: "linear-gradient(135deg, oklch(var(--accent)), oklch(0.78 0.18 45))",
                  color: "oklch(var(--accent-foreground))"
                },
                "data-ocid": "onboarding.submit_button",
                children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  "Generating your plan…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "✨ Generate My Plan" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "🔒 Your data is private and securely stored · No spam ever" })
      ] })
    }
  ) });
}
export {
  Onboarding as default
};
