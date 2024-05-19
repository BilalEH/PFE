import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRemoveStudentInClasses, PStudentClasses } from "../../../api/parentsStore/parentStore";
import { CircularProgress } from "@mui/material";


function StuCourseList({id}) {
    const dispatch = useDispatch();
    useEffect(
        ()=>{
            dispatch(PStudentClasses(id));
        },[]
    )
    const ClassesData=useSelector((state)=>state.parents);
    const removeStudent=(data)=>{
        dispatch(PRemoveStudentInClasses(data))
    }
    return (
        <>
        {
            ClassesData.action_status==="loading"?(<div style={{height:"80vh"}} className='w-100 d-flex justify-content-center align-items-center'><CircularProgress/></div>):ClassesData.action_status==="failed"?(<div style={{height:"80vh"}} className='w-100 d-flex justify-content-center align-items-center'>No courses data available</div>):(
            <table className="w-100">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Course</th>
                        <th>Filiere</th>
                        <th>Join Date</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ClassesData.studentClasses.map((e) => {
                            console.log(e);
                            return (
                                <tr key={e.id}>
                                    <td>{e.className}</td>
                                    <td>{e.course_id.courseName}</td>
                                    <td>{e.filiere_id.nomFiliere}</td>
                                    <td>{e.pivot.dateJoin}</td>
                                    <td>
                                        <button onClick={()=>removeStudent({id:e.pivot.classe_id,data:{student_id:e.pivot.student_id}})}>
                                            remove 
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            )
        }
        </>
    );
}

export default StuCourseList;