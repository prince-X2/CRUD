import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 Student Management
        </Link>
        
        <div className="navbar-content">
          <Link to="/admin/dashboard" className="nav-link">
            👨‍💼 Admin
          </Link>
          <Link to="/student/dashboard" className="nav-link">
            👨‍🎓 Student
          </Link>
        </div>
      </div>
    </nav>
  );
}
