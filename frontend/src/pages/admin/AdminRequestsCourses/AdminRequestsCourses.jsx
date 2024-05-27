import { useEffect } from "react";
import ListOfReqJoin from "./RequestsList";
import { useDispatch, useSelector } from "react-redux";
import { ACoursesReqList } from "../../../api/adminsStore/adminStore";
import "./style/AdminRequestsCourse.css";

export default function AdminRequestsCourses() {
    const dispatch = useDispatch();
    const {course_requests,status_course_request} = useSelector((state) => state.admins);
    useEffect(() => {
        dispatch(ACoursesReqList());
    }, []);

    return (
        <div>
            <div className="page-title">Enrolling requests</div>
            <ListOfReqJoin
                data={course_requests}
                status={status_course_request}
            />
        </div>
    );
}
