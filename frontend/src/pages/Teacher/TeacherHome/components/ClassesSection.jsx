import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import useAuthContext from "../../../../api/auth";
import LoadingForTables from "../../../../components/LoadingForTables";
import ErrorData from "../../../../components/ErrorData";
import EmptyTable from "../../../../components/EmptyTable";
import { GetTeachers } from "../../../../api/adminsStore/adminStore";
import { axiosInstance } from "../../../../api/axios";

export default function ClassesSection() {
    const [classes, setClasses] = useState([]);
    const dispatch = useDispatch();
    const teachersReq = useSelector((state) => state.admins);
    const teachers = teachersReq.teachers;
    const status = teachersReq.status_teacher;

    const { importUser } = useAuthContext();
    const teacher = teachers.filter((e) => e.user_id.id === importUser().id)[0];

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axiosInstance.get("/api/classes");
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        dispatch(GetTeachers());
        fetchClasses(); // Call the fetchClasses function when the component mounts
        console.log(classes);
    }, [dispatch]); // Pass dispatch as a dependency to useEffect

    // for table
    const columns = [
        { id: "className", name: "Class Name" },
        { id: "courseName", name: "Course Name" },
    ];
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
                        {status === "loading" ? (
                            <LoadingForTables />
                        ) : status === "failed" ? (
                            <ErrorData />
                        ) : !classes.classes ? (
                            <EmptyTable content={"Class"} />
                        ) : (
                            classes.classes &&
                            classes.classes
                                .filter((e) => e.teacher_id.id === teacher.id)
                                .slice(0, 3)
                                .map((row) => (
                                    <TableRow key={row.id}>
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
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
