import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SGetCourses } from "../../../../api/StudentStore/Student";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import LoadingForTables from "../../../../components/LoadingForTables";
import ErrorData from "../../../../components/ErrorData";
import EmptyTable from "../../../../components/EmptyTable";

export default function SCoursesTable() {
    const dispatch = useDispatch();
    const coursesData = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(SGetCourses());
    }, [dispatch]);

    const columns = [
        { id: "courseName", name: "Name" },
        { id: "niveau", name: "Level" },
        { id: "amount", name: "Amount" },
    ];
    return (
        <>
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
                        {coursesData.courses_status === "loading" ? (
                            <LoadingForTables />
                        ) : coursesData.courses_status === "failed" ? (
                            <ErrorData />
                        ) : coursesData.courses.length === 0 ? (
                            <EmptyTable content="courses" />
                        ) : (
                            coursesData.courses.slice(0, 3).map((row, i) => {
                                return (
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
                                            {row.amount}Dh
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
