# Student Management System - Setup & Configuration Guide

## Current Status ✅
Your Student Management System has been successfully configured for **demo mode** (no login required).

### Running Services
- **Frontend**: http://localhost:5174 (React + Vite)
- **Backend**: http://localhost:5000 (Node.js + Express)

## ✅ Completed Configuration

### Frontend Changes (No Login Required)
- ✓ Removed all authentication routes and login page
- ✓ Direct access to Admin Dashboard: `/admin/dashboard`
- ✓ Direct access to Student Dashboard: `/student/dashboard`
- ✓ All navigation links direct to dashboards without login
- ✓ Simplified API service (removed token handling)

### Backend Configuration
- ✓ All student API routes are public (no authentication middleware)
- ✓ Student routes: GET, POST, PUT, DELETE all accessible without login
- ✓ Removed authentication checks from middleware

### Key Files Modified
**Frontend:**
- `src/App.jsx` - Pure routing without ProtectedRoute
- `src/components/Navbar.jsx` - Simplified navigation
- `src/pages/Home.jsx` - Direct dashboard links
- `src/services/api.js` - No token management

**Backend:**
- `routes/studentRoutes.js` - All routes public
- `controllers/studentController.js` - No auth checks

## ⚠️ IMPORTANT: Database Setup Required

The API endpoints work on the backend, but to see actual data you need to set up MySQL:

### MySQL Database Setup Instructions

1. **Open MySQL Command Prompt or MySQL Workbench**

2. **Create the database:**
```sql
CREATE DATABASE student_management;
USE student_management;
```

3. **Create tables - Run these SQL commands:**

```sql
-- Admins table
CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  studentId VARCHAR(50) UNIQUE NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phoneNumber VARCHAR(20),
  address VARCHAR(500),
  enrollmentDate DATE,
  major VARCHAR(100),
  gpa DECIMAL(3, 2),
  status VARCHAR(50) DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

4. **Verify connection** - Check your `.env` file in backend folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=student_management
DB_PORT=3306
```

## 🚀 How to Use the Application

### Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Application

1. Open browser: **http://localhost:5174**

2. **From Home Page, you can:**
   - Click "Admin Panel" → Access Admin Dashboard
   - Click "Student Panel" → Access Student Dashboard

### Admin Dashboard Features
- View all students in a table
- Add new student (click "Add Student")
- Edit student details (click "Edit")
- Delete students (click "Delete")
- View student statistics

### Student Dashboard Features
- View list of all students
- Click any student to see their details
- No login required

## 📂 Project Structure

```
student-management-system/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service (api.js)
│   │   ├── styles/         # CSS files
│   │   ├── utils/          # Auth utilities (deprecated)
│   │   └── App.jsx         # Main routing
│   └── package.json
│
└── backend/                 # Node.js + Express server
    ├── routes/             # API routes
    ├── controllers/        # Route handlers
    ├── middleware/         # Middleware (deprecated auth)
    ├── config/            # Database config
    ├── sql/               # Database schema
    ├── server.js          # Express server
    └── package.json
```

## 🔧 API Endpoints (All Public)

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get single student
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

**Example Request:**
```javascript
// Get all students
fetch('http://localhost:5000/api/students')
  .then(res => res.json())
  .then(data => console.log(data))
```

## 🛠️ Troubleshooting

### "Server error retrieving students"
- **Cause**: MySQL database not running or not configured
- **Solution**: 
  1. Start your MySQL server
  2. Create database and tables (see Database Setup above)
  3. Verify .env file has correct DB credentials

### Frontend not loading
- **Cause**: Vite dev server not running
- **Solution**: Run `npm run dev` in frontend directory

### Backend not responding
- **Cause**: Node.js server crashed
- **Solution**: Check terminal for errors, run `npm start` again

### Port already in use
- **Backend (5000)**: `lsof -i :5000` or adjust .env PORT variable
- **Frontend (5174)**: `lsof -i :5174` or Vite will auto-increment port

## 📋 Differences from Original Setup

This version has been modified from the standard auth-based system:

| Feature | Original | Current (Demo) |
|---------|----------|----------------|
| Login Page | Yes (by email/password) | No |
| JWT Authentication | Yes | Removed |
| Protected Routes | Yes | No |
| Admin Access | Requires login | Direct access |
| Student Access | Requires login | Direct access |
| Token Management | Yes (localStorage) | No |

## ⚡ Next Steps

1. **Set up MySQL database** (critical for app to work)
2. **Start both servers** (backend on 5000, frontend on 5174)
3. **Test the application** by visiting http://localhost:5174
4. **Create sample data** through the Admin Dialog or use seed data

## 📝 Notes

- No authentication is required - anyone with access to the app can perform admin actions
- This is a **demo/development configuration** - not suitable for production
- To re-enable authentication, the original auth middleware and protected routes can be restored
- All API endpoints are public and accessible without tokens

---

**For Questions or Issues:**
- Check that both servers are running
- Verify MySQL database is created and connected
- Check browser console (F12) for errors
- Check terminal output for server errors
