import json
import os

def parse_report(report_file):
    with open(report_file, 'r') as f:
        data = json.load(f)

    total_scenarios = 0
    passed_scenarios = 0
    failed_scenarios = 0
    skipped_scenarios = 0
    not_run_scenarios = 0

    for feature in data['features']:
        for scenario in feature['elements']:
            total_scenarios += 1
            status = scenario['result']['status']
            if status == 'passed':
                passed_scenarios += 1
            elif status == 'failed':
                failed_scenarios += 1
            elif status == 'skipped':
                skipped_scenarios += 1
            else:
                not_run_scenarios += 1

    return total_scenarios, passed_scenarios, failed_scenarios, skipped_scenarios, not_run_scenarios

def process_reports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('cucumber-report.json'):
                report_file = os.path.join(root, file)
                total, passed, failed, skipped, not_run = parse_report(report_file)

                # Extract timestamp from filename (if applicable)
                timestamp = os.path.getmtime(report_file)
                timestamp_str = datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')

                print(f"Report: {report_file}")
                print(f"Timestamp: {timestamp_str}")
                print(f"Total Scenarios: {total}")
                print(f"Passed Scenarios: {passed}")
                print(f"Failed Scenarios: {failed}")
                print(f"Skipped Scenarios: {skipped}")
                print(f"Not Run Scenarios: {not_run}")
                print("-----------------------------------")

# Replace 'artifacts' with the actual directory name
process_reports("artifacts")