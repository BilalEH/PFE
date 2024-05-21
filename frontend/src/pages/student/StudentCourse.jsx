import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SAddRequest, SGetCourses } from '../../api/StudentStore/Student';
import useAuthContext from '../../api/auth';

export default function StudentCourse() {
  const dispatch = useDispatch();
  const coursesData = useSelector((state) => state.students);
  const {importUser}=useAuthContext()
  useEffect(() => {
    dispatch(SGetCourses());
  }, [dispatch]);


  const JoinReq=(courseId)=>{
    dispatch(SAddRequest({data:{student_id:importUser().id},id:courseId}))
  }

  return (
    <>
      <h2>Courses</h2>
      <table className="table w-100">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Course Level</th>
            <th>Course Amount</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {coursesData.courses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseName}</td>
              <td>{course.description}</td>
              <td>{course.niveau}</td>
              <td>{course.amount}</td>
              <td><button onClick={()=>JoinReq(course.id)}>join</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
