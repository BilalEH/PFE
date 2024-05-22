import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateStudent } from "../../../../api/adminsStore/adminStore";
import { useDispatch } from "react-redux";

export default function UpdateStudentPopup({
    handleClose,
    setHandleClose,
    student,
}) {
    const [newStudentData, setNewStudentData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        cin: "",
        phone: "",
        dateN: "",
        password: "",
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (student) {
            setNewStudentData({
                firstName: student.user_id.firstName || "",
                lastName: student.user_id.lastName || "",
                email: student.user_id.email || "",
                cin: student.user_id.cin || "",
                phone: student.user_id.phone || "",
                dateN: student.dateN || "",
                password: "",
            });
        }
    }, [student]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            updateStudent({
                studentId: student.id,
                updatedStudent: newStudentData,
            })
        );
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
                <div className="popup-container" style={{ padding: "16px" }}>
                    <DialogTitle>
                        <div className="popup-title">Update Student</div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="popup-content">
                            <form action="" onSubmit={handleUpdate}>
                                <div className="popup-inputs row">
                                    {student && student.user_id.cin && (
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
                                            required
                                            className="w-100 my-3"
                                            label="First name"
                                            name="firstName"
                                            value={newStudentData.firstName}
                                            placeholder="ex: Saad"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <TextField
                                            required
                                            className="w-100 my-3"
                                            label="Last name"
                                            name="lastName"
                                            value={newStudentData.lastName}
                                            placeholder="ex: Elhafyan"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            required
                                            className="w-100 my-3"
                                            label="Phone"
                                            name="phone"
                                            value={newStudentData.phone}
                                            placeholder="ex: 0770384835"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            required
                                            className="w-100 my-3"
                                            label="Email"
                                            name="email"
                                            value={newStudentData.email}
                                            placeholder="ex: saad.dirassa@gmail.com"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <TextField
                                            required
                                            type="date"
                                            className="w-100 my-3"
                                            label="Date of Birth"
                                            name="dateN"
                                            value={newStudentData.dateN}
                                            placeholder=""
                                            onChange={handleInputChange}
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
                                        {updateIcone}
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
