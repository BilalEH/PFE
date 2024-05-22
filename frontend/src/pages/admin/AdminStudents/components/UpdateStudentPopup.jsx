import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { updateStudent } from "../../../../api/adminsStore/adminStore";

export default function UpdateStudentPopup({
    handleClose,
    setHandleClose,
    student,
    dispatch,
}) {
    const [newStudentData, setNewStudentData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setNewStudentData({
            firstName: student ? student.user_id.firstName : "",
            lastName: student ? student.user_id.lastName : "",
            email: student ? student.user_id.email : "",
            cin: student ? student.user_id.cin : "",
            phone: student ? student.user_id.phone : "",
            dateN: student ? student.dateN : "",
            password: "",
        });
    }, [student]);

    const validatePhone = (phone) => {
        const phoneRegex = /^(05|06|07)[0-9]{8}$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let error = "";
        if (name === "phone" && !validatePhone(value)) {
            error = "Invalid Moroccan phone number";
        } else if (name === "password" && !value) {
            error = "Password is required";
        } else if (name === "email" && !validateEmail(value)) {
            error = "Invalid email address";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        setNewStudentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(errors).some((error) => error !== "");
        const hasEmptyFields = Object.values(newStudentData).some(
            (value) => value === ""
        );
        if (!hasErrors && !hasEmptyFields) {
            dispatch(
                updateStudent({
                    studentId: student.id,
                    updatedStudent: newStudentData,
                })
            );
            setHandleClose(false);
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
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                <div className="popup-container">
                    <DialogTitle>
                        <div className="popup-title">Update Student</div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="popup-content">
                            <form action="" onSubmit={handleUpdate}>
                                <div className="popup-inputs row">
                                    {student && !student.user_id.cin && (
                                        <div className="col-12">
                                            <TextField
                                                required
                                                className="w-100 my-3"
                                                label="CIN"
                                                name="cin"
                                                value={newStudentData.cin}
                                                placeholder="ex: Elhafyan"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    )}
                                    <div className="col-6">
                                        <TextField
                                            className="w-100 my-3"
                                            label="First name"
                                            name="firstName"
                                            value={newStudentData.firstName}
                                            placeholder="ex: Saad"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            className="w-100 my-3"
                                            label="Last name"
                                            name="lastName"
                                            value={newStudentData.lastName}
                                            placeholder="ex: Elhafyan"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            className="w-100 my-3"
                                            label="Phone"
                                            name="phone"
                                            value={newStudentData.phone}
                                            placeholder="ex: 0770384835"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            className="w-100 my-3"
                                            label="Email"
                                            name="email"
                                            value={newStudentData.email}
                                            placeholder="ex: saad.dirassa@gmail.com"
                                            onChange={handleInputChange}
                                            required
                                            error={!!errors.email}
                                            helperText={errors.email}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            type="date"
                                            className="w-100 my-3"
                                            label="Date of Birth"
                                            name="dateN"
                                            value={newStudentData.dateN}
                                            placeholder=""
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            type="password"
                                            className="w-100 my-3"
                                            label="Password"
                                            name="password"
                                            value={newStudentData.password}
                                            placeholder=""
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="popup-update-btns">
                                    <button
                                        onClick={() => setHandleClose(false)}
                                        type="button"
                                        className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                    >
                                        {cancelIcon}
                                        <p className="m-0 ms-2">Cancel</p>
                                    </button>
                                    <button
                                        className="popup-add-btn d-flex align-items-center justify-content-center"
                                        type="submit"
                                    >
                                        {updateIcon}
                                        <p className="m-0 ms-2">Update</p>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    );
}
