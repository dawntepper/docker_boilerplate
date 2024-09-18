
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import logging

load_dotenv()

app = Flask(__name__)
CORS(app)

# Setup logging
logging.basicConfig(level=logging.INFO)

@app.route('/', methods=['GET'])
def home():
    app.logger.info('Home endpoint accessed')
    return "Welcome to the Read Rover AI Service!"

@app.route('/categorize', methods=['POST'])
def categorize():
    app.logger.info('Categorize endpoint accessed')
    try:
        data = request.json
        if not data or 'text' not in data:
            raise ValueError("Missing 'text' in request body")
        
        text = data['text']
        
        # TODO: Implement actual categorization logic
        category = "Technology"  # Placeholder
        
        app.logger.info(f"Categorized text: '{text[:50]}...' as {category}")
        return jsonify({'category': category})
    except ValueError as ve:
        app.logger.error(f"ValueError in categorize: {str(ve)}")
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        app.logger.error(f"Unexpected error in categorize: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.logger.info(f"Starting server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)