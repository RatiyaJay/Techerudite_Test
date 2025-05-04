# Techerudite_Test

# Auth Frontend

A full-stack authentication system with frontend (React + Bootstrap) and backend (Node.js + Express + MySQL) integration.

## 🔗 Project Structure

- **Frontend:** React (Bootstrap UI)
- **Backend:** Node.js, Express, MySQL
- **Features:**
  - Admin login with validation
  - Customer registration with verification
  - Email and code verification flow
  - Form validation and loading indicators

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/auth-frontend.git
cd auth-frontend

2. Install Backend Dependencies
cd backend
npm install

3. Start the Backend Server
node index.js


4. Install Frontend Dependencies
Open another terminal tab/window:
cd frontend
npm install


5. Start the Frontend App
npm start

The frontend will run on http://localhost:3000 by default.

🛠️ Notes
Use .env files for sensitive config (DB credentials, tokens).

Backend runs on port 5000 (or your configured port).

API endpoints are prefixed like /auth/... and integrated in the frontend using Axios.

🧪 Form Features
All inputs are trimmed before submission.

Error feedback shown using Bootstrap's is-invalid class.

Includes proper loading states and validation messages.





