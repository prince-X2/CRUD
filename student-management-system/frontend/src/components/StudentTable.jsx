import { Link } from 'react-router-dom';
import '../styles/StudentTable.css';

export default function StudentTable({ students, onDelete = null }) {
  const handleDelete = (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student.id);
    }
  };

  if (!students || students.length === 0) {
    return <div className="no-students">No students found</div>;
  }

  return (
    <div className="table-container">
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Student ID</th>
            <th>Course</th>
            <th>Department</th>
            <th>Year</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.studentId}</td>
              <td>{student.course}</td>
              <td>{student.department}</td>
              <td>{student.year}</td>
              <td>{student.phone}</td>
              <td className="actions">
                <Link to={`/admin/edit-student/${student.id}`} className="edit-btn">
                  Edit
                </Link>
                {onDelete && (
                  <button 
                    onClick={() => handleDelete(student)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
