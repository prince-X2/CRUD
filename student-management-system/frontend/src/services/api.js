// API service for all frontend requests
// No authentication required (demo mode)

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Helper function to make fetch requests
 */
const apiCall = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();

    return {
      status: response.status,
      ok: response.ok,
      ...data
    };
  } catch (error) {
    console.error('API error:', error);
    return {
      ok: false,
      message: 'Network error. Please check your connection.',
      error
    };
  }
};

// ===== STUDENT APIs =====

/**
 * Get All Students (Admin only)
 */
export const getAllStudents = (search = '') => {
  let url = `${API_BASE_URL}/students`;
  if (search) {
    url += `?search=${encodeURIComponent(search)}`;
  }
  return apiCall(url, { method: 'GET' });
};

/**
 * Get Single Student (Admin only)
 */
export const getStudentById = (id) => {
  return apiCall(`${API_BASE_URL}/students/${id}`, {
    method: 'GET'
  });
};

/**
 * Create New Student (Admin only)
 */
export const createStudent = (studentData) => {
  return apiCall(`${API_BASE_URL}/students`, {
    method: 'POST',
    body: JSON.stringify(studentData)
  });
};

/**
 * Update Student (Admin only)
 */
export const updateStudent = (id, studentData) => {
  return apiCall(`${API_BASE_URL}/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData)
  });
};

/**
 * Delete Student (Admin only)
 */
export const deleteStudent = (id) => {
  return apiCall(`${API_BASE_URL}/students/${id}`, {
    method: 'DELETE'
  });
};
