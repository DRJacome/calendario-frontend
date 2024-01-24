import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";
import { eventLogout } from "./eventos";

/* En esta app habrá dos tipos de peticiones: con o sin token.
    En este archivo se comprobará si la acción disparada por la petición http es para
    traer información desde el backend (FETCH), o para enviar (POSTEAR) datos al servidor 
    junto con los datos del usuario.
*/

/*  Función de fecha. La función que devuelve es una tarea asíncrona, por lo que se debe indicar 
que el return debe ser async + usar thunk para que el return se vuelva a disparar. */
export const startLogin = (email, password) => {
    return async (dispatch) => {

        /* const respuesta = await fetchSinToken('endpoint', datosAEnviar, métodoDeEnvío/Recepción) */
        const respuesta = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await respuesta.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error!\n El correo y/o la contraseña no son válidos', body.msg, 'error');
        }
    }
}
export const startRegistro = (name, email, password) => {
    return async (dispatch) => {
        const respuesta = await fetchSinToken('auth/new', { name, email, password }, 'POST');
        const body = await respuesta.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error!', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        const respuesta = await fetchConToken('auth/renew');
        const body = await respuesta.json();

        console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(eventLogout());
        dispatch(logout());
    };
};

const logout = () => ({ type: types.authLogout });