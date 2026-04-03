# Student Management System

A complete full-stack web application for managing student records with role-based authentication (Admin and Student roles).

## 📋 Project Overview

The Student Management System is a modern web application that allows:
- **Admins** to manage all student records (CRUD operations)
- **Students** to view only their own profile information
- Secure authentication using JWT and bcryptjs

## ✨ Features

### Admin Features
- ✅ Admin login with email and password
- ✅ Dashboard with student statistics
- ✅ Add new students
- ✅ View all students in a table
- ✅ Edit student details
- ✅ Delete students
- ✅ Search students by name or student ID

### Student Features
- ✅ Student login with email or student ID
- ✅ View only their own profile
- ✅ View course and academic information
- ✅ Cannot access admin pages

## 🛠️ Tech Stack

### Frontend
- **React.js** 18+ - UI framework
- **React Router DOM** 6+ - Client-side routing
- **Fetch API** - HTTP requests
- **Plain CSS** - Styling
- **HTML5** - Markup

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Cookie-parser** - Cookie handling

## 📁 Project Structure

```
student-management-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── StudentTable.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AddStudent.jsx
│   │   │   ├── Students.jsx
│   │   │   ├── EditStudent.jsx
│   │   │   └── StudentDashboard.jsx
│   │   │
│   │   ├── services/            # API utilities
│   │   │   └── api.js
│   │   │
│   │   ├── utils/               # Helper utilities
│   │   │   └── auth.js
│   │   │
│   │   ├── styles/              # CSS files
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js                # Database connection
│   │
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   └── studentController.js
│   │
│   ├── middleware/              # Express middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   │
│   ├── utils/                   # Utility functions
│   │   └── generateToken.js
│   │
│   ├── sql/                     # Database files
│   │   ├── schema.sql
│   │   └── seed.sql
│   │
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js
│
└── README.md                    # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Step 1: Clone/Extract the Project

```bash
cd student-management-system
```

### Step 2: Setup Database

1. Open MySQL command line or MySQL Workbench
2. Run the schema and seed files:

```sql
-- Execute schema.sql first
source backend/sql/schema.sql;

-- Then execute seed.sql
source backend/sql/seed.sql;
```

Or import the files through your MySQL GUI tool.

### Step 3: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# The .env file is already configured:
# - PORT=5000
# - DB_HOST=localhost
# - DB_USER=root
# - DB_PASSWORD=
# - DB_NAME=student_management
# - JWT_SECRET=your_super_secret_key_change_this_in_production

# Start the backend server
npm run dev
# or
npm start

# Server will run on http://localhost:5000
```

### Step 4: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Frontend will run on http://localhost:5173
```

## 📝 Default Login Credentials

### Admin Account
- **Email:** admin@gmail.com
- **Password:** admin123

### Sample Student Accounts
All sample students have the password: `student123`

| Student ID | Email | Name |
|-----------|-------|------|
| STU001 | john@example.com | John Doe |
| STU002 | jane@example.com | Jane Smith |
| STU003 | mike@example.com | Mike Johnson |

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /admin-login` - Admin login
- `POST /student-login` - Student login
- `POST /logout` - Logout (client-side token removal)
- `GET /me` - Get current user info (requires auth)

### Student Routes (`/api/students`)
- `GET /` - Get all students (admin only)
- `GET /?search=name` - Search students (admin only)
- `POST /` - Create new student (admin only)
- `GET /:id` - Get student by ID (admin only)
- `PUT /:id` - Update student (admin only)
- `DELETE /:id` - Delete student (admin only)

## 🔐 Authentication & Authorization

- **JWT Tokens:** Tokens are stored in localStorage with 1-day expiry
- **Protected Routes:** Admin and student pages require authentication
- **Role-based Access:** Only users with appropriate roles can access certain features
- **Password Hashing:** All passwords are hashed with bcryptjs before storage

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🐛 Common Errors & Fixes

### "Cannot GET /api/auth/..."
**Fix:** Make sure the backend server is running on port 5000

### "Database connection failed"
**Fix:** 
- Check MySQL is running
- Verify DB credentials in `.env`
- Make sure database is created with `schema.sql`

### "Invalid token" on login
**Fix:**
- Check if token is being stored in localStorage
- Clear browser cache/localStorage and try again
- Ensure JWT_SECRET in .env is set

### "404 Not Found" on page refresh
**Fix:**
- React Router is configured, but ensure all requests go to `index.html` in Vite
- Check vite.config.js has proper configuration

### CORS Error
**Fix:**
- Ensure frontend URL matches `CLIENT_URL` in backend `.env`
- Default is `http://localhost:5173`

## 📚 Database Schema

### Admins Table
```sql
id (INT, PRIMARY KEY)
name (VARCHAR)
email (VARCHAR, UNIQUE)
password (VARCHAR, hashed)
role (VARCHAR, DEFAULT 'admin')
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Students Table
```sql
id (INT, PRIMARY KEY)
name (VARCHAR)
email (VARCHAR, UNIQUE)
password (VARCHAR, hashed)
studentId (VARCHAR, UNIQUE)
phone (VARCHAR)
course (VARCHAR)
department (VARCHAR)
year (VARCHAR)
address (TEXT)
role (VARCHAR, DEFAULT 'student')
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## 🔄 Frontend Data Flow

1. **Login** → Save token + user to localStorage
2. **Protected Routes** → Check auth & role
3. **API Requests** → Auto-include JWT token
4. **401 Response** → Auto clear auth & redirect to login
5. **Logout** → Clear localStorage & redirect

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (salt rounds: 10)
- ✅ JWT authentication with 1-day expiry
- ✅ Role-based access control
- ✅ CORS protection
- ✅ Input validation
- ✅ Never return passwords in API responses

## 📞 Support

For issues or questions, check:
1. Browser console for errors (F12)
2. Backend logs in terminal
3. Verify database with: `SELECT COUNT(*) FROM students;`
4. Check network tab in browser DevTools

## 📄 License

This project is open source and available for educational purposes.

---

**Happy coding!** 🎉
