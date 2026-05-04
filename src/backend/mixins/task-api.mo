import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesTask "../types/task";
import TaskLib "../lib/task";

mixin (
  accessControlState : AccessControl.AccessControlState,
  dailyTasks : List.List<TypesTask.DailyTask>,
) {
  public query ({ caller }) func getDailyTasks() : async [TypesTask.DailyTask] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    TaskLib.listForUser(dailyTasks, caller.toText());
  };

  public shared ({ caller }) func updateTaskCompletion(taskId : Text, completed : Bool) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    TaskLib.setCompleted(dailyTasks, taskId, completed);
  };
};
