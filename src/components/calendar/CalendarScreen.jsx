import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { NavBar } from "../ui/NavBar";
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { clearActiveEvent, eventStartLoading, setActiveEvent } from '../../actions/eventos';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es')

const localizer = momentLocalizer(moment);
/* const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar tarta de cumpleaños',
    user: {
        _id: '123',
        name: 'David'
    }
}]; */

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    // Leer del store los eventos
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { uid } = useSelector(state => state.auth);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);


    const onDoubleClick = (event) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (event) => {
        dispatch(setActiveEvent(event));
    }

    const onViewChange = (event) => {
        setLastView(event)
        localStorage.setItem('lastView', event)
    }

    const onSelectSlot = (event) => {
        dispatch(clearActiveEvent());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            color: 'white',
            display: 'block',
            opacity: 0.8,
        }
        return { style };
    }
    return (
        <div className='calendar-screen'>
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            {
                (activeEvent) && <DeleteEventFab />
            }
            <CalendarModal />
        </div>
    )
}