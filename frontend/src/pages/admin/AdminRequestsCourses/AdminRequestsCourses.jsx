import { useEffect } from "react";
import ListOfReqJoin from "./RequestsList";
import { useDispatch, useSelector } from "react-redux";
import { ACoursesReqList } from "../../../api/adminsStore/adminStore";
import "./style/AdminRequestsCourse.css";

export default function AdminRequestsCourses() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ACoursesReqList());
    }, []);
    const CReqList = useSelector((state) => state.admins);

    return (
        <div>
            <div className="page-title">Enrolling requests</div>
            <ListOfReqJoin
                data={CReqList.course_requests}
                status={CReqList.status_course_request}
            />
        </div>
    );
}
