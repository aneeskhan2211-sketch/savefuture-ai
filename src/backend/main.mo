import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Stripe "mo:caffeineai-stripe/stripe";
import TypesUser "types/user";
import TypesExpense "types/expense";
import TypesSavings "types/savings";
import TypesReport "types/report";
import TypesTask "types/task";
import TypesSubscription "types/subscription";
import UserApi "mixins/user-api";
import ExpenseApi "mixins/expense-api";
import SavingsApi "mixins/savings-api";
import ReportApi "mixins/report-api";
import TaskApi "mixins/task-api";
import AdminApi "mixins/admin-api";
import SubscriptionApi "mixins/subscription-api";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // State
  let profiles = Map.empty<Principal, TypesUser.UserProfile>();
  let expenses = List.empty<TypesExpense.Expense>();
  let savingsPlans = Map.empty<Text, TypesSavings.SavingsPlan>();
  let aiReports = Map.empty<Text, TypesReport.AIReport>();
  let dailyTasks = List.empty<TypesTask.DailyTask>();
  let subscriptions = Map.empty<Text, TypesSubscription.PremiumSubscription>();
  var stripeConfig : ?Stripe.StripeConfiguration = null;
  let popularCareers = List.empty<Text>();
  let popularBusinessIdeas = List.empty<Text>();

  // Transform for HTTP outcalls
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Stripe functions must live directly in the actor
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let config = switch (stripeConfig) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfig) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  // Mixins
  include UserApi(accessControlState, profiles, dailyTasks);
  include ExpenseApi(accessControlState, expenses);
  include SavingsApi(accessControlState, savingsPlans, profiles);
  include ReportApi(accessControlState, aiReports, transform);
  include TaskApi(accessControlState, dailyTasks);
  include AdminApi(accessControlState, profiles, subscriptions, popularCareers, popularBusinessIdeas);
  include SubscriptionApi(accessControlState, subscriptions);
};
