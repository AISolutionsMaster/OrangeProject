import glob
import json
import csv
import os

def process_report(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    total_scenarios = 0
    passed = 0
    failed = 0
    skipped = 0

    for feature in data:
        for element in feature.get('elements', []):
            if element.get('keyword') in ['Scenario', 'Scenario Outline']:
                total_scenarios += 1
                scenario_status = 'passed'
                for step in element.get('steps', []):
                    step_status = step.get('result', {}).get('status')
                    if step_status == 'failed':
                        scenario_status = 'failed'
                        break
                    elif step_status == 'skipped' and scenario_status != 'failed':
                        scenario_status = 'skipped'
                if scenario_status == 'passed':
                    passed += 1
                elif scenario_status == 'failed':
                    failed += 1
                elif scenario_status == 'skipped':
                    skipped += 1

    return {
        'file_name': os.path.basename(file_path),
        'total_scenarios': total_scenarios,
        'passed': passed,
        'failed': failed,
        'skipped': skipped
    }

def process_reports_to_csv(report_files, output_csv):
    fieldnames = ['file_name', 'total_scenarios', 'passed', 'failed', 'skipped']
    with open(output_csv, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for report_file in report_files:
            report_data = process_report(report_file)
            writer.writerow(report_data)

if __name__ == "__main__":
    # List your cucumber_report.json file paths
    report_files = glob.glob('artifacts/*/artifact/cucumber_report.json')
    output_csv = 'aggregated_report.csv'
    process_reports_to_csv(report_files, output_csv)
    print(f"Aggregated report saved to {output_csv}")
