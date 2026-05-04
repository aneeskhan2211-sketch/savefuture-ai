import Map "mo:core/Map";
import Principal "mo:core/Principal";
import TypesUser "types/user";
import TypesExpense "types/expense";
import TypesSavings "types/savings";
import TypesReport "types/report";
import TypesTask "types/task";
import TypesSubscription "types/subscription";
import List "mo:core/List";

module {
  // Old UserProfile (matches deployed version: Int fields, same shape as new)
  type OldUserProfile = {
    id : Text;
    principal : Principal;
    name : Text;
    age : Nat;
    gender : ?Text;
    city : Text;
    educationLevel : Text;
    currentStatus : Text;
    monthlyIncome : Int;
    monthlyExpenses : Int;
    currentSavings : Int;
    debtAmount : Int;
    familyResponsibility : Text;
    careerInterest : Text;
    skills : Text;
    businessInterest : Text;
    riskLevel : Text;
    goal : Text;
    isPremium : Bool;
    createdAt : Int;
  };

  type OldActor = {
    profiles : Map.Map<Principal, OldUserProfile>;
    expenses : List.List<TypesExpense.Expense>;
    savingsPlans : Map.Map<Text, TypesSavings.SavingsPlan>;
    aiReports : Map.Map<Text, TypesReport.AIReport>;
    dailyTasks : List.List<TypesTask.DailyTask>;
    subscriptions : Map.Map<Text, TypesSubscription.PremiumSubscription>;
    popularCareers : List.List<Text>;
    popularBusinessIdeas : List.List<Text>;
  };

  type NewActor = {
    profiles : Map.Map<Principal, TypesUser.UserProfile>;
    expenses : List.List<TypesExpense.Expense>;
    savingsPlans : Map.Map<Text, TypesSavings.SavingsPlan>;
    aiReports : Map.Map<Text, TypesReport.AIReport>;
    dailyTasks : List.List<TypesTask.DailyTask>;
    subscriptions : Map.Map<Text, TypesSubscription.PremiumSubscription>;
    popularCareers : List.List<Text>;
    popularBusinessIdeas : List.List<Text>;
  };

  public func run(old : OldActor) : NewActor {
    // OldUserProfile is identical to new UserProfile — pass through unchanged
    let profiles = old.profiles.map<Principal, OldUserProfile, TypesUser.UserProfile>(
      func(_p, u) { u }
    );
    {
      profiles;
      expenses = old.expenses;
      savingsPlans = old.savingsPlans;
      aiReports = old.aiReports;
      dailyTasks = old.dailyTasks;
      subscriptions = old.subscriptions;
      popularCareers = old.popularCareers;
      popularBusinessIdeas = old.popularBusinessIdeas;
    };
  };
};
