import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const manejarClickNuevoEvento = () => {
        dispatch(uiOpenModal())
    }
    return (
        <button className='btn btn-primary fab' onClick={manejarClickNuevoEvento}>
            <i className='fas fa-plus'></i>
        </button>
    )
}