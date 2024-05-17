
import { useDispatch, useSelector } from 'react-redux';
import { ParentStudentsList } from '../../api/parentsStore/parentStore';
import { useEffect } from 'react';
import useAuthContext from '../../api/auth';
import P_StudentsList from './parentStudents/ParentStudiantList';
import { CircularProgress } from '@mui/material';
export default function ParentStudents() {
  const dispatch=useDispatch();
  const {importUser}=useAuthContext()
  useEffect(()=>{
    dispatch(ParentStudentsList(importUser().id));
  },[]);
  const StudentsData=useSelector((state)=>state.parents);
  return (
    <div>
        <h1>Parent Students</h1>
        <p>This is the parent students page</p>
        {
          StudentsData.status==='succeeded'?(
            <P_StudentsList StudentsData={StudentsData.students}/>
          ):StudentsData.status==='failed'?(<div className='w-100 d-flex justify-content-center'>No students data available</div>):(<div className='w-100 d-flex justify-content-center'><CircularProgress/></div>)
        }
    </div>
  )
}
