import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthContext from "../../../../api/auth";
import { SGetMessages } from "../../../../api/StudentStore/Student";
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
import EmptyTable from "../../../../components/EmptyTable";

export default function MessagesSection() {
    const dispatch = useDispatch();
    const { importUser } = useAuthContext();
    const user = importUser();

    useEffect(() => {
        dispatch(SGetMessages(user.id));
    }, [dispatch, user.id]);

    const studentMessages = useSelector((state) => state.students);
    const sortedMessages = [...studentMessages.messages].sort(
        (a, b) => new Date(b.send_date) - new Date(a.send_date)
    );

    const columns = [
        { id: "title", name: "Title" },
        { id: "content", name: "Content" },
        { id: "send_date", name: "Date" },
        { id: "status", name: "Status" },
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
                        {studentMessages.courses_status === "loading" ? (
                            <LoadingForTables />
                        ) : studentMessages.courses_status === "failed" ? (
                            <ErrorData />
                        ) : sortedMessages.length === 0 ? (
                            <EmptyTable content="messages" />
                        ) : (
                            sortedMessages.slice(0, 3).map((row, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.title}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.content}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.send_date}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                padding: "22px 18px",
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {row.status}
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
