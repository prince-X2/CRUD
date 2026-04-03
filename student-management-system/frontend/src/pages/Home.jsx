import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <h1>Welcome to Student Management System</h1>
        <p className="subtitle">Manage students efficiently and securely</p>

        <div className="home-content">
          <p>
            A complete student management system with Admin and Student dashboards.
            Choose your role to access the system.
          </p>

          <div className="role-description">
            <div className="role-card">
              <h3>👨‍💼 Admin Panel</h3>
              <ul>
                <li>View all students</li>
                <li>Add new students</li>
                <li>Edit student details</li>
                <li>Delete students</li>
                <li>Search students</li>
              </ul>
              <Link to="/admin/dashboard" className="role-btn admin-btn">
                Go to Admin Dashboard →
              </Link>
            </div>

            <div className="role-card">
              <h3>👨‍🎓 Student Dashboard</h3>
              <ul>
                <li>View your profile</li>
                <li>Access your details</li>
                <li>View course information</li>
              </ul>
              <Link to="/student/dashboard" className="role-btn student-btn">
                Go to Student Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
