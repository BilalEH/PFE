import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthContext from "../../../../api/auth";
import { ParentStudentsList } from "../../../../api/parentsStore/parentStore";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import EmptyTable from "../../../../components/EmptyTable";

export default function PStudentsTable() {
    const dispatch = useDispatch();
    const { importUser } = useAuthContext();
    useEffect(() => {
        dispatch(ParentStudentsList(importUser().id));
    }, []);
    const StudentsData = useSelector((state) => state.parents.students);

    const columns = [
        { id: "firstName", name: "First name" },
        { id: "lastName", name: "Last name" },
        { id: "dateN", name: "Birth date" },
    ];
    return (
        <>
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
                        {StudentsData.length === 0 ? (
                            <EmptyTable content="students" />
                        ) : (
                            StudentsData.slice(0, 3).map((row, i) => (
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
