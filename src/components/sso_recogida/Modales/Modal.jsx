import React, { useState, useEffect, useRef } from 'react';
import { updatesso_recogida } from '../../../service/sso_recogida';
import { listbyRol } from '../../../service/Login_usu';
import { listsso_recogida_id } from '../../../service/sso_recogida'
import './ModalReg.css';

const ModalReg = ({ closeModal, updatessorecogidaList, ssorecogidaId, sso_recogidas }) => {
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
    const [Rols, setRols] = useState([]);
    const [recogidaData, setRecogidaData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Comienza la carga

                const recogidaDataResponse = await listsso_recogida_id(ssorecogidaId);
                setRecogidaData(recogidaDataResponse[0]);

                const rolesResponse = await new Promise(resolve => listbyRol(resolve));
                setRols(rolesResponse);

                setIsLoading(false); // Finaliza la carga
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.message);
                setIsLoading(false); // Finaliza la carga en caso de error
            }
        };

        fetchData();

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
               
                sreg_asignacion: currentRecogida.sreg_asignacion,
            }));
        }
    }, [currentRecogida]);


    useEffect(() => {
        const loadGoogleMapsScript = (callback) => {
            const existingScript = document.getElementById('googleMaps');

            if (!existingScript) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3nyk6nTd7q1T8KITva0WNy0jHSFOAet4&libraries=places`;
                script.id = 'googleMaps';
                document.body.appendChild(script);

                script.onload = () => {
                    if (callback) callback();
                };
            } else if (callback) callback();
        };

        const initMap = () => {
            if (recogidaData && mapRef.current) {
                const { latitud, longitud } = recogidaData;
                const map = new window.google.maps.Map(mapRef.current, {
                    center: { lat: latitud, lng: longitud },
                    zoom: 15,
                });
                new window.google.maps.Marker({
                    position: { lat: latitud, lng: longitud },
                    map,
                });
            }
        };

        loadGoogleMapsScript(initMap);
    }, [recogidaData]);

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
            setIsLoading(true)
            if (ssorecogidaId) {
                
                await updatesso_recogida(ssorecogidaId, formData);
                
            } else {
                console.error("Error al enviar el formulario:");
            }
            
            updatessorecogidaList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
        }finally{
            setIsLoading(false);
        }
    };



    return (
        <div className="modal-container">
            <div className="modal-content-details">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Asignar Recogida</h2>
                <form onSubmit={handleSubmit} >

                    {recogidaData && (
                        <>
                            <div className='container-details'>
                                <div className='row1'>
                                    <div className="recogida-data">
                                        <p><strong>Cliente:</strong> {recogidaData.nombre_cliente} {recogidaData.apellido_cliente}</p>
                                        <p><strong>Número:</strong> {recogidaData.numero}</p>
                                    </div>
                                    <h2>Materiales</h2>
                                    <div className="recogida-materiales">
                                        <p><strong>Plástico:</strong>
                                            {recogidaData.plastico === true ? (
                                                <button className="button-circle-green">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M5 12l5 5l10 -10" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button className="button-circle-red">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M18 6l-12 12" />
                                                        <path d="M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </p>
                                        <p><strong>Papel:</strong> {recogidaData.papel === true ? (
                                            <button className="button-circle-green">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 12l5 5l10 -10" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button className="button-circle-red">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M18 6l-12 12" />
                                                    <path d="M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                        </p>
                                        <p><strong>Cartón:</strong>{recogidaData.carton === true ? (
                                            <button className="button-circle-green">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 12l5 5l10 -10" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button className="button-circle-red">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M18 6l-12 12" />
                                                    <path d="M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                        </p>
                                        <p><strong>Metal:</strong> {recogidaData.metal === true ? (
                                            <button className="button-circle-green">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 12l5 5l10 -10" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button className="button-circle-red">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M18 6l-12 12" />
                                                    <path d="M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                        </p>
                                        <p><strong>Vidrio:</strong> {recogidaData.vidrio === true ? (
                                            <button className="button-circle-green">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M5 12l5 5l10 -10" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button className="button-circle-red">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M18 6l-12 12" />
                                                    <path d="M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                        </p>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">Trabajador: {formData.sreg_asignacion || (
                                                <span className="form-message">*</span>
                                            )}</label>
                                            <select
                                                name="sreg_idtrabajador"
                                                value={formData.sreg_idtrabajador}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Seleccione un trabajador</option>
                                                {Rols && Rols.map(usu => (
                                                    usu.usu_nombres !== "NULL" && (
                                                        <option key={usu.usu_id} value={usu.usu_id}>
                                                            {usu.usu_nombres}
                                                        </option>
                                                    )
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Asignación:  {formData.sreg_asignacion || (
                                                <span className="form-message">*</span>
                                            )}</label>
                                            <input
                                                type="checkbox"
                                                name="sreg_asignacion"
                                                checked={formData.sreg_asignacion}
                                                onChange={handleChange}
                                                className="form-checkbox"
                                                disabled={
                                                    !formData.sreg_idtrabajador ||
                                                    (Rols && Rols.some(usu => usu.usu_id === formData.sreg_idtrabajador && (usu.usu_nombres === "NULL" || usu.usu_nombres === "")))
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <label className="form-label">Fecha:</label>
                                    <input
                                        type="date"
                                        name="sreg_fecha"
                                        value={formData.sreg_fecha}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                    <label className="form-label">Hora Inicio:</label>
                                    <input
                                        type="time"
                                        name="sreg_hora1"
                                        value={formData.sreg_hora1}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                    <label className="form-label">Hora Fin:</label>
                                    <input
                                        type="time"
                                        name="sreg_hora2"
                                        value={formData.sreg_hora2}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                    <p className="form-text"> { }</p>
                                    {formData.sreg_asignacion || (
                                        <p className="form-message">Activa la asignación para poder guardar cambios.</p>
                                    )}
                                </div>

                                <div className='row2'>
                                    <h2>Ubicación</h2>
                                    <div id="map" ref={mapRef} style={{ width: '100%', height: '330px' }}></div>
                                    <div className="recogida-data">
                                        <p><strong>Comuna:</strong> {recogidaData.comuna}</p>

                                    </div>
                                    <div className='recogida-data'>
                                        <p><strong>Dirección o apartamento:</strong> {recogidaData.direccion}</p>
                                        <p><strong>Barrio o conjunto:</strong> {recogidaData.barrio_conjunto}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}


                    <button type="submit" className="form-button" disabled={!formData.sreg_asignacion}>Guardar cambios</button>
                    <button type="button" onClick={closeModal} className="close-modal-button">Cerrar</button>
                </form>
                {isLoading && (
                    <div className="LoadingModal">
                        <div className="LoadingSpinner"></div>
                    </div>
                )}
               
            </div>
        </div>

    );
};

export default ModalReg;
