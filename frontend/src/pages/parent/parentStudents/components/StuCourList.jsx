import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {PRemoveStudentInClasses,PStudentClasses} from "../../../../api/parentsStore/parentStore";
import { Button, TablePagination, TableCell, TableBody, TableContainer, Table, TableHead, TableRow, Paper} from "@mui/material";
import ParentEmptyStudentsPage from "./ParentEmptyStudentsPage";
import LoadingForTables from './../../../../components/LoadingForTables';
import ErrorData from './../../../../components/ErrorData';



function StuCourseList({ id }) {

    const [page, setPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(5);

    const columns = [
        { id: "ClassName", name: "Class name" },
        { id: "CourseName", name: "Course name" },
        { id: "teacherName", name: "Teacher" },
        { id: "JoinDate", name: "Join date" },
        { id: "actions", name: "" },
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(PStudentClasses(id));
    }, [id]);

    const ClassesData = useSelector((state) => state.parents);
    const RemoveIcon=(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-x" viewBox="0 0 16 16"><path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"/></svg>)
    const removeStudent = (data) => {
        dispatch(PRemoveStudentInClasses(data));
    };
    
const handlePageChange = (event, newPage) => {
    setPage(newPage);
};

const handleRowChange = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

    return (
        <>
            <Paper
                style={{
                    background: "none",
                    border: "2px solid #afafaf",
                    borderRadius: "12px",
                    overflow: "hidden",
                }}
                sx={{ width: "100%" }}
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.id}
                                        style={{
                                            padding: "22px 18px",
                                            fontWeight: "bold",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {col.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ClassesData.action_status === "loading" ?
                            <LoadingForTables/>:ClassesData.action_status === "failed"? <ErrorData/>:
                            ClassesData.studentClasses.length === 0 ? (
                                <ParentEmptyStudentsPage content={'courses'}/>
                            ) : (
                                ClassesData.studentClasses.slice(
                                    page * rowPerPage,
                                    page * rowPerPage + rowPerPage
                                ).map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.className}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.course_id.courseName}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Mr.{row.teacher_id.user_id.firstName} {row.teacher_id.user_id.lastName}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.pivot.dateJoin}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            <Button color={'error'} variant="contained" startIcon={RemoveIcon} onClick={() =>removeStudent({id: row.pivot.classe_id,data: {student_id:row.pivot.student_id,}})}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ paddingTop: "20px", paddingBottom: "10px" }}
                    rowsPerPageOptions={[1, 5]}
                    rowsPerPage={rowPerPage}
                    page={page}
                    count={ClassesData.studentClasses.length}
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowChange}
                />
            </Paper>
        </>
    );
}

export default StuCourseList;
