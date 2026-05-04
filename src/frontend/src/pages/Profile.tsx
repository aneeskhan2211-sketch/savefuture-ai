import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { PremiumBadge } from "@/components/PremiumBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import type { UserProfile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Briefcase,
  Calendar,
  CheckCircle2,
  Crown,
  GraduationCap,
  LogOut,
  MapPin,
  Pencil,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { data: profile, isLoading } = useProfile();
  const { data: sub } = useSubscription();
  const { clear, isAuthenticated: isLoggedIn } = useInternetIdentity();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const isPremium = sub?.status === "active";

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

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
      await (
        actor as unknown as {
          saveCallerUserProfile: (p: UserProfile) => Promise<void>;
        }
      ).saveCallerUserProfile(formData);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setFormData(null);
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReset() {
    if (!actor) return;
    try {
      const blank: UserProfile = {
        id: "",
        principal: {} as UserProfile["principal"],
        name: "",
        age: BigInt(0),
        gender: undefined,
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
        goal: "save",
        isPremium: false,
        createdAt: BigInt(0),
      };
      await (
        actor as unknown as {
          saveCallerUserProfile: (p: UserProfile) => Promise<void>;
        }
      ).saveCallerUserProfile(blank);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile reset.");
    } catch {
      toast.error("Reset failed.");
    }
    setResetDialogOpen(false);
  }

  function updateField<K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  const formatDate = (ts: bigint) => {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const savingScore = profile
    ? Math.min(
        100,
        Math.round(
          ((Number(profile.monthlyIncome) - Number(profile.monthlyExpenses)) /
            Math.max(Number(profile.monthlyIncome), 1)) *
            100,
        ),
      )
    : 0;

  const emergencyFundPct = profile
    ? Math.min(
        100,
        Math.round(
          (Number(profile.currentSavings) /
            Math.max(Number(profile.monthlyExpenses) * 6, 1)) *
            100,
        ),
      )
    : 0;

  const bizScore = isPremium ? Math.min(100, savingScore + 20) : null;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-6" />
          <Skeleton className="h-32 w-full rounded-2xl mb-4" />
          <Skeleton className="h-48 w-full rounded-2xl mb-4" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-12 max-w-xl text-center"
          data-ocid="profile.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-bold text-xl text-foreground mb-2">
            No Profile Found
          </h1>
          <p className="text-muted-foreground mb-6">
            Complete onboarding to create your personalised plan.
          </p>
          <Link to="/onboarding">
            <Button
              className="bg-primary text-primary-foreground"
              data-ocid="profile.onboarding_button"
            >
              Complete Onboarding
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-8 max-w-2xl space-y-6 fade-in-up"
        data-ocid="profile.page"
      >
        {/* Page Title */}
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            My Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal and financial information
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-card rounded-2xl border border-border p-6 card-elevated">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-xl text-primary">
                {initials || <User className="w-8 h-8" />}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-bold text-lg text-foreground">
                  {profile.name}
                </h2>
                {isPremium ? (
                  <PremiumBadge size="sm" />
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Free Plan
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {profile.city} · Age {profile.age}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Calendar className="w-3 h-3" />
                {sub?.currentPeriodEnd
                  ? `Member since ${formatDate(BigInt(sub.currentPeriodEnd))}`
                  : "Member"}
              </p>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={startEdit}
                className="gap-1.5 shrink-0"
                data-ocid="profile.edit_button"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </Button>
            )}
          </div>
        </div>

        {/* Quick Score Cards */}
        <div className="grid grid-cols-3 gap-3">
          <ScorePill
            icon={TrendingUp}
            label="Saving Score"
            value={`${savingScore}%`}
            color="primary"
          />
          <ScorePill
            icon={Target}
            label="Emergency Fund"
            value={`${emergencyFundPct}%`}
            color="accent"
          />
          <ScorePill
            icon={Briefcase}
            label="Biz Readiness"
            value={bizScore !== null ? `${bizScore}%` : "—"}
            color="muted"
            locked={!isPremium}
          />
        </div>

        {/* Edit Form or View Mode */}
        {isEditing && formData ? (
          <EditForm
            formData={formData}
            updateField={updateField}
            onSave={handleSave}
            onCancel={cancelEdit}
            isSaving={isSaving}
          />
        ) : (
          <ProfileView profile={profile} />
        )}

        {/* Subscription Section */}
        <div className="bg-card rounded-2xl border border-border p-5 card-elevated">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Crown className="w-4 h-4 text-accent" /> Subscription
          </h2>
          {sub ? (
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-semibold text-foreground capitalize">
                  {sub.plan.replace("_", " ")} Plan
                </p>
                <p className="text-sm text-muted-foreground">
                  Status:{" "}
                  <span
                    className={
                      sub.status === "active"
                        ? "text-green-600 font-medium"
                        : "text-destructive font-medium"
                    }
                  >
                    {sub.status === "active" ? "Active" : "Expired"}
                  </span>
                </p>
                {sub.currentPeriodEnd > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Renews {formatDate(BigInt(sub.currentPeriodEnd))}
                  </p>
                )}
              </div>
              {!isPremium && (
                <Link to="/premium">
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    data-ocid="profile.upgrade_button"
                  >
                    Upgrade Plan
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-muted-foreground">
                You are on the <strong>Free Plan</strong>.
              </p>
              <Link to="/premium">
                <Button
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  data-ocid="profile.upgrade_button"
                >
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-5">
          <h2 className="font-semibold text-destructive mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Danger Zone
          </h2>
          <p className="text-xs text-muted-foreground mb-3">
            Resetting your profile clears all saved data and preferences.
          </p>
          <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                data-ocid="profile.reset_open_modal_button"
              >
                Reset Profile
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="profile.reset.dialog">
              <DialogHeader>
                <DialogTitle>Reset Profile?</DialogTitle>
                <DialogDescription>
                  This will erase all your saved data. This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setResetDialogOpen(false)}
                  data-ocid="profile.reset.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReset}
                  data-ocid="profile.reset.confirm_button"
                >
                  Yes, Reset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sign Out */}
        {isLoggedIn && (
          <Button
            variant="outline"
            className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
            onClick={() => clear()}
            data-ocid="profile.logout_button"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        )}
      </div>
    </Layout>
  );
}

/* ── Sub-components ── */

function ScorePill({
  icon: Icon,
  label,
  value,
  color,
  locked = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: "primary" | "accent" | "muted";
  locked?: boolean;
}) {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <div className="bg-card border border-border rounded-xl p-3 card-elevated text-center">
      <div
        className={`w-8 h-8 rounded-lg ${colorMap[color]} flex items-center justify-center mx-auto mb-1`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <p className="font-display font-bold text-base text-foreground">
        {locked ? <span className="text-xs">Premium</span> : value}
      </p>
      <p className="text-xs text-muted-foreground leading-tight">{label}</p>
    </div>
  );
}

function ProfileView({ profile }: { profile: UserProfile }) {
  const INFO_ROWS = [
    { icon: MapPin, label: "Location", value: profile.city },
    { icon: GraduationCap, label: "Education", value: profile.educationLevel },
    { icon: Briefcase, label: "Current Status", value: profile.currentStatus },
    { icon: Target, label: "Career Interest", value: profile.careerInterest },
    { icon: CheckCircle2, label: "Primary Goal", value: profile.goal },
  ];
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-2xl border border-border p-5 card-elevated">
        <h2 className="font-semibold text-foreground mb-3">
          Profile Information
        </h2>
        <div className="flex flex-col gap-3">
          {INFO_ROWS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {value || "–"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-2xl border border-border p-5 card-elevated">
        <h2 className="font-semibold text-foreground mb-3">
          Financial Snapshot
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                label: "Monthly Income",
                value: `₹${Number(profile.monthlyIncome).toLocaleString("en-IN")}`,
              },
              {
                label: "Monthly Expenses",
                value: `₹${Number(profile.monthlyExpenses).toLocaleString("en-IN")}`,
              },
              {
                label: "Current Savings",
                value: `₹${Number(profile.currentSavings).toLocaleString("en-IN")}`,
              },
              {
                label: "Total Debt",
                value: `₹${Number(profile.debtAmount).toLocaleString("en-IN")}`,
              },
            ] as { label: string; value: string }[]
          ).map(({ label, value }) => (
            <div key={label} className="bg-muted/40 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-display font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EditForm({
  formData,
  updateField,
  onSave,
  onCancel,
  isSaving,
}: {
  formData: UserProfile;
  updateField: <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  return (
    <div
      className="bg-card rounded-2xl border border-border p-5 card-elevated space-y-5"
      data-ocid="profile.edit_form"
    >
      {/* Personal Info */}
      <div>
        <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide text-muted-foreground">
          Personal Info
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              data-ocid="profile.name.input"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={Number(formData.age)}
              onChange={(e) =>
                updateField(
                  "age",
                  BigInt(Math.max(0, Number(e.target.value) || 0)),
                )
              }
              data-ocid="profile.age.input"
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender (optional)</Label>
            <Select
              value={formData.gender ?? ""}
              onValueChange={(v) => updateField("gender", v || undefined)}
            >
              <SelectTrigger data-ocid="profile.gender.select">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="city">City / Country</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              data-ocid="profile.city.input"
            />
          </div>
          <div>
            <Label htmlFor="education">Education Level</Label>
            <Select
              value={formData.educationLevel}
              onValueChange={(v) => updateField("educationLevel", v)}
            >
              <SelectTrigger data-ocid="profile.education.select">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10th">10th Grade</SelectItem>
                <SelectItem value="12th">12th Grade</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="graduation">Graduation</SelectItem>
                <SelectItem value="post_graduation">Post-Graduation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <Label htmlFor="currentStatus">Current Class / Degree / Job</Label>
            <Input
              id="currentStatus"
              value={formData.currentStatus}
              onChange={(e) => updateField("currentStatus", e.target.value)}
              data-ocid="profile.status.input"
            />
          </div>
          <div>
            <Label htmlFor="family">Family Responsibility</Label>
            <Select
              value={formData.familyResponsibility}
              onValueChange={(v) => updateField("familyResponsibility", v)}
            >
              <SelectTrigger data-ocid="profile.family.select">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Financial Info */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
          Financial Info
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="income">Monthly Income (₹)</Label>
            <Input
              id="income"
              type="number"
              value={Number(formData.monthlyIncome)}
              onChange={(e) =>
                updateField("monthlyIncome", BigInt(e.target.value || "0"))
              }
              data-ocid="profile.income.input"
            />
          </div>
          <div>
            <Label htmlFor="expenses">Monthly Expenses (₹)</Label>
            <Input
              id="expenses"
              type="number"
              value={Number(formData.monthlyExpenses)}
              onChange={(e) =>
                updateField("monthlyExpenses", BigInt(e.target.value || "0"))
              }
              data-ocid="profile.expenses.input"
            />
          </div>
          <div>
            <Label htmlFor="savings">Current Savings (₹)</Label>
            <Input
              id="savings"
              type="number"
              value={Number(formData.currentSavings)}
              onChange={(e) =>
                updateField("currentSavings", BigInt(e.target.value || "0"))
              }
              data-ocid="profile.savings.input"
            />
          </div>
          <div>
            <Label htmlFor="debt">Debt / Loan (₹)</Label>
            <Input
              id="debt"
              type="number"
              value={Number(formData.debtAmount)}
              onChange={(e) =>
                updateField("debtAmount", BigInt(e.target.value || "0"))
              }
              data-ocid="profile.debt.input"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Goals & Interests */}
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
          Goals & Interests
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label htmlFor="career">Career Interest</Label>
            <Input
              id="career"
              value={formData.careerInterest}
              onChange={(e) => updateField("careerInterest", e.target.value)}
              data-ocid="profile.career.input"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="skills">Skills</Label>
            <Textarea
              id="skills"
              rows={2}
              value={formData.skills}
              onChange={(e) => updateField("skills", e.target.value)}
              placeholder="e.g. coding, graphic design, teaching..."
              data-ocid="profile.skills.textarea"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="bizInterest">Business Interest</Label>
            <Input
              id="bizInterest"
              value={formData.businessInterest}
              onChange={(e) => updateField("businessInterest", e.target.value)}
              data-ocid="profile.biz_interest.input"
            />
          </div>
          <div>
            <Label>Risk Level</Label>
            <Select
              value={formData.riskLevel}
              onValueChange={(v) => updateField("riskLevel", v)}
            >
              <SelectTrigger data-ocid="profile.risk.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Primary Goal</Label>
            <Select
              value={formData.goal}
              onValueChange={(v) => updateField("goal", v)}
            >
              <SelectTrigger data-ocid="profile.goal.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="save">Save Money</SelectItem>
                <SelectItem value="business">Start Business</SelectItem>
                <SelectItem value="career">Career Guidance</SelectItem>
                <SelectItem value="education">Education Planning</SelectItem>
                <SelectItem value="income">Income Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          data-ocid="profile.cancel_button"
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 bg-primary text-primary-foreground"
          data-ocid="profile.save_button"
        >
          {isSaving ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
