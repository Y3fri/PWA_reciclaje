import React, { useState, useEffect, useRef } from 'react';
import { listsso_recogida_id } from '../../../service/sso_recogida'
import './ModalReg.css';

const ModalRegDeta = ({ closeModal, ssorecogidaId }) => {


    const [recogidaData, setRecogidaData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Comienza la carga

                const recogidaDataResponse = await listsso_recogida_id(ssorecogidaId);
                setRecogidaData(recogidaDataResponse[0]);

                setIsLoading(false); // Finaliza la carga
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.message);
                setIsLoading(false); // Finaliza la carga en caso de error
            }
        };

        fetchData();

    }, [ssorecogidaId]);

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
    return (
        <div className="modal-container">
            <div className="modal-content-details">

                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Detalles recogida</h2>

                {recogidaData && (
                    <>
                        <div className='container-details'>
                            <div className='row1'>
                                <div className="recogida-data">
                                    <p><strong>Cliente:</strong> {recogidaData.nombre_cliente} {recogidaData.apellido_cliente}</p>
                                    <p><strong>Número:</strong> {recogidaData.numero}</p>
                                </div>
                                <div className="recogida-data">
                                    <p><strong>Trabajador:</strong> {recogidaData.nombre_trabajador} {recogidaData.apellido_trabajador}</p>
                                </div>
                                <h2>Horario</h2>
                                <div className="recogida-data">
                                    <p><strong>Fecha:</strong> {recogidaData.sreg_fecha} </p>
                                </div>
                                <div className='recogida-data'>
                                    <p><strong>Hora Inicio:</strong> {recogidaData.sreg_hora1} </p>
                                    <p><strong>Hora Fin:</strong> {recogidaData.sreg_hora2} </p>
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
                                <div className='recogida-data'>
                                    <p><strong>Puntos Ganados:</strong> {recogidaData.sreg_puntos} </p>
                                    <p><strong>Peso Total:</strong> {recogidaData.sreg_peso} g</p>
                                </div>
                                <div className='recogida-data'>
                                    <p><strong>Entregado:</strong> {recogidaData.nombre_estado === 'Activo' ? (
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
                            </div>
                            <div className='row2'>
                                <h2>Ubicación</h2>
                                <div id="map" ref={mapRef} style={{ width: '100%', height: '320px' }}></div>
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
                <button type="button" onClick={closeModal} className="close-modal-button">Cerrar</button>
                {isLoading && (
                    <div className="LoadingModal">
                        <div className="LoadingSpinner"></div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default ModalRegDeta;
