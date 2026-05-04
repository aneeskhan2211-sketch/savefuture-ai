import Common "common";

module {
  public type DailyTask = {
    id : Common.UserId;
    userId : Text;
    text : Text;
    completed : Bool;
    date : Common.Timestamp;
  };
};
