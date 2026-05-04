import { j as jsxRuntimeExports, i as cn, o as useProfile, a as useInternetIdentity, b as useActor, c as useQueryClient, r as reactExports, p as Skeleton, L as Link, d as createActor } from "./index-DyUgiqXz.js";
import { L as Layout, U as User, P as PremiumBadge, c as LogOut, u as ue } from "./Layout-D65che65.js";
import { c as createLucideIcon, B as Button, T as TrendingUp, a as Briefcase } from "./trending-up-CtEt7QQ9.js";
import { D as Dialog, d as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-DIqIFDUM.js";
import { I as Input } from "./input-mtr8vhJq.js";
import { L as Label } from "./index-BaWAjBMF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D98zUJbq.js";
import { S as Separator } from "./separator-DAkvhRG-.js";
import { u as useSubscription } from "./useSubscription-DmQaFjSs.js";
import { C as Calendar } from "./calendar-Uj7egH81.js";
import { T as Target } from "./target-eh72kLKA.js";
import { C as Crown } from "./crown-JJ01DNbT.js";
import { M as MapPin } from "./map-pin-CFDA9vcx.js";
import { G as GraduationCap } from "./graduation-cap-Kw5_MQ5L.js";
import { C as CircleCheck } from "./circle-check-BSsOznUm.js";
import "./index-DkugzxL2.js";
import "./index-DHJ2HlPB.js";
import "./index-BhBGy50-.js";
import "./chevron-down-BUyuzyY5.js";
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function Profile() {
  const { data: profile, isLoading } = useProfile();
  const { data: sub } = useSubscription();
  const { clear, isAuthenticated: isLoggedIn } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const isPremium = (sub == null ? void 0 : sub.status) === "active";
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [resetDialogOpen, setResetDialogOpen] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState(null);
  function startEdit() {
    if (!profile) return;
    setFormData({ ...profile });
    setIsEditing(true);
  }
  function cancelEdit() {
    setIsEditing(false);
    setFormData(null);
  }
  async function handleSave() {
    if (!actor || !formData) return;
    setIsSaving(true);
    try {
      await actor.saveCallerUserProfile(formData);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      ue.success("Profile updated successfully!");
      setIsEditing(false);
      setFormData(null);
    } catch {
      ue.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }
  async function handleReset() {
    if (!actor) return;
    try {
      const blank = {
        name: "",
        age: 0,
        gender: [],
        city: "",
        educationLevel: "",
        currentStatus: "",
        monthlyIncome: BigInt(0),
        monthlyExpenses: BigInt(0),
        familyResponsibility: "",
        currentSavings: BigInt(0),
        debtAmount: BigInt(0),
        careerInterest: "",
        skills: "",
        businessInterest: "",
        riskLevel: "low",
        goal: "save"
      };
      await actor.saveCallerUserProfile(blank);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      ue.success("Profile reset.");
    } catch {
      ue.error("Reset failed.");
    }
    setResetDialogOpen(false);
  }
  function updateField(key, value) {
    setFormData((prev) => prev ? { ...prev, [key]: value } : prev);
  }
  const formatDate = (ts) => {
    const ms = Number(ts) / 1e6;
    return new Date(ms).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const savingScore = profile ? Math.min(
    100,
    Math.round(
      (Number(profile.monthlyIncome) - Number(profile.monthlyExpenses)) / Math.max(Number(profile.monthlyIncome), 1) * 100
    )
  ) : 0;
  const emergencyFundPct = profile ? Math.min(
    100,
    Math.round(
      Number(profile.currentSavings) / Math.max(Number(profile.monthlyExpenses) * 6, 1) * 100
    )
  ) : 0;
  const bizScore = isPremium ? Math.min(100, savingScore + 20) : null;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-2xl mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-2xl" })
    ] }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-12 max-w-xl text-center",
        "data-ocid": "profile.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No Profile Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Complete onboarding to create your personalised plan." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-primary text-primary-foreground",
              "data-ocid": "profile.onboarding_button",
              children: "Complete Onboarding"
            }
          ) })
        ]
      }
    ) });
  }
  const initials = profile.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl space-y-6 fade-in-up",
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your personal and financial information" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border p-6 card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-primary", children: initials || /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: profile.name }),
              isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumBadge, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground", children: "Free Plan" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              profile.city,
              " · Age ",
              profile.age
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
              (sub == null ? void 0 : sub.currentPeriodEnd) ? `Member since ${formatDate(BigInt(sub.currentPeriodEnd))}` : "Member"
            ] })
          ] }),
          !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: startEdit,
              className: "gap-1.5 shrink-0",
              "data-ocid": "profile.edit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                " Edit"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScorePill,
            {
              icon: TrendingUp,
              label: "Saving Score",
              value: `${savingScore}%`,
              color: "primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScorePill,
            {
              icon: Target,
              label: "Emergency Fund",
              value: `${emergencyFundPct}%`,
              color: "accent"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScorePill,
            {
              icon: Briefcase,
              label: "Biz Readiness",
              value: bizScore !== null ? `${bizScore}%` : "—",
              color: "muted",
              locked: !isPremium
            }
          )
        ] }),
        isEditing && formData ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditForm,
          {
            formData,
            updateField,
            onSave: handleSave,
            onCancel: cancelEdit,
            isSaving
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileView, { profile }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 card-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 text-accent" }),
            " Subscription"
          ] }),
          sub ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground capitalize", children: [
                sub.plan.replace("_", " "),
                " Plan"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Status:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: sub.status === "active" ? "text-green-600 font-medium" : "text-destructive font-medium",
                    children: sub.status === "active" ? "Active" : "Expired"
                  }
                )
              ] }),
              sub.currentPeriodEnd > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Renews ",
                formatDate(BigInt(sub.currentPeriodEnd))
              ] })
            ] }),
            !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/premium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "bg-accent text-accent-foreground hover:bg-accent/90",
                "data-ocid": "profile.upgrade_button",
                children: "Upgrade Plan"
              }
            ) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "You are on the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Free Plan" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/premium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "bg-accent text-accent-foreground hover:bg-accent/90",
                "data-ocid": "profile.upgrade_button",
                children: "Upgrade Plan"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/5 border border-destructive/20 rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-destructive mb-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
            " Danger Zone"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Resetting your profile clears all saved data and preferences." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: resetDialogOpen, onOpenChange: setResetDialogOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                size: "sm",
                "data-ocid": "profile.reset_open_modal_button",
                children: "Reset Profile"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "profile.reset.dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reset Profile?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "This will erase all your saved data. This action cannot be undone." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setResetDialogOpen(false),
                    "data-ocid": "profile.reset.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "destructive",
                    onClick: handleReset,
                    "data-ocid": "profile.reset.confirm_button",
                    children: "Yes, Reset"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/5",
            onClick: () => clear(),
            "data-ocid": "profile.logout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              " Sign out"
            ]
          }
        )
      ]
    }
  ) });
}
function ScorePill({
  icon: Icon,
  label,
  value,
  color,
  locked = false
}) {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    muted: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-3 card-elevated text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-8 h-8 rounded-lg ${colorMap[color]} flex items-center justify-center mx-auto mb-1`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground", children: locked ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Premium" }) : value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: label })
  ] });
}
function ProfileView({ profile }) {
  const INFO_ROWS = [
    { icon: MapPin, label: "Location", value: profile.city },
    { icon: GraduationCap, label: "Education", value: profile.educationLevel },
    { icon: Briefcase, label: "Current Status", value: profile.currentStatus },
    { icon: Target, label: "Career Interest", value: profile.careerInterest },
    { icon: CircleCheck, label: "Primary Goal", value: profile.goal }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 card-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-3", children: "Profile Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: INFO_ROWS.map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: value || "–" })
        ] })
      ] }, label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 card-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-3", children: "Financial Snapshot" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
        {
          label: "Monthly Income",
          value: `₹${Number(profile.monthlyIncome).toLocaleString("en-IN")}`
        },
        {
          label: "Monthly Expenses",
          value: `₹${Number(profile.monthlyExpenses).toLocaleString("en-IN")}`
        },
        {
          label: "Current Savings",
          value: `₹${Number(profile.currentSavings).toLocaleString("en-IN")}`
        },
        {
          label: "Total Debt",
          value: `₹${Number(profile.debtAmount).toLocaleString("en-IN")}`
        }
      ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: value })
      ] }, label)) })
    ] })
  ] });
}
function EditForm({
  formData,
  updateField,
  onSave,
  onCancel,
  isSaving
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl border border-border p-5 card-elevated space-y-5",
      "data-ocid": "profile.edit_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-muted-foreground", children: "Personal Info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  value: formData.name,
                  onChange: (e) => updateField("name", e.target.value),
                  "data-ocid": "profile.name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "age", children: "Age" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "age",
                  type: "number",
                  value: formData.age,
                  onChange: (e) => updateField("age", Number(e.target.value)),
                  "data-ocid": "profile.age.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gender", children: "Gender (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.gender[0] ?? "",
                  onValueChange: (v) => updateField("gender", v ? [v] : []),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "profile.gender.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "male", children: "Male" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "female", children: "Female" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "prefer_not", children: "Prefer not to say" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City / Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "city",
                  value: formData.city,
                  onChange: (e) => updateField("city", e.target.value),
                  "data-ocid": "profile.city.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "education", children: "Education Level" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.educationLevel,
                  onValueChange: (v) => updateField("educationLevel", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "profile.education.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "10th", children: "10th Grade" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "12th", children: "12th Grade" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "diploma", children: "Diploma" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "graduation", children: "Graduation" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "post_graduation", children: "Post-Graduation" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "currentStatus", children: "Current Class / Degree / Job" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "currentStatus",
                  value: formData.currentStatus,
                  onChange: (e) => updateField("currentStatus", e.target.value),
                  "data-ocid": "profile.status.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "family", children: "Family Responsibility" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.familyResponsibility,
                  onValueChange: (v) => updateField("familyResponsibility", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "profile.family.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "None" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Low" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Medium" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "High" })
                    ] })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3", children: "Financial Info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "income", children: "Monthly Income (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "income",
                  type: "number",
                  value: Number(formData.monthlyIncome),
                  onChange: (e) => updateField("monthlyIncome", BigInt(e.target.value || "0")),
                  "data-ocid": "profile.income.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "expenses", children: "Monthly Expenses (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "expenses",
                  type: "number",
                  value: Number(formData.monthlyExpenses),
                  onChange: (e) => updateField("monthlyExpenses", BigInt(e.target.value || "0")),
                  "data-ocid": "profile.expenses.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "savings", children: "Current Savings (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "savings",
                  type: "number",
                  value: Number(formData.currentSavings),
                  onChange: (e) => updateField("currentSavings", BigInt(e.target.value || "0")),
                  "data-ocid": "profile.savings.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "debt", children: "Debt / Loan (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "debt",
                  type: "number",
                  value: Number(formData.debtAmount),
                  onChange: (e) => updateField("debtAmount", BigInt(e.target.value || "0")),
                  "data-ocid": "profile.debt.input"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3", children: "Goals & Interests" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "career", children: "Career Interest" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "career",
                  value: formData.careerInterest,
                  onChange: (e) => updateField("careerInterest", e.target.value),
                  "data-ocid": "profile.career.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "skills", children: "Skills" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "skills",
                  rows: 2,
                  value: formData.skills,
                  onChange: (e) => updateField("skills", e.target.value),
                  placeholder: "e.g. coding, graphic design, teaching...",
                  "data-ocid": "profile.skills.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bizInterest", children: "Business Interest" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "bizInterest",
                  value: formData.businessInterest,
                  onChange: (e) => updateField("businessInterest", e.target.value),
                  "data-ocid": "profile.biz_interest.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Risk Level" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.riskLevel,
                  onValueChange: (v) => updateField("riskLevel", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "profile.risk.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Low" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Medium" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "High" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Primary Goal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: formData.goal,
                  onValueChange: (v) => updateField("goal", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "profile.goal.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "save", children: "Save Money" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "business", children: "Start Business" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "career", children: "Career Guidance" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "education", children: "Education Planning" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "income", children: "Income Growth" })
                    ] })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: onCancel,
              className: "flex-1",
              "data-ocid": "profile.cancel_button",
              disabled: isSaving,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: onSave,
              disabled: isSaving,
              className: "flex-1 bg-primary text-primary-foreground",
              "data-ocid": "profile.save_button",
              children: isSaving ? "Saving…" : "Save Changes"
            }
          )
        ] })
      ]
    }
  );
}
export {
  Profile as default
};
