import { types } from '../types/types';

const estadoInicial = {
    modalOpen: false
}

export const UiReducer = (state = estadoInicial, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
        default:
            return state
    }
}