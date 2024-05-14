import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { GetAdmins, GetCourses, GetParents, GetStudents, GetTeachers } from '../../api/adminsStore/adminStore';

export default function StudentHome() {

  const dispatch=useDispatch();
  useEffect(()=>{
    // dispatch(GetStudents())
    // dispatch(GetParents())
    // dispatch(GetAdmins())
    // dispatch(GetTeachers())
    // dispatch(GetCourses())
  },[]);

  return (
    <div>
      student
    </div>
  )
}
