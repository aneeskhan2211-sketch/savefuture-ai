import Common "common";

module {
  public type Expense = {
    id : Common.UserId;
    userId : Text;
    amount : Float;
    category : Text;
    description : Text;
    date : Common.Timestamp;
  };
};
