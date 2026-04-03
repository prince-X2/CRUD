import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StudentForm from '../components/StudentForm';
import { getStudentById, updateStudent } from '../services/api';
import '../styles/EditStudent.css';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getStudentById(id);

        if (response.ok && response.data) {
          setStudent(response.data);
        } else {
          setError(response.message || 'Failed to load student');
        }
      } catch (err) {
        setError('Error loading student');
        console.error('Fetch student error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Remove password field if empty
      const { password, ...dataWithoutPassword } = formData;
      const updateData = password ? formData : dataWithoutPassword;

      const response = await updateStudent(id, updateData);

      if (response.ok || response.status === 200) {
        setSuccess('Student updated successfully!');
        setTimeout(() => {
          navigate('/admin/students');
        }, 1500);
      } else {
        setError(response.message || 'Failed to update student');
      }
    } catch (err) {
      setError('An error occurred while updating student');
      console.error('Update student error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="admin-content">
        <div className="page-header">
          <h1>Edit Student</h1>
          <p>Update student information</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {loading ? (
          <div className="loading">Loading student...</div>
        ) : student ? (
          <div className="form-container">
            <StudentForm 
              initialData={student}
              onSubmit={handleSubmit} 
              isLoading={submitting}
            />
          </div>
        ) : (
          <div className="error-message">Student not found</div>
        )}
      </div>
    </div>
  );
}
