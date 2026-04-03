import '../styles/StudentCard.css';

export default function StudentCard({ student }) {
  if (!student) {
    return <div className="no-data">No student data available</div>;
  }

  return (
    <div className="student-card">
      <h2>{student.name}</h2>
      
      <div className="card-section">
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {student.address || 'N/A'}</p>
      </div>

      <div className="card-section">
        <h3>Academic Information</h3>
        <p><strong>Student ID:</strong> {student.studentId}</p>
        <p><strong>Course:</strong> {student.course || 'N/A'}</p>
        <p><strong>Department:</strong> {student.department || 'N/A'}</p>
        <p><strong>Year:</strong> {student.year || 'N/A'}</p>
      </div>

      {student.created_at && (
        <div className="card-section">
          <p className="creation-date">
            <strong>Registered:</strong> {new Date(student.created_at).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
