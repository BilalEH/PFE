import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PAddStudent } from "../../../../api/parentsStore/parentStore";
import useAuthContext from "../../../../api/auth";

export default function PAddStudentPopup({ handleClose, setHandleClose }) {
    const { importUser } = useAuthContext();
    const [newStudentP, setnewStudentP] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });
    const dispatch = useDispatch();
    // api/parent/add-childrens/8
    // {
    //     "firstName": "test1",
    //     "lastName": "test",
    //     "email": "StudentTest@gmail.com",
    //     "phone": "0646562429",
    //     "password": "12345789"
    // }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewStudentP((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(PAddStudent({ id: importUser().id, data: newStudentP }));
        setHandleClose(false);
    };
    return (
        <>
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                <div className="popup-container">
                    <DialogTitle>
                        <div className="popup-title">Add Student</div>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <TextField
                                        className="w-100 my-3"
                                        label="First name"
                                        name="firstName"
                                        value={newStudentP.firstName}
                                        placeholder="ex: Saad"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <TextField
                                        className="w-100 my-3"
                                        label="Last name"
                                        type="text"
                                        name="lastName"
                                        value={newStudentP.lastName}
                                        placeholder="ex: Elhafyan"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <TextField
                                className="w-100 my-3"
                                label="Phone"
                                type="text"
                                name="phone"
                                value={newStudentP.phone}
                                placeholder="ex: 0600000000"
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                className="w-100 my-3"
                                label="Email"
                                type="email"
                                name="email"
                                value={newStudentP.email}
                                placeholder="ex: dirassa@gmail.com"
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                className="w-100 my-3"
                                label="Password"
                                type="password"
                                name="password"
                                value={newStudentP.password}
                                placeholder=""
                                onChange={handleInputChange}
                                required
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
                                    <p className="m-0 ms-2">Add</p>
                                </button>
                            </div>
                        </form>
                    </DialogContent>
                </div>
            </Dialog>
        </>
    );
}
