import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
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
    createdAt : Common.Timestamp;
  };
};
