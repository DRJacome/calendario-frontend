import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepararEventos } from "../helpers/prepararEventos";
import { types } from "../types/types";


export const eventStartAddNew = (evento) => {

    // Esta es la acción asíncrona que será ejecutada por Redux Thunk
    return async (dispatch, getState) => {

        // Obtiene el uid (identificador de usuario) y el nombre del estado de autenticación
        const { uid, name } = getState().auth;
        try {

            // Realiza una solicitud a la API para agregar un nuevo evento
            const respuesta = await fetchConToken('eventos', evento, 'POST');

            // Parsea el cuerpo de la respuesta como JSON
            const mensaje = await respuesta.json();

            console.log(mensaje);

            // Si la respuesta es exitosa (body.ok es verdadero), procede con el dispatch (actualización del estado de la aplicación) del nuevo evento
            if (mensaje.ok) {

                // Asigna el id del evento y la información del usuario al evento
                evento.id = mensaje.evento.id;
                evento.user = {
                    _id: uid,
                    name: name
                }

                // Dispatch de la acción addNewEvent que agrega el nuevo evento al estado
                dispatch(addNewEvent(evento));
            }
        } catch (error) {
            // Captura y maneja errores, por ejemplo, mostrándolos en la consola
            console.log(error);
        }
    }
};

const addNewEvent = (evento) => ({
    type: types.addNewEvent,
    payload: evento
});

export const setActiveEvent = (evento) => ({
    type: types.setActiveEvent,
    payload: evento
});

export const clearActiveEvent = () => ({
    type: types.clearActiveEvent
});

export const eventStartUpdate = (evento) => {
    return async (dispatch) => {
        try {
            console.log(evento);
            const respuesta = await fetchConToken(`eventos/${evento.id}`, evento, 'PUT');
            const mensaje = await respuesta.json();

            if (mensaje.ok) {
                dispatch(updateEvent(evento));
            } else {
                Swal.fire('Error!', mensaje.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
};

const updateEvent = (evento) => ({
    type: types.updateEvent,
    payload: evento
});

export const eventStartDelete = (evento) => {
    return async (dispatch, getState) => {

        const { id } = getState().calendar.activeEvent;
        console.log(id);

        try {
            const respuesta = await fetchConToken(`eventos/${id}`, {}, 'DELETE');
            const mensaje = await respuesta.json();
            console.log(mensaje);
            if (mensaje.ok) {
                dispatch(deleteEvent());
                Swal.fire('Éxito!', mensaje.msg, 'success');
            } else {
                Swal.fire('Error!', mensaje.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteEvent = () => ({ type: types.deleteEvent });

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const respuesta = await fetchConToken('eventos');
            const mensaje = await respuesta.json();

            const eventos = prepararEventos(mensaje.eventos);

            dispatch(loadEvent(eventos));
        } catch (error) {
            console.log(error);
        }
    }
};

const loadEvent = (eventos) => ({
    type: types.loadEvent,
    payload: eventos

})

export const eventLogout = () => ({ type: types.eventLogout });
