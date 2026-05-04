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
    currentStudy : Text;
    monthlyIncome : Float;
    monthlyExpenses : Float;
    currentSavings : Float;
    debtAmount : Float;
    familyResponsibility : Text;
    careerInterest : Text;
    skills : [Text];
    businessInterest : Text;
    riskLevel : Text;
    primaryGoal : Text;
    isPremium : Bool;
    createdAt : Common.Timestamp;
  };
};
