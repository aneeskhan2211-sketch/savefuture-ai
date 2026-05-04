import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useExpenses } from "@/hooks/useExpenses";
import type { Expense } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Rent",
  "Utilities",
  "Other",
];

export default function Expenses() {
  const { data: expenses, isLoading } = useExpenses();
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const total = expenses?.reduce((acc, e) => acc + Number(e.amount), 0) ?? 0;

  const handleAdd = async () => {
    if (!actor || !amount) return;
    setSaving(true);
    try {
      await (
        actor as unknown as {
          addExpense: (e: Omit<Expense, "id">) => Promise<void>;
        }
      ).addExpense({
        category,
        amount: BigInt(Number(amount)),
        description,
        date: BigInt(Date.now()),
      });
      await qc.invalidateQueries({ queryKey: ["expenses"] });
      setAmount("");
      setDescription("");
      toast.success("Expense added.");
    } catch {
      toast.error("Failed to add expense.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!actor) return;
    try {
      await (
        actor as unknown as { deleteExpense: (id: bigint) => Promise<void> }
      ).deleteExpense(id);
      await qc.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-6 max-w-2xl space-y-6"
        data-ocid="expenses.page"
      >
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Expense Tracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your spending to improve your savings plan.
          </p>
        </div>

        {/* Add expense */}
        <div className="bg-card rounded-2xl border border-border p-5 card-elevated">
          <h2 className="font-semibold text-foreground mb-4">Add Expense</h2>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger data-ocid="expenses.category_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  data-ocid="expenses.amount_input"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Description (optional)</Label>
              <Input
                placeholder="e.g. Lunch at office"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-ocid="expenses.description_input"
              />
            </div>
            <Button
              onClick={handleAdd}
              disabled={saving || !amount}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              data-ocid="expenses.add_button"
            >
              <Plus className="w-4 h-4" />{" "}
              {saving ? "Adding..." : "Add Expense"}
            </Button>
          </div>
        </div>

        {/* Total */}
        {!isLoading && expenses && (
          <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
            <span className="text-sm font-medium text-foreground">
              Total Tracked Expenses
            </span>
            <span className="font-display font-bold text-primary text-lg">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* List */}
        <div className="space-y-2" data-ocid="expenses.list">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-14 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
              <Skeleton className="h-14 rounded-xl" />
            </div>
          ) : expenses && expenses.length > 0 ? (
            expenses.map((e, i) => (
              <div
                key={String(e.id)}
                className="bg-card rounded-xl border border-border px-4 py-3 flex items-center justify-between"
                data-ocid={`expenses.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {e.category.slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {e.description || e.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {e.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-semibold text-foreground">
                    ₹{Number(e.amount).toLocaleString("en-IN")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(e.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    data-ocid={`expenses.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div
              className="text-center py-10 text-muted-foreground"
              data-ocid="expenses.empty_state"
            >
              <p className="font-medium">No expenses tracked yet.</p>
              <p className="text-sm">
                Add your first expense above to start tracking.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
