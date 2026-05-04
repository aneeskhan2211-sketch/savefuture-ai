import Map "mo:core/Map";
import TypesSubscription "../types/subscription";

module {
  public type PremiumSubscription = TypesSubscription.PremiumSubscription;

  public func get(
    subscriptions : Map.Map<Text, PremiumSubscription>,
    userId : Text,
  ) : ?PremiumSubscription {
    subscriptions.get(userId);
  };

  public func upsert(
    subscriptions : Map.Map<Text, PremiumSubscription>,
    sub : PremiumSubscription,
  ) : () {
    subscriptions.add(sub.userId, sub);
  };

  public func totalRevenue(
    subscriptions : Map.Map<Text, PremiumSubscription>,
  ) : Float {
    var revenue = 0.0;
    for ((_k, sub) in subscriptions.entries()) {
      if (sub.status == "active") {
        if (sub.plan == "monthly") { revenue += 99.0 }
        else if (sub.plan == "yearly") { revenue += 799.0 }
        else if (sub.plan == "lifetime") { revenue += 1999.0 };
      };
    };
    revenue;
  };
};
