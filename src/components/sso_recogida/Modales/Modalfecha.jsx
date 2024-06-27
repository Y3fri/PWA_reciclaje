import React, { useState, useEffect, useRef } from 'react';
import { updatesso_recogida } from '../../../service/sso_recogida';
import './ModalReg.css';

const ModalFecha = ({ closeModal, updatessorecogidaList, ssorecogidaId, sso_recogidas }) => {
    const [formData, setFormData] = useState({
        sreg_idcliente: 0,
        sreg_idestado: 0,
        sreg_idrecogida: 0,
        sreg_idtrabajador: "",
        sreg_puntos: 0,
        sreg_peso: 0,
        sreg_fecha: "",
        sreg_hora1: "",
        sreg_hora2: "",
        sreg_asignacion: true,
        sso_cliente: {
            cli_id: 0,
            cli_estado: 0,
            cli_correo: "",
            cli_documento: "",
            cli_nombres: "",
            cli_apellidos: "",
            cli_nickname: "",
            cli_clave: "",
            cli_telefono: "",
            cli_totalpuntos: 0,
            estado: {
                est_id: 0,
                est_nombre: ""
            }
        },
        estado: {
            est_id: 0,
            est_nombre: ""
        },
        sso_usuario: {
            usu_id: 0,
            usu_estado: 0,
            usu_rol: 0,
            usu_correo: "",
            usu_documento: "",
            usu_nombres: "",
            usu_apellidos: "",
            usu_nickname: "",
            usu_clave: "",
            usu_latitud: 0,
            usu_longitud: 0,
            usu_fechahora: "",
            estado: {
                est_id: 0,
                est_nombre: ""
            },
            rol: {
                rol_id: 0,
                rol_nombre: ""
            }
        },
        recogida: {
            reg_id: 0,
            reg_idcomuna: 0,
            reg_plastico: true,
            reg_papel: true,
            reg_carton: true,
            reg_metal: true,
            reg_vidrio: true,
            reg_ubicacion_lag: 0,
            reg_ubicacion_log: 0,
            reg_numero: "",
            reg_direccion: "",
            reg_barrio_conjunto: "",
            comuna: {
                com_id: 0,
                com_nombre: ""
            }
        }
    });

    const [currentRecogida, setCurrentRecogida] = useState(null);   
    

    useEffect(() => {       
        if (ssorecogidaId && sso_recogidas) {
            const recogidaToUpdate = sso_recogidas.find(sso_recogida => sso_recogida.sreg_id === ssorecogidaId);
            setCurrentRecogida(recogidaToUpdate);
        }
    }, [ssorecogidaId, sso_recogidas]);

    useEffect(() => {
        if (currentRecogida) {
            setFormData(prevFormData => ({
                ...prevFormData,
                sreg_idcliente: currentRecogida.sreg_idcliente,
                sreg_idestado: currentRecogida.sreg_idestado,
                sreg_idrecogida: currentRecogida.sreg_idrecogida,
                sreg_idtrabajador: currentRecogida.sreg_idtrabajador,
                sreg_puntos: currentRecogida.sreg_puntos,
                sreg_peso: currentRecogida.sreg_peso,
                sreg_fecha: currentRecogida.sreg_fecha,
                sreg_hora1: currentRecogida.sreg_hora1,
                sreg_hora2: currentRecogida.sreg_hora2,
                sreg_asignacion: currentRecogida.sreg_asignacion,
            }));
        }
    }, [currentRecogida]);


    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (ssorecogidaId) {
                await updatesso_recogida(ssorecogidaId, formData);
            } else {
                console.error("Error al enviar el formulario:");
            }
            updatessorecogidaList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
        }
    };



    return (
        <div className="modal-container">
            <div className="modal-content-details-fecha">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Asignar Recogida</h2>
                <form onSubmit={handleSubmit} >                    
                            <div className='container-details'>
                                <div className='row1-fecha'>
                                   
                                    <label className="form-label">Fecha:</label>
                                    <input
                                        type="date"
                                        name="sreg_fecha"
                                        value={formData.sreg_fecha}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    <label className="form-label">Hora Inicio:</label>
                                    <input
                                        type="time"
                                        name="sreg_hora1"
                                        value={formData.sreg_hora1}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    <label className="form-label">Hora Fin:</label>
                                    <input
                                        type="time"
                                        name="sreg_hora2"
                                        value={formData.sreg_hora2}
                                        onChange={handleChange}
                                        className="form-input"
                                    />                                  

                               </div>
                            </div>
                


                    <button type="submit" className="form-button">Guardar cambios</button>
                    <button type="button" onClick={closeModal} className="close-modal-button">Cerrar</button>
                </form>
                
        </div>
        </div>
    );
};

export default ModalFecha;
