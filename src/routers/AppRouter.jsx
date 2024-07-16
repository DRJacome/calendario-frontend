import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import { LoadingScreen } from "../components/auth/LoadingScreen";
import { RutaPublica } from "./RutaPublica";
import { RutaPrivada } from "./RutaPrivada";

export const AppRouter = () => {
    const { checking, uid } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <LoadingScreen />;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <RutaPublica
                        exact
                        path='/login'
                        component={LoginScreen}
                        /* !! es una doble negación que comprueba si uid, que es un string,
                         * está vacío o no. Como no lo está, "!!uid" devuelve false,
                         * convirtiendo la evaluación de una variable que contiene un string en un booleano.
                         */
                        isAutenticado={!!uid}
                    />
                    <RutaPrivada
                        exact
                        path='/'
                        component={CalendarScreen}
                        isAutenticado={!!uid}
                    />

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
};
