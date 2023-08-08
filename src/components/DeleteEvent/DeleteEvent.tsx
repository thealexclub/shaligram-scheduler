// @material-ui/core components
import React from "react";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import "../Scheduler/Scheduler";
import "bootstrap/dist/css/bootstrap.min.css";
import './DeleteEvent.css'
import CloseIcon from '@material-ui/icons/Close';

export const DeleteEventDialog = (props) => {

    const {
        isDeleteModal,
        setIsDeleteModal,
        deleteEvent
    } = props;


    return (
        <Dialog
            className="deltemeeting"
            open={isDeleteModal}
            // TransitionComponent={Transition}
            keepMounted
            onClose={() => setIsDeleteModal(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <>
                    <div>
                        <p>Are you sure?</p>
                        <div
                            className="closeButton"
                            onClick={() => setIsDeleteModal(false)}>
                            <IconButton>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </div>
                </>
            </DialogContent>
            <DialogActions>
                <Box width="100%" display="flex" justifyContent="space-around">
                    <>
                        <button
                            className="btn btn-primary"
                            onClick={() => deleteEvent()}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            Yes
                        </button>

                        <button className="btn btn-danger" onClick={() => setIsDeleteModal(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.16998 14.8299L14.83 9.16992" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.83 14.8299L9.16998 9.16992" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Cancel
                        </button>
                    </>
                </Box>
            </DialogActions>
        </Dialog>
    );
};
