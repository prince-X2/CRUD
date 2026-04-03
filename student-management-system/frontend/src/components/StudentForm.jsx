import { useState } from 'react';
import '../styles/StudentForm.css';

export default function StudentForm({ initialData = null, onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    password: '',
    studentId: '',
    phone: '',
    course: '',
    department: '',
    year: '',
    address: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.studentId) {
      setError('Name, email, and student ID are required');
      return;
    }

    if (!initialData && !formData.password) {
      setError('Password is required for new students');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
      </div>

      {!initialData && (
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>
      )}

      {initialData && (
        <div className="form-group">
          <label htmlFor="password">New Password (leave blank to keep existing)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password (optional)"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="studentId">Student ID *</label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="e.g., STU001"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
      </div>

      <div className="form-group">
        <label htmlFor="course">Course</label>
        <input
          type="text"
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="e.g., B.Tech"
        />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="e.g., Computer Science"
        />
      </div>

      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input
          type="text"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="e.g., 3rd Year"
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter address"
          rows="3"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Saving...' : initialData ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
}
