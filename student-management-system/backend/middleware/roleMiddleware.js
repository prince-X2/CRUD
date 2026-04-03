/**
 * Admin only middleware
 * Ensures user is authenticated and has 'admin' role
 */
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can access this resource' });
  }

  next();
};

/**
 * Student only middleware
 * Ensures user is authenticated and has 'student' role
 */
export const studentOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can access this resource' });
  }

  next();
};

/**
 * Authenticated only middleware
 * Ensures user is authenticated (any role)
 */
export const authenticatedOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  next();
};
