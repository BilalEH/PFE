import { useEffect } from 'react';
import ListOfReqJoin from './RequestsList'
import { useDispatch, useSelector } from 'react-redux';
import { ACoursesReqList } from '../../../api/adminsStore/adminStore';

function AdminRequestsCourses() {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(ACoursesReqList())
  },[])
  const CReqList = useSelector((state) => state.admins);
  console.log(CReqList.course_requests);
  return (
    <div>
      <h1>Joining requests</h1>
      <ListOfReqJoin />
    </div>
  )
}

export default AdminRequestsCourses
