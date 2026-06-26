# HR Employee Management System

A full-stack web application built during my internship at Nava Software Solutions.
It enables HR to manage employee accounts with secure authentication and role-based access control.

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML5, CSS3
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## ✨ Features

- HR Signup and Login with JWT authentication
- HR can create, view, update, and delete employee accounts
- Employee login with email and password
- Employees can fill and update their profile details
- HR dashboard to manage all employee records
- Role-based access control (HR vs Employee)
- 50+ employee records supported
- Sub-200ms average API response times
- RESTful API design with 10+ endpoints

## 📁 Project Structure

hr-employee-login-system/
├── backend/
│   ├── main.py        # All API routes and business logic
│   ├── database.py    # MongoDB connection and collections
│   └── requirements.txt
├── frontend/         # React.js frontend
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # HR and Employee pages
│   │   └── App.js        # Main app with routing
│   └── package.json

## 🚀 Getting Started

### Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend Setup
cd frontend
npm install
npm run dev

## 🔐 How It Works

1. HR signs up and logs in securely
2. HR creates employee accounts with basic details
3. Employee logs in using email and password
4. Employee fills in their complete profile
5. HR views and manages all employee records from the dashboard

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /data | HR Registration |
| POST | /comparision | HR and Employee Login |
| POST | /submitting | Create Employee Account |
| GET | /users | Get All Employees |
| POST | /submit-profile | Employee Profile Submission |
| GET | /view-profile | View Employee Profiles |
| POST | /upload | Upload Document |
| GET | /documents | Get All Documents |
| GET | /documents/{doc_id} | View Specific Document |
| POST | /comparisionpass | Forgot Password |


## 👨‍💻 Developer

**Yaswanth Muniswar Perugu**
- LinkedIn: [linkedin.com/in/yaswanthmuniswar](https://www.linkedin.com/in/yaswanth-muniswar-perugu-36489a304/)
- GitHub: [github.com/yaswanth-muniswar](https://github.com/PeruguYaswanth)
