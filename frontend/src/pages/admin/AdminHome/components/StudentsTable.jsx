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
import { GetStudents } from "../../../../api/adminsStore/adminStore";

export default function StudentsTable() {
    const [studentRows, setStudentRows] = useState([]);
    const dispatch = useDispatch();
    const studentsData = useSelector((state) => state.admins);

    const columns = [
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "dateN", name: "Birth date" },
    ];

    useEffect(() => {
        dispatch(GetStudents());
    }, [dispatch]);

    useEffect(() => {
        setStudentRows(studentsData.students);
    }, [studentsData]);

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
                        {studentsData.status_student === "failed" ? (
                            <ErrorData />
                        ) : studentsData.status_student === "loading" ? (
                            <LoadingForTables />
                        ) : studentRows.length === 0 ? (
                            <EmptyStudentsPage />
                        ) : (
                            studentRows.slice(0, 3).map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell
                                        style={{
                                            padding: "22px 18px",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {row.user_id.firstName}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            padding: "22px 18px",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {row.user_id.lastName}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            padding: "22px 18px",
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {row.dateN}
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
