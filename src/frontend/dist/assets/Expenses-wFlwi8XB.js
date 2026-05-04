import { b as useActor, c as useQueryClient, r as reactExports, j as jsxRuntimeExports, p as Skeleton, d as createActor } from "./index-B9bWIxQ1.js";
import { L as Layout, u as ue } from "./Layout-CfJolQ1u.js";
import { c as createLucideIcon, B as Button } from "./trending-up-SaD7OCZj.js";
import { I as Input } from "./input-6OgbgqKB.js";
import { L as Label } from "./index-g3IIsu7s.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BWPsF0ze.js";
import { u as useExpenses } from "./useExpenses-Clw-z8QO.js";
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
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Rent",
  "Utilities",
  "Other"
];
function Expenses() {
  const { data: expenses, isLoading } = useExpenses();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [category, setCategory] = reactExports.useState("Food");
  const [amount, setAmount] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const total = (expenses == null ? void 0 : expenses.reduce((acc, e) => acc + Number(e.amount), 0)) ?? 0;
  const handleAdd = async () => {
    if (!actor || !amount) return;
    setSaving(true);
    try {
      await actor.addExpense({
        category,
        amount: BigInt(Number(amount)),
        description,
        date: BigInt(Date.now())
      });
      await qc.invalidateQueries({ queryKey: ["expenses"] });
      setAmount("");
      setDescription("");
      ue.success("Expense added.");
    } catch {
      ue.error("Failed to add expense.");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id) => {
    if (!actor) return;
    try {
      await actor.deleteExpense(id);
      await qc.invalidateQueries({ queryKey: ["expenses"] });
      ue.success("Expense deleted.");
    } catch {
      ue.error("Failed to delete.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-6 max-w-2xl space-y-6",
      "data-ocid": "expenses.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Expense Tracker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track your spending to improve your savings plan." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 card-elevated", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-4", children: "Add Expense" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "expenses.category_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Amount (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    placeholder: "0",
                    value: amount,
                    onChange: (e) => setAmount(e.target.value),
                    "data-ocid": "expenses.amount_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description (optional)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "e.g. Lunch at office",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  "data-ocid": "expenses.description_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: handleAdd,
                disabled: saving || !amount,
                className: "bg-primary hover:bg-primary/90 text-primary-foreground gap-2",
                "data-ocid": "expenses.add_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  " ",
                  saving ? "Adding..." : "Add Expense"
                ]
              }
            )
          ] })
        ] }),
        !isLoading && expenses && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Total Tracked Expenses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-lg", children: [
            "₹",
            total.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "expenses.list", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" })
        ] }) : expenses && expenses.length > 0 ? expenses.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border border-border px-4 py-3 flex items-center justify-between",
            "data-ocid": `expenses.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0", children: e.category.slice(0, 2) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: e.description || e.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: e.category })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  "₹",
                  Number(e.amount).toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => handleDelete(e.id),
                    className: "text-destructive hover:text-destructive hover:bg-destructive/10",
                    "data-ocid": `expenses.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          },
          String(e.id)
        )) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-10 text-muted-foreground",
            "data-ocid": "expenses.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No expenses tracked yet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Add your first expense above to start tracking." })
            ]
          }
        ) })
      ]
    }
  ) });
}
export {
  Expenses as default
};
