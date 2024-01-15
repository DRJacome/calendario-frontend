import React from 'react'

export const NavBar = () => {
    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>David</span>
            <button className='btn btn-outline-danger'>
                <i className='fas fa-sign-out-alt mr-2'></i>
                Salir</button>
        </div>
    )
}