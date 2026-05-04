import List "mo:core/List";
import TypesTask "../types/task";

module {
  public type DailyTask = TypesTask.DailyTask;

  public func listForUser(
    tasks : List.List<DailyTask>,
    userId : Text,
  ) : [DailyTask] {
    tasks.filter(func(t) { t.userId == userId }).toArray();
  };

  public func setCompleted(
    tasks : List.List<DailyTask>,
    taskId : Text,
    completed : Bool,
  ) : () {
    tasks.mapInPlace(
      func(t) {
        if (t.id == taskId) { { t with completed } } else { t };
      }
    );
  };
};
