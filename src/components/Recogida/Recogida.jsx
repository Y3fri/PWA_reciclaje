import React, { useState, useEffect } from 'react';
import './Recogida.css';
import { postRecogida } from '../../service/Recogida';
import { listComu } from '../../service/Comunidad';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from './Message/confir';


const Recogida = () => {
    const cli_id = localStorage.getItem('cli_id');
    const navigate = useNavigate();

    const initialState = {
        recogida: {
            reg_id: 0,
            reg_idcomuna: 0,
            reg_plastico: false,
            reg_papel: false,
            reg_carton: false,
            reg_metal: false,
            reg_vidrio: false,
            reg_ubicacion_lag: 0,
            reg_ubicacion_log: 0,
            reg_numero: "",
            reg_direccion: "",
            reg_barrio_conjunto: "",
            comuna: {
                com_id: 0,
                com_nombre: ""
            }
        },
        sso_recogida: {
            sreg_idcliente: cli_id,
            sreg_idestado: 1,
            sreg_idrecogida: 0,
            sreg_idtrabajador: 0,
            sreg_puntos: 0,
            sreg_peso: 0,
            sreg_fecha: "2024-12-23",
            sreg_hora1: "23:12:12",
            sreg_hora2: "23:12:12",
            sreg_asignacion: false,
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
        }
    };

    const [recogida, setRecogida] = useState(initialState);
    const [Comu, setComu] = useState(null);
    const [errorMaterial, setErrorMaterial] = useState('');
    const [errorComuna, setErrorComuna] = useState('');
    const [errorUbicacion, setErrorUbicacion] = useState('');
    const [errorNumero, setErrorNumero] = useState('');
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);


    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
        navigate('/');
    };

    useEffect(() => {
        listComu(setComu);
    }, []);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const existingScript = document.getElementById('googleMaps');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3nyk6nTd7q1T8KITva0WNy0jHSFOAet4&libraries=places`;
                script.id = 'googleMaps';
                document.body.appendChild(script);
                script.onload = initMap;
            }
        };

        loadGoogleMapsScript();
    }, []);


    const initMap = () => {
        if (navigator.geolocation) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setRecogida(prevState => ({
                    ...prevState,
                    recogida: {
                        ...prevState.recogida,
                        reg_ubicacion_lag: latitude,
                        reg_ubicacion_log: longitude
                    }
                }));
                setLoadingLocation(false);
                renderMap(latitude, longitude);
            }, error => {
                setLoadingLocation(false);
                setErrorUbicacion('Error obteniendo la ubicación.');
                console.error('Error obteniendo la ubicación: ', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            setErrorUbicacion('Geolocation is not supported by this browser.');
        }
    };

    const renderMap = (latitude, longitude) => {
        const mapOptions = {
            zoom: 15,
            center: { lat: latitude, lng: longitude },
            disableDefaultUI: true
        };
        const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
        setMapInstance(map);
        new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setRecogida(prevState => ({
            ...prevState,
            recogida: {
                ...prevState.recogida,
                [name]: newValue
            }
        }));
    };

    const handleGetLocation = () => {
        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setRecogida(prevState => ({
                ...prevState,
                recogida: {
                    ...prevState.recogida,
                    reg_ubicacion_lag: latitude,
                    reg_ubicacion_log: longitude
                }
            }));
            setLoadingLocation(false);
            setErrorUbicacion('');
            if (!mapInstance) {
                renderMap(latitude, longitude);
            } else {
                mapInstance.setCenter({ lat: latitude, lng: longitude });
                new window.google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: mapInstance
                });
            }
        }, error => {
            setLoadingLocation(false);
            setErrorUbicacion('Error obteniendo la ubicación.');
            console.error('Error obteniendo la ubicación: ', error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formSubmitted) return;
        const { reg_plastico, reg_papel, reg_carton, reg_metal, reg_vidrio, reg_ubicacion_lag, reg_ubicacion_log, reg_numero, reg_direccion } = recogida.recogida;
        const alMenosUnoSeleccionado = reg_plastico || reg_papel || reg_carton || reg_metal || reg_vidrio;

        let hasError = false;

        if (!alMenosUnoSeleccionado) {
            setErrorMaterial('Debes seleccionar al menos un material para recoger.');
            hasError = true;
        } else {
            setErrorMaterial('');
        }
        if (recogida.recogida.reg_idcomuna === 0) {
            setErrorComuna('Debes seleccionar una comuna.');
            hasError = true;
        } else {
            setErrorComuna('');
        }
        if (!reg_ubicacion_lag || !reg_ubicacion_log) {
            setErrorUbicacion('Debes obtener tu ubicación.');
            hasError = true;
        } else {
            setErrorUbicacion('');
        }
        if (!reg_numero) {
            setErrorNumero('Debes ingresar un número.');
            hasError = true;
        } else {
            setErrorNumero('');
        }
        if (!reg_direccion) {
            setErrorNumero('Debes ingresar una direccion.');
            hasError = true;
        } else {
            setErrorNumero('');
        }

        if (hasError) return;

        try {            
            setIsLoading(true)
            await postRecogida(recogida);
            setShowSuccessMessage(true);
            setFormSubmitted(true);
        } catch (error) {
            console.error('Error al enviar la recogida:', error);
        } finally{
            setIsLoading(false);
        }
    };

    const handleHome = () => {
        navigate('/');
    };
    return (
        <div className="root-home">
            <div className="root">
                <button onClick={handleHome} className="home-button">Volver</button>
                <h1 className="titleReciclar">Materiales Reciclables</h1>
                <form onSubmit={handleSubmit} className="recycle-form">
                    {errorComuna && <p className="error error-comuna">{errorComuna}</p>}
                    <select name="reg_idcomuna" value={recogida.recogida.reg_idcomuna} onChange={handleChange} className="select-comuna">
                        <option value="0">Selecciona tu comuna</option>
                        {Comu && Comu.map(com => (
                            <option key={com.com_id} value={parseInt(com.com_id)}>{com.com_nombre}</option>
                        ))}
                    </select>
                    {errorMaterial && <p className="error error-material">{errorMaterial}</p>}
                    <div className='selectCheck'>
                        <label className="checkbox-label">
                            <input type="checkbox" name="reg_plastico" checked={recogida.recogida.reg_plastico} onChange={handleChange} className="checkbox-input" />
                            <span className="checkbox-custom plastico"></span>
                            <span>Plástico</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" name="reg_papel" checked={recogida.recogida.reg_papel} onChange={handleChange} className="checkbox-input" />
                            <span className="checkbox-custom papel"></span>
                            <span>Papel</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" name="reg_carton" checked={recogida.recogida.reg_carton} onChange={handleChange} className="checkbox-input" />
                            <span className="checkbox-custom carton"></span>
                            <span>Cartón</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" name="reg_metal" checked={recogida.recogida.reg_metal} onChange={handleChange} className="checkbox-input" />
                            <span className="checkbox-custom metal"></span>
                            <span>Metal</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" name="reg_vidrio" checked={recogida.recogida.reg_vidrio} onChange={handleChange} className="checkbox-input" />
                            <span className="checkbox-custom vidrio"></span>
                            <span>Vidrio</span>
                        </label>
                    </div>
                    {errorUbicacion && <p className="error error-ubicacion">{errorUbicacion}</p>}
                    <div id="map" className="map"></div>
                    <button type="button" onClick={handleGetLocation} disabled={loadingLocation} className="location-button">
                        {loadingLocation ? "Obteniendo ubicación..." : "Obtener ubicación actual"}
                    </button>
                    {errorNumero && <p className="error error-numero">{errorNumero}</p>}
                    <label className="text-label">
                        <span>Número:</span>
                        <input
                            type="text"
                            name="reg_numero"
                            value={recogida.recogida.reg_numero}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                const charCode = e.which ? e.which : e.keyCode;
                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                    e.preventDefault();
                                }
                            }}
                            required
                            className="text-input"
                        />
                    </label>
                    <label className="text-label">
                        <span>Barrio o conjunto:</span>
                        <input
                            type="text"
                            name="reg_barrio_conjunto"
                            value={recogida.recogida.reg_barrio_conjunto}
                            onChange={handleChange}
                            required
                            className="text-input"
                        />
                    </label>
                    <label className="text-label">
                        <span>Dirección o Apartamento:</span>
                        <input
                            type="text"
                            name="reg_direccion"
                            value={recogida.recogida.reg_direccion}
                            onChange={handleChange}
                            required
                            className="text-input"
                        />
                    </label>

                    <button type="submit" className="submit-button" disabled={formSubmitted}>Enviar Recogida</button>
                </form>
            </div>
            {isLoading && (
                <div className="LoadingModal">
                    <div className="LoadingSpinner"></div>
                </div>
            )}
            {showSuccessMessage && <SuccessMessage onClose={handleCloseSuccessMessage} />}
        </div>
    );
};

export default Recogida;
