import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAllStudents } from '../services/api';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getAllStudents();
        if (response.ok && response.data) {
          setStudentCount(response.data.length);
        } else {
          setError(response.message || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError('Error loading dashboard');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="admin-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage students and view statistics</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading dashboard...</div>
        ) : (
          <>
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Total Students</h3>
                  <p className="stat-number">{studentCount}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <h3>New Entry</h3>
                  <p>Add a new student</p>
                </div>
              </div>
            </div>

            <div className="dashboard-quick-links">
              <h2>Quick Links</h2>
              <div className="links-grid">
                <Link to="/admin/add-student" className="quick-link-btn">
                  ➕ Add New Student
                </Link>
                <Link to="/admin/students" className="quick-link-btn">
                  👁️ View All Students
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
