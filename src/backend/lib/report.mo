import Map "mo:core/Map";
import TypesReport "../types/report";

module {
  public type AIReport = TypesReport.AIReport;

  public func get(
    reports : Map.Map<Text, AIReport>,
    userId : Text,
  ) : ?AIReport {
    reports.get(userId);
  };

  public func update(
    reports : Map.Map<Text, AIReport>,
    report : AIReport,
  ) : () {
    reports.add(report.userId, report);
  };
};
