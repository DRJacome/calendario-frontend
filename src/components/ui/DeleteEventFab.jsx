import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/eventos'

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const manejarClickBorrarEvento = () => {
        dispatch(eventStartDelete());
    }
    return (
        <button className='btn btn-danger fab-danger fadein' onClick={manejarClickBorrarEvento}>
            <i className='fas fa-trash pr-2'></i>
            <span>Borrar evento</span>
        </button>
    )
}