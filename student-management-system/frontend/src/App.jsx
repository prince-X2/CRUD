import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AddStudent from './pages/AddStudent';
import Students from './pages/Students';
import EditStudent from './pages/EditStudent';
import StudentDashboard from './pages/StudentDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Admin Routes - No Login Required */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/edit-student/:id" element={<EditStudent />} />

        {/* Student/Client Routes - No Login Required */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Catch-all route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;