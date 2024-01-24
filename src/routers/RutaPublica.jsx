import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export const RutaPublica = ({
    isAutenticado,
    component: Component,
    ...propiedadesComponente
}) => {

    return (
        <Route {...propiedadesComponente}
            component={(props) => (
                /* Si el usuario está autenticado, se renderiza el componente al que el usuario quiere entrar:
                * si no lo está, se le redirige a la ventana de login */
                (!isAutenticado)
                    ? (<Component {...props} />)
                    : (<Redirect to='/' />)
            )}
        />
    )
}

RutaPublica.propTypes = {
    isAutenticado: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}