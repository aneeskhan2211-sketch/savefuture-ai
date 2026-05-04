import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesUser "../types/user";
import TypesTask "../types/task";
import UserLib "../lib/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Principal, TypesUser.UserProfile>,
  dailyTasks : List.List<TypesTask.DailyTask>,
) {
  // Seed initial tasks based on user's primary goal
  private func seedInitialTasks(userId : Text, goal : Text) {
    let now = Time.now();
    let texts : [Text] = if (goal == "save_money") {
      ["Track all expenses today", "Avoid one impulse purchase", "Cook at home instead of ordering", "Review your monthly budget", "Set aside your daily saving target"]
    } else if (goal == "career_guidance") {
      ["Research one career path that interests you", "Update your resume/CV", "Apply to one job or course today", "Connect with a mentor or professional", "Read one article about your target field"]
    } else if (goal == "start_business") {
      ["Write down your business idea in detail", "Research your target market", "Identify 3 competitors", "Calculate your startup budget", "Find one potential customer to interview"]
    } else if (goal == "education_planning") {
      ["Research admission deadlines for your target course", "Review your study schedule", "Complete one practice question set", "Speak to a senior/alumni about the course", "Apply for one scholarship or financial aid"]
    } else {
      ["Review your income and expenses", "Set a saving goal for this week", "Identify one expense to reduce", "Research one income-growth opportunity", "Read a personal finance article"]
    };
    var idx = 0;
    for (text in texts.values()) {
      let task : TypesTask.DailyTask = {
        id = userId # "-init-" # idx.toText();
        userId;
        text;
        completed = false;
        date = now;
      };
      dailyTasks.add(task);
      idx += 1;
    };
  };

  public shared ({ caller }) func createOrUpdateProfile(profile : TypesUser.UserProfile) : async TypesUser.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let isNew = UserLib.get(profiles, caller) == null;
    let withPrincipal = { profile with principal = caller };
    let saved = UserLib.createOrUpdate(profiles, caller, withPrincipal);
    if (isNew) { seedInitialTasks(caller.toText(), profile.goal) };
    saved;
  };

  public query ({ caller }) func getProfile() : async ?TypesUser.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.get(profiles, caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?TypesUser.UserProfile {
    UserLib.get(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : TypesUser.UserProfile) : async () {
    let isNew = UserLib.get(profiles, caller) == null;
    let withPrincipal = { profile with principal = caller; id = caller.toText() };
    ignore UserLib.createOrUpdate(profiles, caller, withPrincipal);
    if (isNew) { seedInitialTasks(caller.toText(), profile.goal) };
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?TypesUser.UserProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admins only");
    };
    UserLib.get(profiles, user);
  };
};
