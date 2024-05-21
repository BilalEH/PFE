import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ParentStudentsList,
    PGetCourses,
} from "../../../api/parentsStore/parentStore";
import ParentCouresList from "./components/CoursesList";
import { CircularProgress } from "@mui/material";
import useAuthContext from "../../../api/auth";

export default function ParentCourses() {
    const dispatch = useDispatch();
    const { importUser } = useAuthContext();
    useEffect(() => {
        dispatch(PGetCourses());
        dispatch(ParentStudentsList(importUser().id));
    }, []);
    const CoursesData = useSelector((state) => state.parents);
    return (
        <div>
            <div className="page-title">Courses</div>
            <ParentCouresList
                CouresData={CoursesData.courses}
                studentData={CoursesData.students}
                status={CoursesData.status}
            />
        </div>
    );
}
