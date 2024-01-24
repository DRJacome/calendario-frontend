import { types } from "../types/types";

const estadoInicial = {
    checking: true
    //uid:
    //name:
}

export const AuthReducer = (state = estadoInicial, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false,
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        case types.authLogout:
            return {
                checking: false
            }
        default:
            return state;
    }
}