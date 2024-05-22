import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { addCourse } from "../../../../api/adminsStore/adminStore";

export default function AddCoursePopup({
    handleClose,
    setHandleClose,
    dispatch,
}) {
    const [formData, setFormData] = useState({
        courseName: "",
        description: "",
        niveau: "",
        amount: "",
    });

    const [validationErrors, setValidationErrors] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = [];
        // Validate amount between 100 and 4000
        const amount = parseInt(formData.amount);
        if (amount < 100 || amount > 4000) {
            errors.push("Amount must be between 100 and 4000");
        }
        if (!formData.courseName.trim()) {
            errors.push("Course Name is required");
        }
        if (!formData.description.trim()) {
            errors.push("Description is required");
        }
        if (!formData.niveau.trim()) {
            errors.push("Niveau is required");
        }
        if (!formData.amount.trim()) {
            errors.push("Amount is required");
        }
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        dispatch(addCourse(formData));
        // Clear form data after submission
        setFormData({
            courseName: "",
            description: "",
            niveau: "",
            amount: "",
        });
        setHandleClose(false);
    };

    return (
        <>
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                <div className="popup-container">
                    <DialogTitle>
                        <div className="popup-title">Add Course</div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="popup-content">
                            <div className="popup-form">
                                <div className="form-errors">
                                    {validationErrors.length > 0 && (
                                        <div
                                            style={{
                                                backgroundColor:
                                                    "rgba(255, 0, 0, 0.3)",
                                                color: "white",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                margin: "10px 0",
                                            }}
                                        >
                                            <strong>Error:</strong>
                                            <ul>
                                                {validationErrors.map(
                                                    (error, index) => (
                                                        <li key={index}>
                                                            {error}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
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
                                            className="popup-cancel-btn"
                                            type="button"
                                            onClick={() =>
                                                setHandleClose(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="popup-add-btn"
                                            type="submit"
                                        >
                                            Add Course
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
