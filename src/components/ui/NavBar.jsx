import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const NavBar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);
    const gestionarLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>{name}</span>
            <button
                className='btn btn-outline-danger'
                onClick={gestionarLogout}
            >
                <i className='fas fa-sign-out-alt mr-2' />
                Salir
            </button>
        </div>
    )
}