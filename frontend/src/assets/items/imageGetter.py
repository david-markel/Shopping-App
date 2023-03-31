import json
import os
import re
import requests
import argparse
from googleapiclient.discovery import build


# Replace with your own API key and custom search engine ID
API_KEY = 'AIzaSyBqTZBlRm2oo0oeSGucqBU9rfxm_yKSkQM'
CSE_ID = '9474cccd5b9324cef'

# PEXELS_API_KEY = "YOUR_PEXELS_API_KEY"

parser = argparse.ArgumentParser(
    description="Download images for items in a JSON file.")
parser.add_argument("json_file", help="Path to the input JSON file.")
args = parser.parse_args()

# Load your items from the specified JSON file
with open(args.json_file, "r") as f:
    items_data = json.load(f)

# Get the key name based on the JSON file name
json_name = os.path.splitext(os.path.basename(args.json_file))[0]
items = items_data[json_name]

# Create a subdirectory in itemImages based on the JSON file name
image_folder = os.path.join("itemImages", json_name)
os.makedirs(image_folder, exist_ok=True)


def search_image(query, api_key, cse_id, num_results=1):
    service = build("customsearch", "v1", developerKey=api_key)
    result = service.cse().list(q=query, cx=cse_id,
                                searchType="image", num=num_results).execute()
    return result['items'][0]['link']


# def search_image(query, api_key):
#     headers = {"Authorization": api_key}
#     params = {"query": query, "per_page": 1,
#               "page": 1, "orientation": "landscape"}
#     response = requests.get(
#         "https://api.pexels.com/v1/search", headers=headers, params=params)
#     response.raise_for_status()
#     result = response.json()
#     return result['photos'][0]['src']['medium']


def download_image(url, save_path):
    response = requests.get(url, stream=True)
    response.raise_for_status()

    with open(save_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)


def clean_title(title):
    # Remove special characters and replace spaces with underscores
    cleaned_title = re.sub(r"[^\w\s]", "", title)
    return cleaned_title.replace(" ", "_")


for item in items:
    try:
        print(f"Fetching image for: {item['title']}")

        # Fetch the image URL from Google Search Images API
        image_url = search_image(item["title"], API_KEY, CSE_ID)
        print(f"Image URL: {image_url}")

        # Download the image and save it to your desired location
        cleaned_title = clean_title(item["title"])
        save_path = os.path.join(image_folder, f"{cleaned_title}.jpg")
        download_image(image_url, save_path)
        print(f"Image saved as: {save_path}")

        # Update the imageSrc in the item
        item["imageSrc"] = save_path

    except Exception as e:
        print(f"Error fetching image for {item['title']}: {e}")
        continue

# Save the updated JSON object to the JSON file
with open(args.json_file, "w") as f:
    json.dump(items_data, f, indent=4)

print("All images fetched and saved.")
