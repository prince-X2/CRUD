import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

// This page is deprecated - authentication has been removed from the application
// Users now have direct access to admin and student dashboards

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('admin'); // 'admin' or 'student'
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setCredentials({ email: '', password: '' });
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate input
      if (!credentials.email || !credentials.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      let response;

      if (role === 'admin') {
        response = await adminLogin(credentials.email, credentials.password);
      } else {
        response = await studentLogin(credentials.email, credentials.password);
      }

      // Check if login was successful
      if (response.ok || response.status === 200) {
        setSuccess(`Login successful! Redirecting...`);
        
        // Save token and user data
        saveToken(response.token);
        saveUser(response.user);

        // Redirect based on role
        setTimeout(() => {
          if (response.user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/student/dashboard');
          }
        }, 1000);
      } else {
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Student Management System</h1>
        <p className="subtitle">Login to continue</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="role-tabs">
          <button
            className={`role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => handleRoleChange('admin')}
            disabled={loading}
          >
            👨‍💼 Admin Login
          </button>
          <button
            className={`role-tab ${role === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('student')}
            disabled={loading}
          >
            👨‍🎓 Student Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">
              {role === 'admin' ? 'Email' : 'Email or Student ID'}
            </label>
            <input
              type={role === 'admin' ? 'email' : 'text'}
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder={
                role === 'admin'
                  ? 'admin@gmail.com'
                  : 'Enter email or student ID'
              }
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p><strong>Admin:</strong> admin@gmail.com / admin123</p>
          <p><strong>Student:</strong> STU001 / student123</p>
        </div>
      </div>
    </div>
  );
}
