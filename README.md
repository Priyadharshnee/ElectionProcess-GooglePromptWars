# My First Vote – Smart Election Journey Assistant 🗳️

An AI-powered, interactive, and visually engaging web application designed to guide first-time voters in India through the election process step-by-step.

## 🚀 Overview

"My First Vote" is a full-stack platform built to empower new voters. It simplifies the complex registration and voting process through a gamified journey, provides a realistic mock EVM simulator to build confidence, and features a smart AI assistant powered by Google Gemini to answer any election-related questions instantly.

## ✨ Core Features

*   **Smart Dashboard**: Instantly check your eligibility to vote based on age and voter ID status, with dynamic "Next Action" suggestions.
*   **Gamified Journey Flow**: A beautiful step-by-step progress tracker that guides you from checking eligibility to being fully prepared for election day.
*   **Mock Voting Simulator**: An interactive Electronic Voting Machine (EVM) simulation to practice casting a vote with realistic feedback.
*   **AI Election Assistant**: A floating chat widget integrated with Google Gemini API to explain concepts (e.g., "What is EVM?", "Why should I vote?").
*   **Modern UI/UX**: Premium, minimalist design built with Tailwind CSS and Framer Motion for smooth, accessible interactions.

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Vite)
*   Tailwind CSS (Styling)
*   Framer Motion (Animations)
*   React Router (Navigation)
*   Lucide React (Icons)
*   Axios (API Requests)

**Backend:**
*   Python (Flask)
*   Google Generative AI SDK (Gemini Integration)
*   Flask-CORS

## ⚙️ Setup Instructions

Follow these steps to get the project running locally.

### Prerequisites
*   Node.js (v18+)
*   Python (3.8+)
*   A Google Gemini API Key

### 1. Clone the Repository
*(Assuming you are in the project root)*

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up Environment Variables:
   * Copy the `.env.example` file to `.env`
   * Add your Google Gemini API key: `GEMINI_API_KEY=your_key_here`
5. Run the Flask server:
   ```bash
   python app.py
   ```
   *The backend will run on `http://localhost:5000`*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`*

## 🔌 API Details

The Flask backend exposes the following endpoints:

*   `GET /api/health`: Health check endpoint.
*   `POST /api/eligibility`: Smart decision engine.
    *   **Input**: `{"age": 18, "has_voter_id": false}`
    *   **Output**: `{"status": "needs_registration", "message": "...", "next_step": "..."}`
*   `POST /api/chat`: AI Assistant endpoint.
    *   **Input**: `{"query": "What is an EVM?"}`
    *   **Output**: `{"response": "An EVM is..."}`

## 📝 Assumptions & Notes

*   **Google Maps/Sheets API**: While requested as optional, they were omitted from this MVP to focus on the core user journey, simulator, and AI assistant. The timeline dates are currently illustrative.
*   **Data Persistence**: Currently, user progress and chat history are maintained in local component state. A production version would utilize a database (like Firebase or PostgreSQL) to persist user accounts.
*   **Multi-language**: The UI is built to be clean and standard, preparing it for easy integration with libraries like `react-i18next` for Tamil/English support in the future.

---

## 🏆 Submission Links

Public GitHub Repository Link
* [Your GitHub Link Here]

Deployed Link - (Cloud run URL)
* [Your Cloud Run URL Here]

LinkedIn Post
* [Your LinkedIn Post Link Here]