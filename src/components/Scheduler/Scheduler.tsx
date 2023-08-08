import React, { useEffect, useState, useRef, useMemo } from "react";
import { useViewItems } from '@rapid/sdk/lib/store';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventDialog } from "../AddEditEvent/EventDialog";
import './Scheduler.css';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.css';
import { addHours, parse, format } from 'date-fns';
import { ListItemMixin, getListItem } from "@rapid/sdk/lib/store/list-item";
import { getViewDataByName } from "@rapid/sdk/lib/store/view";

interface IEvent {
    id: string;
    title?: string;
    priority?: string;
    backgroundColor?: string;
    start?: string;
    end?: string;
    classNames?: string;
}

const externalEvents: IEvent[] = [
    {
        id: '1',
        title: 'Event Low Priority',
        priority: 'Low',
        backgroundColor: '#FFFDF1',
    },
    {
        id: '2',
        title: 'Event Meduim Priority',
        priority: 'Meduim',
        backgroundColor: '#FFF5E9',
    },
    {
        id: '3',
        title: 'Event High Priority',
        priority: 'High',
        backgroundColor: '#E6F8EF',
    },
    {
        id: '4',
        title: 'Event Critical Priority',
        priority: 'Critical',
        backgroundColor: '#e5d9f3',
    },
];

const Schedular = () => {
    const calanderRef = useRef<FullCalendar>(null);

    const [tasksViewSnap, tasksViewProxy] = useViewItems('Time Logs', 'All');

    const events = useMemo(function mapTasksToEvents() {
        return tasksViewSnap.map<ListItemMixin, IEvent>(item => ({
            id: item.id?.toString()!,
            title: item?.title,
            start: item?.start_date,
            end: item?.due_date,
            classNames: item?.priority === 'Low' ? 'priority-low' : item?.priority === 'Medium' ? 'priority-Medium' : item?.priority === 'High' ? 'priority-High' : 'priority-Critical',
        }));

    }, [tasksViewSnap]);

    const [event, setEvent] = React.useState<Partial<IEvent>>({});
    const [isEditModal, setIsEditModal] = React.useState(false);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [principle, setPrinciple] = React.useState("");
    const [task, setTask] = React.useState("")
    const [type, setType] = React.useState("");
    const [hour, setHour] = React.useState("");
    const [activity, setActivity] = React.useState("");
    const [eventModal, setEventModal] = React.useState(false);

    const [isDeleteModal, setIsDeleteModal] = React.useState(false);

    const [isPrinciple, setIsPrinciple] = useState<ListItemMixin[]>([]);

    useEffect(() => {
        tasksViewProxy.get({$filter: `assigned_to_id eq ${}`});

        getViewDataByName('Principals', 'All').get().then(res => {
            setIsPrinciple(res.map<ListItemMixin, ListItemMixin>(principal => principal));
        });
    }, []);

    useEffect(() => {
        undoChanges();
    }, [!eventModal]);

    useEffect(() => {
        const draggableEl: any = document.getElementById('external-events');

        new Draggable(draggableEl, {
            itemSelector: '.fc-event',
            eventData(eventEl) {
                const eventId = eventEl.dataset.eventId;
                const externalEvent: any = externalEvents.find((event) => event.id === eventId);
                // setEvent(externalEvent.id);
                setType(externalEvent?.priority)
                setActivity(externalEvent?.title)
                return {
                    title: externalEvent?.title,
                    backgroundColor: externalEvent?.backgroundColor,
                    // border: externalEvent?.border,
                    // borderTopColor: externalEvent?.borderTopColor
                };
            },
        });
    }, []);

    const addNewEvent = () => {
        const newItem = getListItem('Tasks');

        const startdateString = `${startDate} ${startTime}`;
        const startDateObj = new Date(startdateString);
        const startIso8601String = startDateObj?.toISOString();

        const endDateString = `${endDate} ${endTime}`;
        const endDateObj = new Date(endDateString);
        const endIso8601String = endDateObj?.toISOString();

        const taskValue = events?.find((option) => option?.title === task);
        const assigneValue = isPrinciple?.find((option) => option?.display_name === principle);

        const payload = {
            "parent": taskValue?.title ? taskValue?.title : '',
            "parent_id": taskValue?.id ? taskValue?.id : '',
            "title": activity,
            "start_date": startIso8601String,
            "due_date": endIso8601String,
            "assigned_to_id": assigneValue?.id ? assigneValue?.id : '',
            "priority": type,
        }

        Object.assign(newItem, payload);

        newItem.save();
    };

    const editEvent = () => {
        setIsEditModal(false);
        setEventModal(false);

        const taskValue = events?.find((option) => option?.title === task);

        if (!taskValue?.id) {
            console.warn('Cannot edit task without Id. Skipping');
            return;
        }

        const item = getListItem('Tasks', +taskValue.id);

        const assigneValue = isPrinciple?.find((option) => option?.display_name === principle);

        const startdateString = `${startDate} ${startTime}`;
        const startDateObj = new Date(startdateString);
        const startIso8601String = startDateObj?.toISOString();

        const endDateString = `${endDate} ${endTime}`;
        const endDateObj = new Date(endDateString);
        const endIso8601String = endDateObj?.toISOString();

        const payload = {
            "title": activity,
            "start_date": startIso8601String,
            "due_date": endIso8601String,
            "assigned_to_id": assigneValue?.id,
            "priority": type,
        }

        Object.assign(item, payload);

        item.save();
    };

    const deleteEvent = () => {
        if (!event.id) {
            console.warn('Cannot delete event without an id. Skipping.');
            return;
        }

        const item = getListItem('Tasks', +event.id);

        item.delete();
    }

    const undoChanges = () => {
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
        setPrinciple("");
        setTask("");
        setType("");
        setHour("");
        setActivity("");
    }

    const handleEventDrop = () => {
        addNewEvent()
    }

    const handleEventDrop12 = (eventInfo: any) => {
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");

        const item = getListItem('Tasks', eventInfo.event.id);

        const dateObject = new Date(eventInfo?.event?.start);
        const formattedDateString = dateObject.toISOString();

        const dateObject1 = new Date(eventInfo?.event?.end);
        const formattedDateString1 = dateObject1.toISOString();

        const payload = {
            "start_date": formattedDateString,
            "due_date": formattedDateString1,
        }

        Object.assign(item, payload);

        item.save();
    };

    const handleEventClick = (info: any) => {
        setEvent(info?.event);
        setIsEditModal(true);
        setEventModal(true);
    };

    const handleDateSelect = (info: any) => {
        setIsEditModal(false);
        setEventModal(true);
    };

    const renderEventContent = (eventInfo: any) => {
        const { title, start, end } = eventInfo?.event;
        const startTime = start?.toLocaleString([], { timeStyle: 'short' });
        const endTime = end?.toLocaleString([], { timeStyle: 'short' });
        let formattedTime: any;
        if (end === null) {
            const parsedTime = parse(startTime, 'h:mm a', new Date(start));
            const resultTime = addHours(parsedTime, 1);
            formattedTime = format(resultTime, 'h:mm a');
            setStartDate(start?.toISOString()?.split('T')[0]);
            setEndDate(resultTime?.toISOString()?.split('T')[0]);
            setStartTime(start?.toTimeString()?.split(' ')[0])
            setEndTime(resultTime?.toTimeString()?.split(' ')[0])
            setPrinciple("");
            setTask("");
        }
        // const startDate = new Date(start);
        // const endDate = new Date(end);

        // const hoursDifference = differenceInHours(endDate, startDate);
        // console.log('eventInfo ', hoursDifference)

        return (
            <>
                <div>{title}</div>
                <div className='d-flex'>
                    <div style={{ paddingRight: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6668 8.00004C14.6668 11.68 11.6802 14.6667 8.00016 14.6667C4.32016 14.6667 1.3335 11.68 1.3335 8.00004C1.3335 4.32004 4.32016 1.33337 8.00016 1.33337C11.6802 1.33337 14.6668 4.32004 14.6668 8.00004Z" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.4734 10.12L8.40675 8.88671C8.04675 8.67338 7.75342 8.16005 7.75342 7.74005V5.00671" stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>{startTime} to {end !== null ? endTime : formattedTime}</div>
                </div>
            </>
        );
    };

    return (
        <div className="calender_main_wrapper">

            <div className="my_calender_wrapper">
                <div id="external-events" className="external-events-data">
                    {externalEvents?.map((event) => (
                        <div
                            key={`external-event-${event?.id}`}
                            data-event-id={event?.id}
                            className="fc-event"
                            style={{
                                backgroundColor: event?.backgroundColor,
                                marginBottom: '18px',
                                padding: '10px',
                            }}
                        >
                            {event?.title}
                        </div>
                    ))}
                </div>
                <div className="my_calender">
                    <FullCalendar
                        ref={calanderRef}
                        // dateClick={handleDateClick}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={5}
                        weekends={true}
                        eventClick={handleEventClick}
                        select={handleDateSelect}
                        eventDrop={handleEventDrop12}
                        headerToolbar={
                            {
                                center: "title",
                                right: "timeGridWeek,timeGridDay",
                                left: "prev,today,next"
                            }}

                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        events={events}
                        eventContent={renderEventContent}
                        drop={handleEventDrop}
                    />
                </div>

                <EventDialog
                    eventModal={eventModal}
                    setEventModal={setEventModal}
                    setStartDate={setStartDate}
                    startDate={startDate}
                    setStartTime={setStartTime}
                    startTime={startTime}
                    setEndDate={setEndDate}
                    endDate={endDate}
                    setEndTime={setEndTime}
                    endTime={endTime}
                    setPrinciple={setPrinciple}
                    principle={principle}
                    setTask={setTask}
                    task={task}
                    setType={setType}
                    type={type}
                    setHour={setHour}
                    hour={hour}
                    setActivity={setActivity}
                    activity={activity}
                    addNewEvent={addNewEvent}
                    editEvent={editEvent}
                    isEditModal={isEditModal}
                    events={events}
                    isPrinciple={isPrinciple}
                    deleteEvent={deleteEvent}
                    setIsDeleteModal={setIsDeleteModal}
                    isDeleteModal={isDeleteModal}
                    undoChanges={undoChanges}
                    event={event}
                />
            </div>
        </div>
    );
};

export default Schedular 
