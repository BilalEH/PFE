import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateParent, updateStudent } from "../../../../api/adminsStore/adminStore";
import { useDispatch } from "react-redux";

export default function UpdateParentPopup({open,setOpen,parent}) {
    const [parentData, setParentData] = useState({
        cin: parent?.user_id.cin || "",
        firstName: parent?.user_id.firstName || "",
        lastName: parent?.user_id.lastName || "",
        email: parent?.user_id.email || "",
        phone: parent?.user_id.phone || "",
        password: "",
    });

    const dispatch=useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParentData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateParent({parentId: parent.id,updatedParent: parentData}))
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <div className="popup-container">
                <DialogTitle>
                    <div className="popup-title">Update Parent</div>
                </DialogTitle>
                <DialogContent>
                    <div className="popup-content">
                        <form action="" onSubmit={handleUpdate}>
                            <div className="popup-inputs row">
                                <div className="col-12">
                                    <TextField
                                        fullWidth
                                        className="w-100 my-3"
                                        label="CIN"
                                        name="cin"
                                        value={parentData.cin}
                                        placeholder="ex: G3456789"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <TextField
                                        className="w-100 my-3"
                                        label="First name"
                                        name="firstName"
                                        value={parentData.firstName}
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
                                        value={parentData.lastName}
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
                                        value={parentData.phone}
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
                                        value={parentData.email}
                                        placeholder="ex: saad.dirassa@gmail.com"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <TextField
                                        className="w-100 my-3"
                                        label="Password"
                                        name="password"
                                        value={parentData.password}
                                        placeholder="ex: --------"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div> 
                            <div className="popup-update-btns">
                                <button
                                    onClick={() => setOpen(false)}
                                    type="button"
                                    className="popup-cancel-btn d-flex align-items-center justify-content-center"
                                >
                                    <p className="m-0 ms-2">Cancel</p>
                                </button>
                                <button
                                    className="popup-add-btn d-flex align-items-center justify-content-center"
                                    type="submit"
                                >
                                    <p className="m-0 ms-2">Update</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
}
