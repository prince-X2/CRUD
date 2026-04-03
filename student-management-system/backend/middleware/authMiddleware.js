import { verifyToken } from '../utils/generateToken.js';

/**
 * Verify JWT token and attach user to request
 * Looks for token in: Authorization header "Bearer <token>"
 */
export const verifyAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.slice(7);

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach decoded user to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
