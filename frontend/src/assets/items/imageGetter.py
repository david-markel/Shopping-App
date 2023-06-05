import json
import os
import re
import time
import requests
import argparse
from googleapiclient.discovery import build


# Replace with your own API key and custom search engine ID
API_KEY = "AIzaSyBqTZBlRm2oo0oeSGucqBU9rfxm_yKSkQM"
CSE_ID = "9474cccd5b9324cef"

excluded_sources = set()  # Keep track of excluded sources

parser = argparse.ArgumentParser(
    description="Download images for items in a JSON file."
)
parser.add_argument("json_file", help="Path to the input JSON file.")
args = parser.parse_args()

with open(args.json_file, "r") as f:
    items = json.load(f)

image_folder = os.path.join(
    "itemImages", os.path.splitext(os.path.basename(args.json_file))[0]
)
os.makedirs(image_folder, exist_ok=True)


def search_image(query, api_key, cse_id, excluded_sources, num_results=1):
    service = build("customsearch", "v1", developerKey=api_key)

    # Exclude problematic sources from search
    cx = cse_id + ":" + "-".join(excluded_sources)

    result = (
        service.cse()
        .list(q=query, cx=cx, searchType="image", num=num_results)
        .execute()
    )
    return result["items"][0]["link"]


def download_image(url, save_path):
    response = requests.get(url, stream=True, timeout=10)
    response.raise_for_status()
    with open(save_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)


def clean_title(title):
    cleaned_title = re.sub(r"[^\w\s]", "", title)
    return cleaned_title.replace(" ", "_")


max_retry = 3
retry_delay = 10  # seconds

try:
    for item in items:
        try:
            image_src = item["imageSrc"]
            cleaned_title = clean_title(item["title"])
            save_path = os.path.join(image_folder, f"{cleaned_title}.jpg")

            if not os.path.exists(save_path):
                print(f"Fetching image for: {item['title']}")

                # Retry mechanism
                for retry in range(max_retry):
                    try:
                        image_url = search_image(
                            item["title"], API_KEY, CSE_ID, excluded_sources
                        )
                        break  # Break the loop if successful
                    except Exception as e:
                        excluded_sources.add(CSE_ID)  # Exclude the problematic source
                        print(
                            f"Error fetching image for {item['title']} from Google Images (Retry {retry+1}/{max_retry}): {e}"
                        )
                        if retry < max_retry - 1:
                            print(f"Retrying in {retry_delay} seconds...")
                            time.sleep(retry_delay)

                if not image_url:
                    print(
                        f"Failed to fetch image for {item['title']} from Google Images. Skipping..."
                    )
                    continue

                print(f"Image URL: {image_url}")

                # Retry mechanism
                for retry in range(max_retry):
                    try:
                        download_image(image_url, save_path)
                        break  # Break the loop if successful
                    except Exception as e:
                        print(
                            f"Error downloading image for {item['title']} (Retry {retry+1}/{max_retry}): {e}"
                        )
                        if retry < max_retry - 1:
                            print(f"Retrying in {retry_delay} seconds...")
                            time.sleep(retry_delay)

                if not os.path.exists(save_path):
                    print(f"Failed to download image for {item['title']}. Skipping...")
                    continue

                print(f"Image saved as: {save_path}")

            item["imageSrc"] = save_path

        except Exception as e:
            print(f"Error processing item {item['title']}: {e}")
            continue

except KeyboardInterrupt:
    print("\nProcess interrupted by user.")

with open(args.json_file, "w") as f:
    json.dump(items, f, indent=4)

print("All images fetched and saved.")
