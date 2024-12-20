import json
import os

def parse_report(report_file):
    with open(report_file, 'r') as f:
        data = json.load(f)

    try:
        total_scenarios = len(data['elements'])
    except KeyError:
        # Handle cases where "elements" key is missing
        total_scenarios = 0
        print(f"Warning: 'elements' key not found in {report_file}")
    passed_scenarios = 0
    failed_scenarios = 0
    skipped_scenarios = 0

    for scenario in data['elements']:
        status = scenario['result']['status']
        if status == 'passed':
            passed_scenarios += 1
        elif status == 'failed':
            failed_scenarios += 1
        elif status == 'skipped':
            skipped_scenarios += 1

    return total_scenarios, passed_scenarios, failed_scenarios, skipped_scenarios

def process_reports(directory):
    total_overall = 0
    passed_overall = 0
    failed_overall = 0
    skipped_overall = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.json'):
                report_file = os.path.join(root, file)
                total, passed, failed, skipped = parse_report(report_file)

                total_overall += total
                passed_overall += passed
                failed_overall += failed
                skipped_overall += skipped

                print(f"Report: {report_file}")
                print(f"Total Scenarios: {total}")
                print(f"Passed Scenarios: {passed}")
                print(f"Failed Scenarios: {failed}")
                print(f"Skipped Scenarios: {skipped}")
                print("-----------------------------------")

    print("\nOverall Summary:")
    print(f"Total Scenarios: {total_overall}")
    print(f"Passed Scenarios: {passed_overall}")
    print(f"Failed Scenarios: {failed_overall}")
    print(f"Skipped Scenarios: {skipped_overall}")

# Replace 'your_report_directory' with the actual directory path
process_reports('artifacts')