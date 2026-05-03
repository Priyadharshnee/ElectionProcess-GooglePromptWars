import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes (allow frontend to communicate)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running!"}), 200

@app.route('/api/eligibility', methods=['POST'])
def check_eligibility():
    """
    Smart eligibility decision engine.
    Input JSON: { "age": number, "has_voter_id": boolean }
    """
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON payload provided"}), 400

        age = data.get('age')
        has_voter_id = data.get('has_voter_id')

        # Validation
        if age is None or not isinstance(age, (int, float)):
            return jsonify({"error": "Valid age is required"}), 400
        
        # We can handle has_voter_id as truthy/falsy
        has_voter_id = bool(has_voter_id)

        # Logic
        if age < 18:
            return jsonify({
                "status": "not_eligible",
                "message": f"You are {age} years old. You must be at least 18 to vote.",
                "next_step": "Learn about the election process while you wait."
            }), 200
            
        elif age >= 18 and not has_voter_id:
            return jsonify({
                "status": "needs_registration",
                "message": "You are of voting age, but you need a Voter ID.",
                "next_step": "Register for your Voter ID card online or at your local office."
            }), 200
            
        else: # age >= 18 and has_voter_id
            return jsonify({
                "status": "ready",
                "message": "You are registered and ready to vote!",
                "next_step": "Check your polling booth location and election date."
            }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Endpoint for the AI assistant using Google Gemini API.
    Input JSON: { "query": "string" }
    """
    try:
        if not GEMINI_API_KEY:
            return jsonify({
                "error": "Gemini API key is missing. Please set it in .env file.",
                "response": "I'm sorry, my AI brain is currently disconnected (API Key missing)."
            }), 503

        data = request.json
        if not data or 'query' not in data:
            return jsonify({"error": "Query is required"}), 400

        user_query = data['query']

        # Initialize the model (using gemini-pro for text)
        model = genai.GenerativeModel('gemini-pro')
        
        # System prompt equivalent for contextualizing Gemini
        prompt = f"""
        You are 'My First Vote Assistant', an expert and friendly guide for first-time voters in India. 
        Explain election concepts simply, concisely, and encouragingly. Keep answers relatively short.
        
        User Query: {user_query}
        """

        response = model.generate_content(prompt)
        
        return jsonify({
            "response": response.text
        }), 200

    except Exception as e:
        # Check for specific quota or auth errors if needed
        return jsonify({
            "error": str(e),
            "response": "An error occurred while connecting to the AI assistant."
        }), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
