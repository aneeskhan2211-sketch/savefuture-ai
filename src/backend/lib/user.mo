import Map "mo:core/Map";
import Principal "mo:core/Principal";
import TypesUser "../types/user";

module {
  public type UserProfile = TypesUser.UserProfile;

  public func createOrUpdate(
    profiles : Map.Map<Principal, UserProfile>,
    principal : Principal,
    profile : UserProfile,
  ) : UserProfile {
    profiles.add(principal, profile);
    profile;
  };

  public func get(
    profiles : Map.Map<Principal, UserProfile>,
    principal : Principal,
  ) : ?UserProfile {
    profiles.get(principal);
  };

  public func count(profiles : Map.Map<Principal, UserProfile>) : Nat {
    profiles.size();
  };

  public func countPremium(profiles : Map.Map<Principal, UserProfile>) : Nat {
    var n = 0;
    for ((_k, p) in profiles.entries()) {
      if (p.isPremium) { n += 1 };
    };
    n;
  };
};
