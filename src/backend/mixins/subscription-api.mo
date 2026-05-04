import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesSubscription "../types/subscription";
import SubLib "../lib/subscription";

mixin (
  accessControlState : AccessControl.AccessControlState,
  subscriptions : Map.Map<Text, TypesSubscription.PremiumSubscription>,
) {
  public query ({ caller }) func getMySubscription() : async ?TypesSubscription.PremiumSubscription {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SubLib.get(subscriptions, caller.toText());
  };

  public shared ({ caller }) func upsertSubscription(sub : TypesSubscription.PremiumSubscription) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    SubLib.upsert(subscriptions, sub);
  };
};
