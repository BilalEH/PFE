import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    GetCourses,
    GetTeachers,
} from "../../../../api/adminsStore/adminStore";
import { toast } from "react-toastify";
import { StyleToast } from "../../../../layouts/Layout";

export default function UpdateClassePopup({
    handleClose,
    setHandleClose,
    classe,
    teachers,
    courses,
    dispatch,
}) {
    const [className, setClassName] = useState("");
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");

    useEffect(() => {
        dispatch(GetTeachers());
        dispatch(GetCourses());
    }, [dispatch]);

    useEffect(() => {
        setClassName(classe ? classe.className : "");
        setSelectedTeacherId(classe ? classe.teacher_id.id : "");
        setSelectedCourseId(classe ? classe.course_id.id : "");
    }, [classe]);

    const handleAddClass = () => {
        if (!className || !selectedTeacherId || !selectedCourseId) {
            toast.error("fill all fields", StyleToast);
        } else {
            // 3ml fonction dyalk l3ajiba hna a akhi hh
            setClassName("");
            setSelectedTeacherId("");
            setSelectedCourseId("");
        }
    };

    const cancelIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
        >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
    );

    const updateIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
        >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
        </svg>
    );
    return (
        <>
            {classe && (
                <Dialog
                    open={handleClose}
                    onClose={() => setHandleClose(false)}
                >
                    <div className="popup-container">
                        <DialogTitle>
                            <div className="popup-title">Update Class</div>
                        </DialogTitle>
                        <DialogContent>
                            <div className="popup-content">
                                <div className="popup-form p-4">
                                    <div className="my-3">
                                        <TextField
                                            label="Class name"
                                            id="className"
                                            type="text"
                                            value={className}
                                            onChange={(e) =>
                                                setClassName(e.target.value)
                                            }
                                            fullWidth
                                        />
                                    </div>
                                    <div className="my-3">
                                        <select
                                            className="form-control py-3"
                                            id="selectedTeacher"
                                            value={selectedTeacherId}
                                            onChange={(e) =>
                                                setSelectedTeacherId(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Teacher
                                            </option>
                                            {teachers.map((teacher) => (
                                                <option
                                                    key={teacher.id}
                                                    value={teacher.id}
                                                >
                                                    {teacher.user_id.firstName}{" "}
                                                    {teacher.user_id.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="my-3">
                                        <select
                                            className="form-control py-3"
                                            id="selectedCourse"
                                            value={selectedCourseId}
                                            onChange={(e) =>
                                                setSelectedCourseId(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select Course
                                            </option>
                                            {courses.map((course) => (
                                                <option
                                                    key={course.id}
                                                    value={course.id}
                                                >
                                                    {course.courseName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="popup-add-class-btns">
                                        <button
                                            className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                            onClick={() =>
                                                setHandleClose(false)
                                            }
                                        >
                                            {cancelIcon}
                                            <p className="m-0 ms-2">Cancel</p>
                                        </button>
                                        <button
                                            className="popup-add-btn d-flex align-items-center justify-content-center"
                                            onClick={handleAddClass}
                                        >
                                            {updateIcon}
                                            <p className="m-0 ms-2">Update</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </div>
                </Dialog>
            )}
        </>
    );
}
