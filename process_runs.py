import pandas as pd
import matplotlib.pyplot as plt
import glob
import json
import csv
import os
import logging
from tqdm import tqdm

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
    # Extract file name without "_created_at"
    file_name = os.path.basename(file_path)
    time_field = file_name.split("json_")[1]
    return {
        'time': time_field,
        'total_scenarios': total_scenarios,
        'passed': passed,
        'failed': failed,
        'skipped': skipped
    }

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('process_reports.log'),
        logging.StreamHandler()
    ]
)

def process_reports_to_csv(report_files, output_csv):
    fieldnames = ['time', 'total_scenarios', 'passed', 'failed', 'skipped']
    logging.info(f'Starting to process {len(report_files)} report files.')
    
    with open(output_csv, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for report_file in tqdm(report_files, desc="Processing reports", unit="file"):
            logging.debug(f'Processing file: {report_file}')
            try:
                report_data = process_report(report_file)
                writer.writerow(report_data)
                logging.debug(f'Successfully processed file: {report_file}')
            except Exception as e:
                logging.error(f'Error processing file {report_file}: {e}')
    
    logging.info(f'Finished processing reports. Output saved to {output_csv}')

def parse_data(filename):
  """
  Parses the data file and returns a pandas DataFrame.

  Args:
    filename: Path to the file containing the data.

  Returns:
    A pandas DataFrame with columns: 'timestamp', 'total_scenarios', 'passed', 'failed', 'skipped'.
  """
  data = []
  with open(filename, 'r') as f:
    for line in f:
      timestamp, total_scenarios, passed, failed, skipped = line.strip().split(',')
      data.append({
          'timestamp': pd.to_datetime(timestamp),
          'total_scenarios': int(total_scenarios),
          'passed': int(passed),
          'failed': int(failed),
          'skipped': int(skipped)
      })
  return pd.DataFrame(data)

def plot_results(df):
  """
  Plots the test results over time.

  Args:
    df: pandas DataFrame containing the test results.
  """
  plt.figure(figsize=(10, 6))

  # Plot total scenarios
  plt.plot(df['timestamp'], df['total_scenarios'], label='Total Scenarios')

  # Plot passed, failed, and skipped scenarios
  plt.plot(df['timestamp'], df['passed'], label='Passed')
  plt.plot(df['timestamp'], df['failed'], label='Failed')
  plt.plot(df['timestamp'], df['skipped'], label='Skipped')

  plt.xlabel('Timestamp')
  plt.ylabel('Number of Scenarios')
  plt.title('Test Results Over Time')
  plt.legend()
  plt.xticks(rotation=45) 
  plt.grid(True)
  plt.show()

if __name__ == "__main__":
    # List your cucumber_report.json file paths
    report_files = glob.glob('artifacts/*/artifact/cucumber-report.json*')
    output_csv = 'aggregated_report.csv'
    process_reports_to_csv(report_files, output_csv)
    print(f"Aggregated report saved to {output_csv}")
    try:
        df = parse_data(output_csv)
        plot_results(df)
    except FileNotFoundError:
        print(f"Error: File '{output_csv}' not found.")
