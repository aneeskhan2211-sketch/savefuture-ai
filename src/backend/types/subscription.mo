import Common "common";

module {
  public type PremiumSubscription = {
    userId : Text;
    plan : Text;
    status : Text;
    stripeCustomerId : Text;
    currentPeriodEnd : Common.Timestamp;
  };
};
