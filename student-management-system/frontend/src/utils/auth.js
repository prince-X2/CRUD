/**
 * Auth utility - Handle tokens and user data in localStorage
 */

// ===== TOKEN MANAGEMENT =====

/**
 * Save JWT token
 */
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Get JWT token
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Remove JWT token
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

// ===== USER MANAGEMENT =====

/**
 * Save user data
 */
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get user data
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Remove user data
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};

// ===== AUTH STATE =====

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Get user role (admin or student)
 */
export const getUserRole = () => {
  const user = getUser();
  return user ? user.role : null;
};

/**
 * Logout - Clear all auth data
 */
export const logout = () => {
  removeToken();
  removeUser();
};
