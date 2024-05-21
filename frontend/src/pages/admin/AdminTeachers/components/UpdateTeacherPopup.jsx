import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateTeacher } from "../../../../api/adminsStore/adminStore";
import { useDispatch } from "react-redux";

export default function UpdateTeacherPopup({
    handleClose,
    setHandleClose,
    teacher,
}) {
    const [newTeacherData, setNewTeacherData] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setNewTeacherData({
            firstName: teacher ? teacher.user_id.firstName : "",
            lastName: teacher ? teacher.user_id.lastName : "",
            email: teacher ? teacher.user_id.email : "",
            cin: teacher ? teacher.user_id.cin : "",
            phone: teacher ? teacher.user_id.phone : "",
            password: "",
        });
    }, [teacher]);

    const validatePhone = (phone) => {
        const phoneRegex = /^(05|06|07)[0-9]{8}$/;
        return phoneRegex.test(phone);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let error = "";
        if (name === "phone" && !validatePhone(value)) {
            error = "Invalid Moroccan phone number";
        } else if (name === "password" && !value) {
            error = "Password is required";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        setNewTeacherData((prevData) => ({ ...prevData, [name]: value }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const hasErrors = Object.values(errors).some((error) => error !== "");
        const hasEmptyFields = Object.values(newTeacherData).some(
            (value) => value === ""
        );
        if (!hasErrors && !hasEmptyFields) {
            dispatch(
                updateTeacher({
                    teacherId: teacher.id,
                    updatedTeacher: newTeacherData,
                })
            );
            setHandleClose(false);
        }
    }

    const update_icone = (
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
                {teacher && (
                    <div className="popup-container">
                        <DialogTitle>
                            <div className="popup-title">Update Teacher</div>
                        </DialogTitle>
                        <DialogContent>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-6">
                                        <TextField
                                            className="w-100 my-3"
                                            label="First name"
                                            name="firstName"
                                            value={newTeacherData.firstName}
                                            placeholder="ex: Saad"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            className="w-100 my-3"
                                            label="Last name"
                                            type="text"
                                            name="lastName"
                                            value={newTeacherData.lastName}
                                            placeholder="ex: Elhafyan"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <TextField
                                    className="w-100 my-3"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={newTeacherData.email}
                                    placeholder="ex: dirassa@gmail.com"
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    className="w-100 my-3"
                                    label="CIN"
                                    type="text"
                                    name="cin"
                                    value={newTeacherData.cin}
                                    placeholder="ex: K000000"
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    className="w-100 my-3"
                                    label="Phone"
                                    type="text"
                                    name="phone"
                                    value={newTeacherData.phone}
                                    placeholder="ex: 0600000000"
                                    onChange={handleInputChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                                <TextField
                                    className="w-100 my-3"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={newTeacherData.password}
                                    placeholder=""
                                    onChange={handleInputChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                                <div className="add-teacher-popup-btns">
                                    <button
                                        className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                        type="button"
                                        onClick={() => setHandleClose(false)}
                                    >
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
                                        <p className="m-0 ms-2">Cancel</p>
                                    </button>
                                    <button
                                        className="popup-add-btn d-flex align-items-center justify-content-center"
                                        type="submit"
                                    >
                                        {update_icone}
                                        <p className="m-0 ms-2">Update</p>
                                    </button>
                                </div>
                            </form>
                        </DialogContent>
                    </div>
                )}
            </Dialog>
        </>
    );
}
