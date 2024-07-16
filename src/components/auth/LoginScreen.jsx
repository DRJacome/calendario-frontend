import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { startLogin, startRegistro } from "../../actions/auth";
import "./login.css";
import Swal from "sweetalert2";

/* usuario: 
        loginEmail: 'david@gmail.com',
        loginPassword: 'abc123.'
*/

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [valoresFormularioLogin, gestionarLoginInput] = useForm({
        loginEmail: "",
        loginPassword: "",
    });

    const { loginEmail, loginPassword } = valoresFormularioLogin;

    const [valoresFormularioRegistro, gestionarRegistroInput] = useForm({
        registroName: "",
        registroEmail: "",
        registroPassword1: "",
        registroPassword2: "",
    });

    const {
        registroName,
        registroEmail,
        registroPassword1,
        registroPassword2,
    } = valoresFormularioRegistro;

    const gestionarLogin = (evento) => {
        evento.preventDefault();
        console.log(valoresFormularioLogin);
        dispatch(startLogin(loginEmail, loginPassword));
    };

    const gestionarRegistro = (evento) => {
        evento.preventDefault();

        // Controlamos que las contraseñas (primera contraseña introducida y contraseña repetida) sean iguales.
        if (registroPassword1 !== registroPassword2) {
            /* Formato de alertas de Swal:
             * Swal.fire('argumento1', 'argumento2', 'argumento3');
             *  Swal.fire('TítuloAlerta', 'TextoExplicativoAlerta', 'iconoAlerta');
             */
            return Swal.fire(
                "Error!",
                "Las contraseñas deben ser iguales",
                "error"
            );
        }
        console.log("?");
        dispatch(startRegistro(registroName, registroEmail, registroPassword1));
    };

    return (
        <main className='container login-container'>
            <header className='titulo'>
                <h1>Calendario MERN</h1>
                <hr />
            </header>
            <section className='row'>
                <article className='col-md-6 login-form-1'>
                    <h3>Iniciar sesión</h3>
                    <form onSubmit={gestionarLogin}>
                        <div className='form-group mb-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Correo electrónico'
                                name='loginEmail'
                                value={loginEmail}
                                onChange={gestionarLoginInput}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='loginPassword'
                                value={loginPassword}
                                onChange={gestionarLoginInput}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='submit'
                                className='btnSubmit'
                                value='Login'
                            />
                        </div>
                    </form>
                </article>

                <article className='col-md-6 login-form-2'>
                    <h3>Registrarse</h3>
                    <form onSubmit={gestionarRegistro}>
                        <div className='form-group mb-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre'
                                name='registroName'
                                value={registroName}
                                onChange={gestionarRegistroInput}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Correo'
                                name='registroEmail'
                                value={registroEmail}
                                onChange={gestionarRegistroInput}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='registroPassword1'
                                value={registroPassword1}
                                onChange={gestionarRegistroInput}
                            />
                        </div>

                        <div className='form-group mb-2'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Repita la contraseña'
                                name='registroPassword2'
                                value={registroPassword2}
                                onChange={gestionarRegistroInput}
                            />
                        </div>

                        <div className='form-group mb-2'>
                            <input
                                type='submit'
                                className='btnSubmit'
                                value='Crear cuenta'
                            />
                        </div>
                    </form>
                </article>
            </section>
        </main>
    );
};
