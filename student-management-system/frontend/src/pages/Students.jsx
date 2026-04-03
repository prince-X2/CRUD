import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StudentTable from '../components/StudentTable';
import { getAllStudents, deleteStudent } from '../services/api';
import '../styles/Students.css';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (search = '') => {
    setLoading(true);
    setError('');

    try {
      const response = await getAllStudents(search);

      if (response.ok && response.data) {
        setStudents(response.data);
      } else {
        setError(response.message || 'Failed to load students');
      }
    } catch (err) {
      setError('Error loading students');
      console.error('Fetch students error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      fetchStudents();
    } else {
      fetchStudents(value);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    setError('');

    try {
      const response = await deleteStudent(id);

      if (response.ok || response.status === 200) {
        setSuccess('Student deleted successfully!');
        // Remove from table
        setStudents(students.filter(s => s.id !== id));
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(response.message || 'Failed to delete student');
      }
    } catch (err) {
      setError('Error deleting student');
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="admin-content">
        <div className="page-header">
          <h1>All Students</h1>
          <p>View and manage all student records</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or student ID..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading">Loading students...</div>
        ) : students.length === 0 ? (
          <div className="no-students">
            <p>No students found</p>
          </div>
        ) : (
          <StudentTable 
            students={students} 
            onDelete={deleting ? null : handleDelete}
          />
        )}
      </div>
    </div>
  );
}
