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

# Read artifact links from the text file
with open("artifact_links.txt", "r") as f:
  artifact_links = f.readlines()

# Remove any leading/trailing whitespace from links
artifact_links = [link.strip() for link in artifact_links]

# Download each artifact
for link in artifact_links:
  download_artifact(link)

print("Download completed!")