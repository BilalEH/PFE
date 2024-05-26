import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorData from "../../../../components/ErrorData";
import LoadingForTables from "../../../../components/LoadingForTables";
import EmptyStudentsPage from "../../AdminStudents/components/EmptyStudentsPage";
import { GetCourses } from "../../../../api/adminsStore/adminStore";
import EmptyTable from "../../../../components/EmptyTable";

export default function CoursesTable() {
    const [coursesRows, setcoursesRows] = useState([]);
    const dispatch = useDispatch();
    const coursesData = useSelector((state) => state.admins);

    const columns = [
        { id: "courseName", name: "Course name" },
        { id: "niveau", name: "Level" },
        { id: "amount", name: "Amount" },
    ];

    useEffect(() => {
        dispatch(GetCourses());
    }, [dispatch]);

    useEffect(() => {
        setcoursesRows(coursesData.courses);
    }, [coursesData]);

    return (
        <>
            <TableContainer>
                <Table className="">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    style={{
                                        padding: "22px 18px",
                                        fontWeight: "bold",
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                    }}
                                    key={column.id}
                                >
                                    {column.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {coursesData.status_courses === "failed" ? (
                            <ErrorData />
                        ) : coursesData.status_courses === "loading" ? (
                            <LoadingForTables />
                        ) : coursesRows.length === 0 ? (
                            <EmptyTable content="courses" />
                        ) : (
                            coursesRows.slice(0, 3).map((row, i) => (
                                <TableRow key={i}>
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
                                        {row.niveau}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            padding: "22px 18px",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {row.amount}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
