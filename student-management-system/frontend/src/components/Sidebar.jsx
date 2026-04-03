import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard" className="sidebar-link">
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/students" className="sidebar-link">
            👥 View Students
          </Link>
        </li>
        <li>
          <Link to="/admin/add-student" className="sidebar-link">
            ➕ Add Student
          </Link>
        </li>
      </ul>
    </aside>
  );
}
