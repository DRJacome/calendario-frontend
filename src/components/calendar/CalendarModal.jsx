import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import { uiCloseModal } from '../../actions/ui';
import { customStyles } from '../../customStyles/customStyles';
import moment from 'moment';
import Swal from 'sweetalert2'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { addNewEvent, clearActiveEvent, updateEvent } from '../../actions/eventos';



const horaInicio = moment().minutes(0).seconds(0).add(1, 'hours');
const horaFinalizacion = horaInicio.clone().add(1, 'hours');
const eventoInicial = {
    title: '',
    notes: '',
    start: horaInicio.toDate(),
    end: horaFinalizacion.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [fechaInicio, setFechaInicio] = useState(horaInicio.toDate());
    const [fechaFin, setFechaFin] = useState(horaFinalizacion.toDate());
    const [tituloEventoValido, setTituloEventoValido] = useState(true)

    const [valoresFormulario, setValoresFormulario] = useState(eventoInicial);

    const { title, notes, start, end } = valoresFormulario;

    // Si existe un evento existente, se muestra en pantalla al seleccionarlo.
    useEffect(() => {
        if (activeEvent) {
            setValoresFormulario(activeEvent);
        } else {
            setValoresFormulario(eventoInicial)
        }
    }, [activeEvent, setValoresFormulario])

    const manejarCambioInput = ({ target }) => {
        setValoresFormulario({
            ...valoresFormulario,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(clearActiveEvent());
        setValoresFormulario(eventoInicial);
    }

    const manejarCambioFechaInicio = (e) => {
        setFechaInicio(e)
        setValoresFormulario({
            ...valoresFormulario,
            start: e
        })
    }

    const manejarCambioFechaFinalizacion = (e) => {
        setFechaFin(e);
        setValoresFormulario({
            ...valoresFormulario,
            end: e
        })
    }

    const manejarGuardarDatosFormulario = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha de finalización debe ser posterior a la de inicio', 'error');
        }

        if (title.trim().length < 2) {
            return setTituloEventoValido(false);
        }

        // Realizar grabación de datos.
        if (activeEvent) {
            // Actualizar evento existente.
            dispatch(updateEvent(valoresFormulario))
        } else {
            // Crear nuevo evento.
            dispatch(addNewEvent(
                {
                    ...valoresFormulario,
                    id: new Date().getTime(),
                    user: {
                        _id: '123',
                        name: 'David'
                    }
                }
            ));
        }

        setTituloEventoValido(true);
        closeModal();
    }
    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1 className='pl-2'>{(activeEvent) ? 'Editar evento' : 'Nuevo evento'}</h1>
            <hr />
            <form
                className="container"
                onSubmit={manejarGuardarDatosFormulario}
            >
                <div className="form-group mb-2">
                    <label>Fecha de inicio</label>
                    <DateTimePicker
                        onChange={manejarCambioFechaInicio}
                        value={fechaInicio}
                        className="form-control"
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Fecha de finalización</label>
                    <DateTimePicker
                        onChange={manejarCambioFechaFinalizacion}
                        value={fechaFin}
                        minDate={fechaInicio}
                        className="form-control"
                    />
                </div>
                <hr />
                <div className="form-group mb-2">
                    <label>Título y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!tituloEventoValido && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={manejarCambioInput}
                    />
                    <small id="emailHelp" className="form-text text-muted">Añade una descripción corta</small>
                </div>
                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={manejarCambioInput}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
}