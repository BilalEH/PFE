import { useEffect } from 'react';
import ListOfReqJoin from './RequestsList'
import { useDispatch, useSelector } from 'react-redux';
import { ACoursesReqList } from '../../../api/adminsStore/adminStore';
import { CircularProgress } from '@mui/material';

function AdminRequestsCourses() {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(ACoursesReqList())
  },[])
  const CReqList = useSelector((state) => state.admins);
  
  return (
    <div>
      <h1>Joining requests</h1>
      {CReqList.status_course_request === "loading" ? 
        <div className=''><CircularProgress /></div>: CReqList.status_course_request === "failed" ? 'Error':
        <ListOfReqJoin data={CReqList.course_requests}/>
      }
    </div>
  )
}

export default AdminRequestsCourses
