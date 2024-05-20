import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClass, GetTeachers, GetCourses, AdminGetClasses } from '../../../api/adminsStore/adminStore';
import { toast } from 'react-toastify';
import { StyleToast } from '../../../layouts/Layout';

function AdminClasses() {
  const dispatch = useDispatch();
  const [className, setClassName] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const { teachers, courses } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(GetTeachers());
    dispatch(GetCourses());
    dispatch(AdminGetClasses())
  }, [dispatch]);

  const handleAddClass = () => {
    if (!className || !selectedTeacherId || !selectedCourseId) {
      toast.error('fill all fields', StyleToast);
    }
    else{
      SandRequest()
      setClassName('');
      setSelectedTeacherId('');
      setSelectedCourseId('');
    }
  };

  const SandRequest = ()=>{
    dispatch(addClass({className:className,teacher_id: selectedTeacherId,course_id: selectedCourseId}));
  };

  return (
    <div>
      <h2>Add New Class</h2>
      <div>
        <label htmlFor="className">Class Name:</label>
        <input
          id="className"
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="selectedTeacher">Select Teacher:</label>
        <select
          id="selectedTeacher"
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>{teacher.user_id.firstName} {teacher.user_id.lastName}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="selectedCourse">Select Course:</label>
        <select
          id="selectedCourse"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.courseName}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAddClass}>Add Class</button>
    </div>
  );
}

export default AdminClasses;
