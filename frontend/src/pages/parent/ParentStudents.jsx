
import { useDispatch, useSelector } from 'react-redux';
import { ParentStudentsList } from '../../api/parentsStore/parentStore';
import { useEffect, useState } from 'react';
import useAuthContext from '../../api/auth';
import P_StudentsList from './parentStudents/ParentStudiantList';
import { Button, CircularProgress } from '@mui/material';
import PAddStudentPopup from './parentStudents/PAddStudentPopup';
export default function ParentStudents() {
  const dispatch=useDispatch();
  const {importUser}=useAuthContext()
  useEffect(()=>{
    dispatch(ParentStudentsList(importUser().id));
  },[]);
  const [handleAddClose, setHandleAddClose] = useState(false);
  const StudentsData=useSelector((state)=>state.parents);
  return (
    <div>
        <h1>Parent Students</h1>
        <p>This is the parent students page</p>
        <div>
          <Button variant="contained" onClick={()=>setHandleAddClose(true)}>Add Student</Button>
        </div>
        {
          StudentsData.status==='succeeded'?(
            <P_StudentsList StudentsData={StudentsData.students}/>
          ):StudentsData.status==='failed'?(<div className='w-100 d-flex justify-content-center'>No students data available</div>):(<div className='w-100 d-flex justify-content-center'><CircularProgress/></div>)
        }
        <PAddStudentPopup handleClose={handleAddClose} setHandleClose={setHandleAddClose}></PAddStudentPopup>
    </div>
  )
}
