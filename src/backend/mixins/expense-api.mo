import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesExpense "../types/expense";
import ExpenseLib "../lib/expense";

mixin (
  accessControlState : AccessControl.AccessControlState,
  expenses : List.List<TypesExpense.Expense>,
) {
  public shared ({ caller }) func addExpense(expense : TypesExpense.Expense) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let e : TypesExpense.Expense = { expense with userId = caller.toText() };
    ExpenseLib.add(expenses, e);
  };

  public query ({ caller }) func getExpenses() : async [TypesExpense.Expense] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ExpenseLib.listForUser(expenses, caller.toText());
  };

  public shared ({ caller }) func deleteExpense(expenseId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ExpenseLib.delete(expenses, expenseId, caller.toText());
  };
};
