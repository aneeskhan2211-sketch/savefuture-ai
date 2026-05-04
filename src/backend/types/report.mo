import Common "common";

module {
  public type AIReport = {
    userId : Text;
    suggestions : [Text];
    budgetBreakdown : [(Text, Float)];
    generatedAt : Common.Timestamp;
  };
};
