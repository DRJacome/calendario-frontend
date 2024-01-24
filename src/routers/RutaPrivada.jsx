import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

export const RutaPrivada = ({
    isAutenticado,
    component: Component,
    ...propiedadesComponente
}) => {

    localStorage.setItem('lastPath', propiedadesComponente.location.pathname)
    return (
        <Route {...propiedadesComponente}
            component={(props) => (
                /* Si el usuario está autenticado, se renderiza el componente al que el usuario quiere entrar:
                * si no lo está, se le redirige a la ventana de login */
                (isAutenticado)
                    ? (<Component {...props} />)
                    : (<Redirect to='/login' />)
            )}
        />
    )
}

RutaPrivada.propTypes = {
    isAutenticado: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}