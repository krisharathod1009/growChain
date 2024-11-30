# -*- coding: utf-8 -*-
from flask import Flask, send_file
import requests
import json
from g4f.client import Client
from g4f.Provider.GeminiPro import GeminiPro

app = Flask(__name__)

# Constants
IMAGE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmcINYWj31IYnFDOA4ookR9Unb-yWYMs5XrA&s"
IMAGE_FILE = "downloaded_image.jpg"
JSON_FILE = "crop.json"
API_KEY = "AIzaSyDptjvhpE4lYnD0ln5NbpZ74L8DvT9Kfp8"


def download_image(url):
    """Download image from the specified URL."""
    response = requests.get(url)
    if response.status_code == 200:
        with open(IMAGE_FILE, "wb") as file:
            file.write(response.content)
        print("Image downloaded successfully!")
    else:
        print("Failed to download image. Status code:", response.status_code)


def get_crop_info():
    """Get crop information using the GeminiPro API."""
    client = Client(api_key=API_KEY, provider=GeminiPro)
    with open(IMAGE_FILE, "rb") as image_file:
        response = client.chat.completions.create(
            model="gemini-1.5-flash",
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Give me info about the type of Corp there is in the image & the amount of moisture in the soil "
                        "if the according to corp there is enogh hydration and is the pestisite good enough according to "
                        "quality of corp. I WANT CORP TYPE, IS THERE ENOGH HYDRATION, AND IS THE PESTISIE GOOD ENOUGH, "
                        "IN JSON FORMAT ONLY JASON PART NO OTHER FORMATIONG LIKE CODE BLOCK AND ALL 4 FIELD DESCRIPTION "
                        "IN WHICH ALL THE THINGS AS IT IS AND CORPTYPE FIELD then HYDRATION FIELD NUMERIC DATA then I want two more field one that says Time: Time Left to harvest in DAYS  & is CROP CUT OR NOT True or false ACURATE ANSWERS ONLY"
                        "QUALITY FIELD WITH NUMERIC DATA NUMERIC DATA IN BETWEEN 0 to 100 NO 'CODE BLOCK THIS IS NOT AN WEB BROWSER,NO /n"
                    ),
                }
            ],
            image=open("downloaded_image.jpg", "rb"),
        )
    return response.choices[0].message.content


def save_to_json(data):
    """Save data to a JSON file."""
    with open(JSON_FILE, "w") as json_file:
        json.dump(data, json_file, indent=4)
    print(f"Data has been written to '{JSON_FILE}'")


@app.route("/crop")
def send_json():
    """Send the crop JSON file."""
    return send_file(JSON_FILE, download_name="corp.json")


if __name__ == "__main__":
    download_image(IMAGE_URL)
    crop_info = get_crop_info()
    save_to_json(crop_info)
    app.run(debug=True, port=5000)
