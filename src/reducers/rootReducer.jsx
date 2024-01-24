import { combineReducers } from 'redux'
import { CalendarReducer } from './CalendarReducer'
import { UiReducer } from './UiReducer'
import { AuthReducer } from './AuthReducer'

export const RootReducer = combineReducers({
    ui: UiReducer,
    calendar: CalendarReducer,
    auth: AuthReducer
})