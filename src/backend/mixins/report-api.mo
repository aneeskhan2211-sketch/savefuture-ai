import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import TypesReport "../types/report";
import ReportLib "../lib/report";

mixin (
  accessControlState : AccessControl.AccessControlState,
  aiReports : Map.Map<Text, TypesReport.AIReport>,
  transform : OutCall.Transform,
) {
  public query ({ caller }) func getAIReport() : async ?TypesReport.AIReport {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ReportLib.get(aiReports, caller.toText());
  };

  public shared ({ caller }) func updateAIReport(report : TypesReport.AIReport) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let withUserId = { report with userId = caller.toText() };
    ReportLib.update(aiReports, withUserId);
  };
};
