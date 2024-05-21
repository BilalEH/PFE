import {useState } from "react";
import { useDispatch } from "react-redux";
import { addRequest } from "../../../api/parentsStore/parentStore";


function ParentCouresList({CouresData,studentData}) {
    const [active, setActive] = useState(false);
    const [studentSelected, setStudentSelected] = useState('');
    const [CouresSelected, setCouresSelected] = useState(0);
    const dispatch=useDispatch();
    const SandReq=()=>{
        console.log(studentSelected);
        if(studentSelected!==''){
            dispatch(addRequest({id:CouresSelected,data:{student_id:studentSelected}}));
            setStudentSelected('')
            setActive(false)
        }else{
            console.log('no student selected');
        }
    }
    const StudentData=studentData.filter(e=>e.status===1);
    return (
        <>
            {
                active&&(
                    <>
                        <button onClick={SandReq}>confirm</button>
                        <select defaultValue={studentSelected} onChange={(e)=>setStudentSelected(e.target.value)}>
                            <option value={''}>students</option>
                            {StudentData.map((student)=><option key={student.id} value={student.id}>{student.user_id.firstName} {student.user_id.lastName}</option>)}
                        </select>
                    </>
                )
            }
            <table className="w-100">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Niveau</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        CouresData.map((course) =>{
                            return (
                                <tr key={course.id}>
                                    <td>{course.courseName}</td>
                                    <td>{course.description}</td>
                                    <td>{course.amount}Dh</td>
                                    <td>{course.niveau}</td>
                                    <td width={"200px"}>
                                        {!active?<button onClick={()=>{setActive(!active);setCouresSelected(course.id)}}>Reserve</button>:<button onClick={()=>{setActive(!active)}}>cancel</button>}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default ParentCouresList;