import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { PGetCourses } from "../../api/parentsStore/parentStore";
import ParentCouresList from "./ParentCourses/CoursesList";
import { CircularProgress } from "@mui/material";


export default function ParentCourses() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(PGetCourses());
  },[])
  const CoursesData=useSelector((state)=>state.parents);
  return (
    <div>
      <h1>Courses</h1>
      <p>This is the parent courses page</p>
      {
        CoursesData.status==='succeeded'?(
          <ParentCouresList CouresData={CoursesData.courses}/>
        ):(CoursesData.status==='failed'?(<div className='w-100 d-flex justify-content-center'>No courses data available</div>):(<div className='w-100 d-flex justify-content-center'><CircularProgress/></div>))
      }
    </div>
  )
}
