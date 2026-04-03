import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StudentForm from '../components/StudentForm';
import { createStudent } from '../services/api';
import '../styles/AddStudent.css';

export default function AddStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await createStudent(formData);

      if (response.ok || response.status === 201) {
        setSuccess('Student added successfully!');
        setTimeout(() => {
          navigate('/admin/students');
        }, 1500);
      } else {
        setError(response.message || 'Failed to add student');
      }
    } catch (err) {
      setError('An error occurred while adding student');
      console.error('Add student error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="admin-content">
        <div className="page-header">
          <h1>Add New Student</h1>
          <p>Fill in the form to add a new student</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-container">
          <StudentForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
      </div>
    </div>
  );
}
