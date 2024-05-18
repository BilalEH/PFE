import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "./style/popup.css";
import { useDispatch } from 'react-redux';
import { AccepteUsers } from "../../../api/adminsStore/adminStore";

export default function AcceptPopup({handleClose,setHandleClose,studentPop}) {
    const dispatch = useDispatch();
    const acceptRequest=({id,role})=>{
        dispatch(AccepteUsers({id:id,role:role}));
        setHandleClose(false)
    }

    return (
        <>
            <Dialog open={handleClose} onClose={() => setHandleClose(false)}>
                <div className="popup-container">
                    <DialogTitle>
                        <div className="popup-title my-3">Accept request</div>
                    </DialogTitle>
                    <DialogContent>
                        {studentPop && (
                            <div className="popup-content">
                                <div className="popup-text my-3">
                                    Are you sure you want to accept the sign up
                                    request of{" "}
                                    <span className="popup-name">
                                        {studentPop.firstName} {studentPop.lastName}
                                    </span>
                                    ?
                                </div>
                                <div className="my-3 mt-5 popup-btns d-flex justify-content-between">
                                    <button
                                        onClick={() => setHandleClose(false)}
                                        className="popup-btn close-btn"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={()=>acceptRequest({id:studentPop.id,role:studentPop.role})}
                                        className="popup-btn accept-btn"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </div>
            </Dialog>
        </>
    );
}
