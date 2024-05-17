import { Button, Tooltip } from "@mui/material";
import PopupStudiantCourses from "./PopupStudiantCourses";
import { useState } from "react";
import StuCourseList from "./StuCourList";

function P_StudentsList({StudentsData}) {
    const [handleClose,sethandleClose]=useState(false);
    const [StudentSelected,setStudentSelected]=useState({id:'',name:''})
    const ShowStudCourns=(id,name)=>{
        setStudentSelected({id:id,name:name});
        sethandleClose(true)
    }
    return (
        <>
            <table className="w-100">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>CIN</th>
                        <th>Date of Birth</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        StudentsData.map((student) => {
                            return (
                                <tr key={student.id}>
                                    <td>{student.user_id.firstName}</td>
                                    <td>{student.user_id.lastName}</td>
                                    <td>{student.user_id.email}</td>
                                    <td>{student.user_id.phone}</td>
                                    <td>{student.user_id.cin}</td>
                                    <td>{student.dateN}</td>
                                    <td>{student.status==1?"verifie":"non verifie"}</td>
                                    <td>
                                        <Tooltip title={`List of courses the ${student.user_id.firstName} is taking`} arrow >
                                            <Button disabled={student.status==0} style={student.status==1?{backgroundColor: "#19647e",color:"white"}:{}} variant="contained" onClick={() => ShowStudCourns(student.id,`${student.user_id.firstName} ${student.user_id.lastName}`)}>courses</Button>
                                        </Tooltip>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <PopupStudiantCourses sethandleClose={sethandleClose} handleClose={handleClose} title={`List of courses taught by ${StudentSelected.name}`}>
                <StuCourseList id={StudentSelected.id}/>
            </PopupStudiantCourses>
        </>
    );
}

export default P_StudentsList;