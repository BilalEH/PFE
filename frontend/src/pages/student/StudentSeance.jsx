
import { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SStudentClasses } from '../../api/StudentStore/Student';
import useAuthContext from '../../api/auth';

export default function StudentSeance() {
  const dispatch=useDispatch();
  const {importUser}=useAuthContext();
  useEffect(
    ()=>{
      dispatch(SStudentClasses(importUser().id))
    },[])

    const {Classes_status,studentClasses} = useSelector((state) => state.students);
    console.log(studentClasses);


  return (
    <>
        Classes
    </>
  )
}
