import { types } from '../types/types';

/* 
{
            id: 425134613312,
            title: 'Cumpleaños del jefe',
            start : moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'Comprar tarta de cumpleaños',
            user: {
                _id: '123',
                name: 'David'
            }
        }
*/

const estadoInicial = {
    events: [],
    activeEvent: null
};

export const CalendarReducer = (state = estadoInicial, action) => {
    switch (action.type) {
        case types.setActiveEvent:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.addNewEvent:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.clearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.updateEvent:
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) ? action.payload : event
                )
            }
        case types.deleteEvent:
            return {
                ...state,
                events: state.events.filter(
                    event => (event.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }
        case types.loadEvent:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.eventLogout:
            return {
                ...estadoInicial
            }
        default:
            return state;
    }
}