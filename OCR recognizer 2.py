from flask import Flask, request, jsonify
from io import BytesIO
import requests
import pytesseract
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/extract_words', methods=['POST'])
def extract_words():
    # Get the image URI from the request
    image_uri = request.json['image_uri']

    # Download the image from the URI
    #response = requests.get(image_uri)

    # Load the image into a PIL Image object
    img = Image.open(image_uri)

    # Use Pytesseract to extract text from the image
    text = pytesseract.image_to_string(img)

    # Split the text into words
    words = text.split()

    # Return the list of words as a JSON response
    return jsonify({'words': words})


if __name__ == '__main__':
    app.run(debug=True)
