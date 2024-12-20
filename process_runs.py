import requests

def download_artifact(url):
  """
  Downloads an artifact from the given URL.

  Args:
      url (str): The URL of the artifact to download.
  """
  filename = url.split("/")[-1]  # Extract filename from URL
  response = requests.get(url, allow_redirects=True)
  if response.status_code == 200:
    with open(filename, 'wb') as f:
      f.write(response.content)
      print(f"Downloaded artifact: {filename}")
  else:
    print(f"Error downloading artifact: {url} (status code: {response.status_code})")

def process_artifact_link(link):
  """
  Checks total_count and downloads artifact if present.

  Args:
      link (str): The URL of the artifact details API endpoint.
  """
  response = requests.get(link)
  if response.status_code == 200:
    data = response.json()
    if data["total_count"] > 0:
      artifact_url = data["artifacts"][0]["archive_download_url"]
      download_artifact(artifact_url)
  else:
    print(f"Error getting artifact details: {link} (status code: {response.status_code})")

# Read artifact links from the text file
with open("artifact_urls.txt", "r") as f:
  artifact_links = f.readlines()

# Remove any leading/trailing whitespace from links
artifact_links = [link.strip() for link in artifact_links]

# Process each artifact link
for link in artifact_links:
  process_artifact_link(link)

print("Download completed!")