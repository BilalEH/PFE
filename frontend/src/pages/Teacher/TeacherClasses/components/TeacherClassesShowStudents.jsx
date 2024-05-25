import React from 'react';

function TeacherClassesShowStudents({ students }) {
  return (
    <div>
      <h3>Students in Selected Class</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.user_id.firstName} {student.user_id.lastName} - {student.user_id.role}  {student.user_id.cin}   {student.user_id.phone}   {student.user_id.data}  
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherClassesShowStudents;
