import json
import requests
import zipfile

def download_and_process_artifacts(workflow_id, artifact_name):
    # Authenticate to GitHub API (replace with your token)
    token = "YOUR_PERSONAL_ACCESS_TOKEN"
    headers = {"Authorization": f"Bearer {token}"}

    # Get artifact download URL
    url = f"https://api.github.com/repos/AISolutionsMaster/OrangeProject/actions/runs/{workflow_id}/artifacts/{artifact_name}/zip"
    response = requests.get(url, headers=headers)
    response.raise_for_status()

    # Download the artifact ZIP file
    with open("artifact.zip", "wb") as f:
        f.write(response.content)

    # Extract the artifact
    with zipfile.ZipFile("artifact.zip", 'r') as zip_ref:
        zip_ref.extractall()

    # Process the artifact (example: processing a JSON file)
    with open("extracted_artifact.json", "r") as f:
        data = json.load(f)
        # Process the JSON data here
        print(data)

with open('previous_runs.json', 'r') as f:
  runs = json.load(f)

for run in runs:
  workflow_id = run['id']
  # Filter runs based on specific criteria
  if is_relevant_run(run):
    # Download and process artifacts from the run
    download_and_process_artifacts(workflow_id, 'artifact_name')