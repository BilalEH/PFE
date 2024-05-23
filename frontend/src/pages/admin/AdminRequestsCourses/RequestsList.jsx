import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import ErrorData from "../../../components/ErrorData";
import LoadingForTables from "../../../components/LoadingForTables";
import EmptyTable from "../../../components/EmptyTable";
import AcceptCourseReqPopup from "./components/AcceptCourseReqPopup";
import DeclineCourseReqPopup from "./components/DeclineCourseReqPopup";

function ListOfReqJoin({ data, status }) {
    const [Data, setData] = useState([]);

    // useState for popup
    const [handleAcceptClose, setHandleAcceptClose] = useState(false);
    const [handleDeclineClose, setHandleDeclineClose] = useState(false);
    const [reqSelected, setReqSelected] = useState();

    // useState for pagination
    const [page, setpage] = useState(0);
    const [rowPerPage, setrowPerPage] = useState(5);

    // columns for pagination
    const columns = [
        { id: "studentName", name: "Student Name" },
        { id: "courseName", name: "Course Name" },
        { id: "amount", name: "Course amount" },
        { id: "actions", name: "" },
    ];

    // console.log(data);
    useEffect(() => {
        if (data.length > 0) {
            let tabG = [];
            data.forEach((tab1) => {
                return tab1.forEach((tab2) => {
                    let studentData = {
                        courseId: tab2.id,
                        courseName: tab2.courseName,
                        coursePrix: tab2.amount,
                        studentCIN: tab2.pivot.student_id.user_id.cin,
                        studentId: tab2.pivot.student_id.id,
                        studentName:
                            tab2.pivot.student_id.user_id.firstName +
                            " " +
                            tab2.pivot.student_id.user_id.lastName,
                        ReqDate:
                            tab2.pivot.created_at &&
                            new Date(tab2.pivot.created_at),
                    };
                    if (tab2.pivot.student_id.absparent_id) {
                        studentData = {
                            ...studentData,
                            parentName:
                                tab2.pivot.student_id.absparent_id.user_id
                                    .firstName +
                                " " +
                                tab2.pivot.student_id.absparent_id.user_id
                                    .lastName,
                        };
                    }
                    return tabG.push(studentData);
                });
            });
            return setData(tabG);
        }
    }, [data]);

    function handlePageChange(event, newPage) {
        setpage(newPage);
    }
    function handleRowChange(event) {
        setrowPerPage(event.target.value);
        setpage(0);
    }

    // aymane ha data li 5as tdahra (hiya li Data li fuseState) 3andk tadi f useEffect li fo9 😡
    // console.log(Data);

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
                    <Table className="">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell
                                        style={{
                                            padding: "22px 18px",
                                            fontWeight: "bold",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                        key={col.id}
                                    >
                                        {col.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {status === "loading" ? (
                                <LoadingForTables />
                            ) : status === "failed" ? (
                                <ErrorData />
                            ) : Data.length === 0 ? (
                                <EmptyTable content={"Enroll requests"} />
                            ) : (
                                Data.slice(
                                    page * rowPerPage,
                                    page * rowPerPage + rowPerPage
                                ).map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.studentName}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.courseName}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {row.coursePrix}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    padding: "22px 18px",
                                                    fontFamily: "Montserrat",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                <div className="d-flex justify-content-evenly">
                                                    <button
                                                        onClick={() => {
                                                            setReqSelected(row);
                                                            setHandleDeclineClose(
                                                                true
                                                            );
                                                        }}
                                                        className="req-reject-btn"
                                                    >
                                                        Decline
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setReqSelected(row);
                                                            setHandleAcceptClose(
                                                                true
                                                            );
                                                        }}
                                                        className="req-accept-btn"
                                                    >
                                                        Accept
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{
                        paddingTop: "20px",
                        paddingBottom: "10px",
                    }}
                    rowsPerPageOptions={[1, 3, 5]}
                    rowsPerPage={rowPerPage}
                    page={page}
                    count={Data && Data.length}
                    component="div"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowChange}
                ></TablePagination>
            </Paper>

            <DeclineCourseReqPopup
                handleClose={handleDeclineClose}
                setHandleClose={setHandleDeclineClose}
                request={reqSelected}
            />
            <AcceptCourseReqPopup
                handleClose={handleAcceptClose}
                setHandleClose={setHandleAcceptClose}
                request={reqSelected}
            />
        </>
    );
}

export default ListOfReqJoin;
