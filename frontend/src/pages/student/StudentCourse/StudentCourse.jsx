import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SAddRequest, SGetCourses } from "../../../api/StudentStore/Student";
import useAuthContext from "../../../api/auth";
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,} from "@mui/material";
import EmptyCoursesPage from "../../parent/ParentCourses/components/EmptyCoursesPage";
import "./style/StudentCourse.css";
import LoadingForTables from './../../../components/LoadingForTables';
import ErrorData from './../../../components/ErrorData';
export default function StudentCourse() {
    const dispatch = useDispatch();
    const coursesData = useSelector((state) => state.students);
    const { importUser } = useAuthContext();

    useEffect(() => {
        dispatch(SGetCourses());
    }, [dispatch]);

    const JoinReq = (courseId) => {
        dispatch(SAddRequest({ data: { student_id: importUser().id }, id: courseId }));
    };


    const [page, setpage] = useState(0);
    const [rowPerPage, setrowPerPage] = useState(5);

    const columns = [
        { id: "courseName", name: "Name" },
        { id: "description", name: "Description" },
        { id: "niveau", name: "Level" },
        { id: "amount", name: "Amount" },
        { id: "actions", name: "" },
    ];
    function handlePageChange(event, newPage) {
        setpage(newPage);
    }
    function handleRowChange(event) {
        setrowPerPage(event.target.value);
        setpage(0);
    }

    return (
        <>
            <div className="page-title">Courses</div>
            <Paper style={{background: "none",border: "2px solid #afafaf",borderRadius: "12px",overflow: "hidden"}}sx={{ width: "100%" }}>
                <TableContainer>
                    <Table className="">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell
                                        style={{    padding: "22px 18px",    fontWeight: "bold",    fontFamily: "Montserrat",    fontSize: "16px",}}key={col.id}>
                                        {col.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coursesData.courses_status === "loading" ? (
                                <LoadingForTables/>
                            ) : coursesData.courses_status === "failed" ? (
                                <ErrorData/>
                            ) : coursesData.courses.length === 0 ? (
                                <EmptyCoursesPage />
                            ) : (
                                coursesData.courses
                                    .slice(
                                        page * rowPerPage,
                                        page * rowPerPage + rowPerPage
                                    )
                                    .map((row, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.courseName}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.description}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.niveau}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        padding: "22px 18px",
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {row.amount}Dh
                                                </TableCell>
                                                <TableCell style={{padding: "22px 18px",fontFamily:"Montserrat",fontSize: "16px",}}><button className="enroll-btn" onClick={() =>JoinReq(row.id)}>join</button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination style={{paddingTop: "20px",paddingBottom: "10px",}}rowsPerPageOptions={[2, 5]}rowsPerPage={rowPerPage}page={page}count={coursesData && coursesData.courses.length}component="div"onPageChange={handlePageChange}onRowsPerPageChange={handleRowChange}></TablePagination>
            </Paper>
        </>
    );
}
