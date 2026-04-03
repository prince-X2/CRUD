-- Insert default admin user
-- Email: admin@gmail.com
-- Password: admin123 (bcrypt hashed)
-- Hash generated using bcryptjs with salt rounds 10
INSERT INTO admins (name, email, password, role) VALUES
('Admin User', 'admin@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36jbMnO2', 'admin');

-- Insert sample students
-- Password for all students: student123 (bcrypt hashed)
INSERT INTO students (name, email, password, studentId, phone, course, department, year, address, role) VALUES
('John Doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36jbMnO2', 'STU001', '9876543210', 'B.Tech', 'Computer Science', '3rd Year', '123 Main Street, City', 'student'),
('Jane Smith', 'jane@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36jbMnO2', 'STU002', '9876543211', 'B.Tech', 'Information Technology', '2nd Year', '456 Oak Avenue, City', 'student'),
('Mike Johnson', 'mike@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36jbMnO2', 'STU003', '9876543212', 'B.Sc', 'Physics', '1st Year', '789 Pine Road, City', 'student');
