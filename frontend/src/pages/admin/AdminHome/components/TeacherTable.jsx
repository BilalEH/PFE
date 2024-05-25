import React, { useEffect, useState } from "react";
import { GetTeachers } from "../../../../api/adminsStore/adminStore";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import ErrorData from "../../../../components/ErrorData";
import LoadingForTables from "../../../../components/LoadingForTables";
import EmptyStudentsPage from "../../AdminStudents/components/EmptyStudentsPage";

export default function TeacherTable() {
    const [teacherRows, setTeacherRows] = useState([]);
    const dispatch = useDispatch();
    const teachersData = useSelector((state) => state.admins);

    const columns = [
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "phone", name: "Phone" },
    ];

    useEffect(() => {
        dispatch(GetTeachers());
    }, [dispatch]);

    console.log(teachersData);

    useEffect(() => {
        setTeacherRows(teachersData.students);
    }, [teachersData]);

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
                        {teachersData.status_student === "failed" ? (
                            <ErrorData />
                        ) : teachersData.status_student === "loading" ? (
                            <LoadingForTables />
                        ) : teacherRows.length === 0 ? (
                            <EmptyStudentsPage />
                        ) : (
                            teacherRows.slice(0, 3).map((row, i) => (
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
                                        {row.user_id.phone}
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
