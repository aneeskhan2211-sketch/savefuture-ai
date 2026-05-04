module {
  public type SavingsPlan = {
    userId : Text;
    monthlyTarget : Float;
    dailyTarget : Float;
    weeklyTarget : Float;
    emergencyFundTarget : Float;
    emergencyFundCurrent : Float;
    suggestions : [Text];
    habits : [Text];
    debtPlan : Text;
  };
};
