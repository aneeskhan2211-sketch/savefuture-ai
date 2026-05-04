import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesSavings "../types/savings";
import SavingsLib "../lib/savings";
import TypesUser "../types/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  savingsPlans : Map.Map<Text, TypesSavings.SavingsPlan>,
  profiles : Map.Map<Principal, TypesUser.UserProfile>,
) {
  public query ({ caller }) func getSavingsPlan() : async ?TypesSavings.SavingsPlan {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SavingsLib.get(savingsPlans, caller.toText());
  };

  public shared ({ caller }) func updateSavingsPlan(plan : TypesSavings.SavingsPlan) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let withUserId = { plan with userId = caller.toText() };
    SavingsLib.update(savingsPlans, withUserId);
  };

  public shared ({ caller }) func generateSavingsPlan() : async TypesSavings.SavingsPlan {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let userId = caller.toText();
    switch (SavingsLib.get(savingsPlans, userId)) {
      case (?existing) { existing };
      case null {
        let (income, expenses, debt, savings) = switch (profiles.get(caller)) {
          case (?p) { (p.monthlyIncome, p.monthlyExpenses, p.debtAmount, p.currentSavings) };
          case null { (0.0, 0.0, 0.0, 0.0) };
        };
        let plan = SavingsLib.generate(income, expenses, debt, savings);
        let withUserId = { plan with userId };
        SavingsLib.update(savingsPlans, withUserId);
        withUserId;
      };
    };
  };
};
