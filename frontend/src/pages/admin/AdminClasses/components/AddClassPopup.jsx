import { Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Skeleton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {GetCourses,GetTeachers,addClass} from "../../../../api/adminsStore/adminStore";
import { toast } from "react-toastify";
import { StyleToast } from "../../../../layouts/Layout";
import "../style/AdminClasses.css";
import { useDispatch, useSelector } from "react-redux";

export default function AddClassPopup({handleClose,setHandleClose}) {
    const [className, setClassName] = useState("");
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(GetTeachers());
        dispatch(GetCourses());
    }, []);
    const {status_teacher, status_course, teachers, courses}=useSelector(state=>state.admins);

    const handleAddClass = () => {
        if (!className || !selectedTeacherId || !selectedCourseId) {
            toast.error("fill all fields", StyleToast);
        } else {
            SandRequest();
            setClassName("");
            setSelectedTeacherId("");
            setSelectedCourseId("");
        }
    };

    const SandRequest = () => {
        dispatch(addClass({className: className,teacher_id: selectedTeacherId,course_id: selectedCourseId}));
        setHandleClose(false)
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

    const addIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
        >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
    );

    return (
        <>
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                <div className="popup-container">
                    <DialogTitle>
                        <div className="popup-title">Add class</div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="popup-content">
                            <div className="popup-form p-4">
                                <div className="my-3">
                                    <TextField label="Class name" id="className" type="text" value={className} onChange={(e) =>setClassName(e.target.value)} fullWidth/>
                                </div>
                                <div className="my-3">
                                    <FormControl fullWidth>
                                        {status_teacher === "loading" ? <Skeleton width={'100%'} height={70} /> : (
                                            <>
                                                <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedTeacherId} label="Teacher" onChange={(e) =>     setSelectedTeacherId(e.target.value) }>
                                                    {teachers.map((teacher) => (<MenuItem key={teacher.id} value={teacher.id}>{teacher.user_id.firstName} {teacher.user_id.lastName}</MenuItem>))}
                                                </Select>
                                            </>
                                            )
                                        }
                                    </FormControl>
                                </div>
                                <div className="my-3">
                                    <FormControl fullWidth>
                                        {status_course === "loading" ? <Skeleton width={'100%'} height={70}/>: (
                                            <>
                                                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedCourseId} label="Course" onChange={(e) =>setSelectedCourseId(e.target.value) }>
                                                    {courses.map((course) => (<MenuItem key={course.id} value={course.id}>{course.courseName}</MenuItem>))}
                                                </Select>
                                            </>
                                        )
                                        }
                                    </FormControl>
                                </div>
                                <div className="popup-add-class-btns">
                                    <button
                                        className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                        onClick={() => setHandleClose(false)}
                                    >
                                        {cancelIcon}
                                        <p className="m-0 ms-2">Cancel</p>
                                    </button>
                                    <button
                                        className="popup-add-btn d-flex align-items-center justify-content-center"
                                        onClick={handleAddClass}
                                    >
                                        {addIcon}
                                        <p className="m-0 ms-2">Add</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    );
}
