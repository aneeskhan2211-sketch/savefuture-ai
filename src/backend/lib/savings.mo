import Map "mo:core/Map";
import TypesSavings "../types/savings";
import Float "mo:core/Float";

module {
  public type SavingsPlan = TypesSavings.SavingsPlan;

  public func get(
    plans : Map.Map<Text, SavingsPlan>,
    userId : Text,
  ) : ?SavingsPlan {
    plans.get(userId);
  };

  public func update(
    plans : Map.Map<Text, SavingsPlan>,
    plan : SavingsPlan,
  ) : () {
    plans.add(plan.userId, plan);
  };

  public func generate(
    monthlyIncome : Float,
    monthlyExpenses : Float,
    debtAmount : Float,
    currentSavings : Float,
  ) : SavingsPlan {
    let userId = "";
    let surplus = if (monthlyIncome > monthlyExpenses) { monthlyIncome - monthlyExpenses } else { 0.0 };
    let monthlyTarget = surplus;
    let dailyTarget = monthlyTarget / 30.0;
    let weeklyTarget = monthlyTarget / 7.0;
    let emergencyFundTarget = monthlyIncome * 3.0;
    let spendingRatio = if (monthlyIncome > 0.0) { monthlyExpenses / monthlyIncome } else { 1.0 };
    let suggestions : [Text] = if (spendingRatio >= 0.9) {
      [
        "Your expenses are very high relative to income. Try to cut non-essential spending.",
        "Estimated: Reduce food delivery expenses by 10–15%.",
        "Estimated: Reduce shopping/entertainment by ₹500–₹1,000/month.",
        "Build an emergency fund of " # debug_show(emergencyFundTarget) # " over 6 months.",
        "Consider a side income to boost savings.",
      ]
    } else if (spendingRatio >= 0.7) {
      [
        "You are spending 70–89% of your income. Suggested: cut 1–2 expense categories.",
        "Estimated daily saving target: " # debug_show(dailyTarget) # ".",
        "Build emergency fund: target " # debug_show(emergencyFundTarget) # ".",
        "Review subscriptions and recurring charges.",
      ]
    } else {
      [
        "Good saving ratio! Suggested: invest surplus systematically.",
        "Daily saving target: " # debug_show(dailyTarget) # " (estimated).",
        "Emergency fund target: " # debug_show(emergencyFundTarget) # ".",
      ]
    };
    let debtPlan = if (debtAmount > 0.0) {
      "Estimated: Allocate ~20% of monthly surplus (" # debug_show(monthlyTarget * 0.2) # "/month) toward debt reduction."
    } else {
      "No active debt. Focus surplus on savings and investments."
    };
    let habits : [Text] = [
      "Track every expense daily.",
      "Review your budget every Sunday.",
      "Avoid impulse purchases — wait 24 hours before buying.",
      "Cook at home at least 5 days a week.",
      "Automate your savings on salary day.",
    ];
    {
      userId;
      monthlyTarget;
      dailyTarget;
      weeklyTarget;
      emergencyFundTarget;
      emergencyFundCurrent = currentSavings;
      suggestions;
      habits;
      debtPlan;
    };
  };
};
