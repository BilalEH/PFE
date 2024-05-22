import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { updateCourse } from "../../../../api/adminsStore/adminStore";
import { useDispatch } from "react-redux";

export default function UpdateCoursePopup({
    handleClose,
    setHandleClose,
    course,
}) {
    const dispatch=useDispatch()
    const [formData, setFormData] = useState({
        courseName: "",
        description: "",
        niveau: "",
        amount: "",
    });

    useEffect(() => {
        setFormData({
            courseName: course ? course.courseName : "",
            description: course ? course.description : "",
            niveau: course ? course.niveau : "",
            amount: course ? course.amount : "",
        });
    }, [course]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(updateCourse({courseId:course.id, updatedCourse:formData}));
        setHandleClose(false);
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
    const updateIcone = (
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
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                <div className="popup-container">
                    <DialogTitle>
                        <div className="popup-title">Update course</div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="popup-content">
                            <div className="popup-form">
                                <form onSubmit={handleSubmit} className="w-100">
                                    <div className="my-3 w-100">
                                        <TextField
                                            label="Course name"
                                            type="text"
                                            name="courseName"
                                            value={formData.courseName}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </div>
                                    <div className="my-3">
                                        <TextField
                                            label="Level"
                                            type="text"
                                            name="niveau"
                                            value={formData.niveau}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </div>
                                    <div className="my-3">
                                        <TextField
                                            label="Amount"
                                            type="text"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </div>
                                    <div className="my-3">
                                        <TextField
                                            label="Description"
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={8}
                                            fullWidth
                                        />
                                    </div>

                                    <div className="popup-add-course-btns">
                                        <button
                                            className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                            type="button"
                                            onClick={() =>
                                                setHandleClose(false)
                                            }
                                        >
                                            {cancelIcon}
                                            <p className="m-0 ms-2">Cancel</p>
                                        </button>
                                        <button
                                            className="popup-add-btn d-flex align-items-center justify-content-center"
                                            type="submit"
                                        >
                                            {updateIcone}
                                            <p className="m-0 ms-2">Update</p>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    );
}
