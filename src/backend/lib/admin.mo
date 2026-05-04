import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import TypesUser "../types/user";
import TypesSubscription "../types/subscription";
import TypesAdmin "../types/admin";

module {
  public type AdminStats = TypesAdmin.AdminStats;

  public func getStats(
    profiles : Map.Map<Principal, TypesUser.UserProfile>,
    subscriptions : Map.Map<Text, TypesSubscription.PremiumSubscription>,
    popularCareers : List.List<Text>,
    popularBusinessIdeas : List.List<Text>,
  ) : AdminStats {
    let totalUsers = profiles.size();
    var premiumCount = 0;
    for ((_k, p) in profiles.entries()) {
      if (p.isPremium) { premiumCount += 1 };
    };
    var revenue = 0.0;
    for ((_k, sub) in subscriptions.entries()) {
      if (sub.status == "active") {
        if (sub.plan == "monthly") { revenue += 99.0 }
        else if (sub.plan == "yearly") { revenue += 799.0 }
        else if (sub.plan == "lifetime") { revenue += 1999.0 };
      };
    };
    let careers = if (popularCareers.isEmpty()) {
      ["Engineering", "Medical", "B.Com", "Digital Marketing", "Government Exams"]
    } else {
      popularCareers.toArray()
    };
    let bizIdeas = if (popularBusinessIdeas.isEmpty()) {
      ["Digital Marketing Agency", "Cloud Kitchen", "E-commerce Store", "Freelancing", "Coaching Center"]
    } else {
      popularBusinessIdeas.toArray()
    };
    {
      totalUsers;
      premiumUsers = premiumCount;
      totalRevenue = revenue;
      popularCareers = careers;
      popularBusinessIdeas = bizIdeas;
    };
  };
};
