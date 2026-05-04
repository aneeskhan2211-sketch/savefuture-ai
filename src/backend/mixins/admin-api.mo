import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesUser "../types/user";
import TypesSubscription "../types/subscription";
import TypesAdmin "../types/admin";
import AdminLib "../lib/admin";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Principal, TypesUser.UserProfile>,
  subscriptions : Map.Map<Text, TypesSubscription.PremiumSubscription>,
  popularCareers : List.List<Text>,
  popularBusinessIdeas : List.List<Text>,
) {
  public query ({ caller }) func getAdminStats() : async TypesAdmin.AdminStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    AdminLib.getStats(profiles, subscriptions, popularCareers, popularBusinessIdeas);
  };

  public shared ({ caller }) func updatePremiumStatus(userId : Text, isPremium : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let userPrincipal = Principal.fromText(userId);
    switch (profiles.get(userPrincipal)) {
      case null { Runtime.trap("User not found") };
      case (?p) {
        profiles.add(userPrincipal, { p with isPremium });
        let sub : TypesSubscription.PremiumSubscription = switch (subscriptions.get(userId)) {
          case (?existing) { { existing with status = if isPremium "active" else "cancelled" } };
          case null {
            {
              userId;
              plan = "manual";
              status = if isPremium "active" else "cancelled";
              stripeCustomerId = "";
              currentPeriodEnd = 0;
            }
          };
        };
        subscriptions.add(userId, sub);
      };
    };
  };
};
