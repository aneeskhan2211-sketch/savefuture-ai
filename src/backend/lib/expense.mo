import List "mo:core/List";
import TypesExpense "../types/expense";

module {
  public type Expense = TypesExpense.Expense;

  public func add(
    expenses : List.List<Expense>,
    expense : Expense,
  ) : () {
    expenses.add(expense);
  };

  public func listForUser(
    expenses : List.List<Expense>,
    userId : Text,
  ) : [Expense] {
    expenses.filter(func(e) { e.userId == userId }).toArray();
  };

  public func delete(
    expenses : List.List<Expense>,
    expenseId : Text,
    userId : Text,
  ) : () {
    let kept = expenses.filter(func(e) { not (e.id == expenseId and e.userId == userId) });
    expenses.clear();
    expenses.append(kept);
  };
};
