import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import "../Scheduler/Scheduler";
import './EventDialog.css'
import { DeleteEventDialog } from "../DeleteEvent/DeleteEvent";

export const EventDialog = (props) => {
  const {
    eventModal,
    setEventModal,
    setStartDate,
    startDate,
    setStartTime,
    startTime,
    setEndDate,
    endDate,
    setEndTime,
    endTime,
    setPrinciple,
    principle,
    setTask,
    task,
    setType,
    type,
    setHour,
    hour,
    setActivity,
    activity,
    addNewEvent,
    editEvent,
    isEditModal,
    events,
    isPrinciple,
    deleteEvent,
    setIsDeleteModal,
    isDeleteModal,
    undoChanges
  } = props;

  useEffect(() => {
    const [hour, minute] = startTime.split(':');
    const [hour1, minute1] = endTime.split(':');
    const date1: any = new Date(`${startDate}T${hour}:${minute}:00`);
    const date2: any = new Date(`${endDate}T${hour1}:${minute1}:00`);

    const timeDifferenceInMs = date2 - date1;
    const hoursDifference = timeDifferenceInMs / (1000 * 60 * 60);
    if (startDate && startTime && endDate && endTime) {
      setHour(hoursDifference?.toFixed(2));
    }
  }, [startDate, startTime, endDate, endTime])

  const onDeleteModal = () => {
    setEventModal(false)
    setIsDeleteModal(true);
  }

  const startDateSet = (e: any) => {
    setStartDate(e?.target?.value)
  }

  const startTimeSet = (e: any) => {
    setStartTime(e?.target?.value)
  }

  const endDateSet = (e: any) => {
    setEndDate(e?.target?.value)
  }

  const endTimeSet = (e: any) => {
    setEndTime(e?.target?.value)
  }

  const principleSet = (e: any) => {
    setPrinciple(e?.target?.value ? e?.target?.value : '')
  }

  const taskSet = (e: any) => {
    setTask(e?.target?.value ? e?.target?.value : '')
  }

  const typeSet = (e: any) => {
    setType(e?.target?.value ? e?.target?.value : '')
  }

  const activitySet = (e: any) => {
    setActivity(e?.target?.value)
  }

  return (
    <>
      <Dialog
        className="addmeeting"
        open={eventModal}
        // TransitionComponent={Transition}
        keepMounted
        onClose={() => setEventModal(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className="row">
            <div className="col-md-3 col-sm-4 item">
              <div className="form_field_wrapper date_time">
                <label>Start</label>
                <input type="date" className="form-control" value={startDate} onChange={(e) => { startDateSet(e) }} />
              </div>
            </div>
            <div className="col-md-3 col-sm-4 item">
              <div className="form_field_wrapper date_time">
                <label>Time</label>
                <div className="d-flex align-items-center">
                  <input type="time" className="form-control" style={{ marginRight: '7px' }} value={startTime} onChange={(e) => { startTimeSet(e) }} />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4302 5.93005L20.5002 12.0001L14.4302 18.0701" stroke="#5372E7" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.5 12H20.33" stroke="#5372E7" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

            </div>
            <div className="col-md-3 col-sm-4 item">
              <div className="form_field_wrapper date_time">
                <label>End</label>
                <input type="date" className="form-control" value={endDate} onChange={(e) => { endDateSet(e) }} />
              </div>
            </div>
            <div className="col-md-3 col-sm-4 item">
              <div className="form_field_wrapper date_time">
                <label>Time</label>
                <input type="time" className="form-control" value={endTime} onChange={(e) => { endTimeSet(e) }} />
              </div>
            </div>
            <div className="col-md-12 item">
              <div className="form_field_wrapper">
                <label>Principal</label>
                <select name="principle" id="principle" className="form-select" value={principle}
                  onChange={(event) => principleSet(event)}>
                  <option value="">Select</option>
                  {isPrinciple?.map((item: any) => (
                    <option  key={`select-${item?.id}`} value={item?.display_name}>
                      {item?.display_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-12 item">
              <div className="form_field_wrapper">
                <label>Task</label>
                <select name="task" id="task" className="form-select" value={task} onChange={(e) => taskSet(e)}>
                  <option value="">Select</option>
                  {events?.map((option: any) => (
                    <option  key={`event-${option?.id}`} value={option?.title}>
                      {option?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-12 item">
              <div className="form_field_wrapper">
                <label>Type</label>
                <select name="type" id="type" className="form-select" value={type} onChange={(e) => typeSet(e)}>
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="col-md-12 item">
              <div className="form_field_wrapper">
                <label>Hours</label>
                <input type="text" defaultValue={hour} className="form-control" />
              </div>
            </div>
            <div className="col-md-12 item">
              <div className="form_field_wrapper">
                <label>Activities Conducted</label>
                <textarea className="form-control" value={activity} onChange={(e) => activitySet(e)}></textarea>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-around">
            <>
              {isEditModal ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => editEvent()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 16V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Save
                  </button>

                  <button className="btn btn-danger" onClick={() => onDeleteModal()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18.85 9.13989L18.2 19.2099C18.09 20.7799 18 21.9999 15.21 21.9999H8.79002C6.00002 21.9999 5.91002 20.7799 5.80002 19.2099L5.15002 9.13989" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.33 16.5H13.66" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.5 12.5H14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => addNewEvent()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 16V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Save
                  </button>
                  {/* <button className="btn btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21.6698 14.3L21.2698 19.3C21.1198 20.83 20.9998 22 18.2898 22H5.70977C2.99977 22 2.87977 20.83 2.72977 19.3L2.32977 14.3C2.24977 13.47 2.50977 12.7 2.97977 12.11C2.98977 12.1 2.98977 12.1 2.99977 12.09C3.54977 11.42 4.37977 11 5.30977 11H18.6898C19.6198 11 20.4398 11.42 20.9798 12.07C20.9898 12.08 20.9998 12.09 20.9998 12.1C21.4898 12.69 21.7598 13.46 21.6698 14.3Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" />
                      <path d="M3.5 11.43V6.28003C3.5 2.88003 4.35 2.03003 7.75 2.03003H9.02C10.29 2.03003 10.58 2.41003 11.06 3.05003L12.33 4.75003C12.65 5.17003 12.84 5.43003 13.69 5.43003H16.24C19.64 5.43003 20.49 6.28003 20.49 9.68003V11.47" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.43018 17H14.5702" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Create and Open
                  </button> */}
                </>
              )}
            </>
            {/* <button onClick={() => undoChanges()} className="btn btn-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M7.62988 18.3101H15.6299C18.3899 18.3101 20.6299 16.0701 20.6299 13.3101C20.6299 10.5501 18.3899 8.31006 15.6299 8.31006H4.62988" stroke="#1D242D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.93012 10.8099L4.37012 8.24994L6.93012 5.68994" stroke="#1D242D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Undo Changes
            </button> */}
          </Box>
        </DialogActions>
      </Dialog>

      <DeleteEventDialog
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        deleteEvent={deleteEvent}
      />
    </>
  );
};
