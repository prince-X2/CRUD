import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentCard from '../components/StudentCard';
import { getAllStudents } from '../services/api';
import '../styles/StudentDashboard.css';

export default function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getAllStudents();

        if (response.ok && response.data) {
          setStudents(response.data);
          if (response.data.length > 0) {
            setSelectedStudent(response.data[0]);
          }
        } else {
          setError(response.message || 'Failed to load students');
        }
      } catch (err) {
        setError('Error loading students');
        console.error('Student dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>Student Profiles</h1>
        <p>View student information</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading students...</div>
      ) : (
        <div className="student-dashboard-container">
          <div className="students-list">
            <h3>All Students</h3>
            {students.length === 0 ? (
              <p className="no-students">No students found</p>
            ) : (
              <ul className="student-list-items">
                {students.map(student => (
                  <li key={student.id}>
                    <button
                      className={`student-list-btn ${selectedStudent?.id === student.id ? 'active' : ''}`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="list-item-info">
                        <div className="student-name">{student.name}</div>
                        <div className="student-id">{student.studentId}</div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="students-details">
            {selectedStudent ? (
              <>
                <StudentCard student={selectedStudent} />
                <Link to="/admin/students" className="back-to-admin">
                  ← Back to Admin Panel
                </Link>
              </>
            ) : (
              <div className="no-selected">Select a student to view details</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
