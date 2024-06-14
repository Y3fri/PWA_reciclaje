import React, { useState, useEffect } from 'react';
import './ModalPuntos.css';
import { postCliente_producto as postPuntos } from '../../../service/cliente_producto';
import SuccessMessagePro from '../Message/confirpro';

const isImageFormat = (url) => {
    const imageFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = url.split('.').pop().toLowerCase();
    return imageFormats.includes(extension);
};

const ModalPuntos = ({ closeModal, updateProductList, selectedProduct, clienteId, cli_puntos }) => {
    const [formData, setFormData] = useState({
        clip_id: 0,
        clip_idcliente: clienteId,
        clip_idproducto: selectedProduct.pro_id,
        clip_estado: 1,
        clip_latitud: 0,
        clip_longitud: 0,
        clip_cantidad: 1,
        clip_direccion_apartamento: "",
        clip_barrio_conjunto: "",
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
        producto: {
            pro_id: 0,
            pro_empresa: 0,
            pro_estado: 0,
            pro_foto: "",
            pro_nombre: "",
            pro_puntos: 0,
            pro_cantidad: 0,
            empresa: {
                inf_id: 0,
                inf_municipio: "",
                inf_nit: "",
                inf_razon_social: "",
                inf_email: "",
                inf_direccion: "",
                inf_telefono: "",
                inf_logo: "",
                inf_facebook: "",
                inf_instagram: "",
                inf_tiktok: ""
            },
            estado: {
                est_id: 0,
                est_nombre: ""
            }
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessagePro, setShowSuccessMessagePro] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errorUbicacion, setErrorUbicacion] = useState('');
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);

    const handleCloseSuccessMessagePro = () => {
        closeModal();
        setShowSuccessMessagePro(false);
    };
    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const existingScript = document.getElementById('googleMaps');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3nyk6nTd7q1T8KITva0WNy0jHSFOAet4&libraries=places`;
                script.id = 'googleMaps';
                document.body.appendChild(script);
                script.onload = initMap;
            } else {
                initMap();
            }
        };

        loadGoogleMapsScript();
    }, []);

    const initMap = () => {
        if (navigator.geolocation) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setFormData(prevState => ({
                    ...prevState,
                    clip_latitud: latitude,
                    clip_longitud: longitude
                }));
                setLoadingLocation(false);
                if (window.google && window.google.maps) {
                    renderMap(latitude, longitude);
                } else {
                    setErrorUbicacion('Google Maps API no se ha cargado correctamente.');
                }
            }, error => {
                setLoadingLocation(false);
                handleGeolocationError(error);
            });
        } else {
            setErrorUbicacion('Geolocation is not supported by this browser.');
        }
    };

    const handleGeolocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setErrorUbicacion('User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                setErrorUbicacion('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                setErrorUbicacion('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                setErrorUbicacion('An unknown error occurred.');
                break;
            default:
                setErrorUbicacion('An unknown error occurred.');
                break;
        }
    };

    const handleGetLocation = () => {
        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setFormData(prevState => ({
                ...prevState,
                clip_latitud: latitude,
                clip_longitud: longitude
            }));
            setLoadingLocation(false);
            setErrorUbicacion('');
            if (window.google && window.google.maps) {
                if (!mapInstance) {
                    renderMap(latitude, longitude);
                } else {
                    mapInstance.setCenter({ lat: latitude, lng: longitude });
                    new window.google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        map: mapInstance
                    });
                }
            } else {
                setErrorUbicacion('Google Maps API no se ha cargado correctamente.');
            }
        }, error => {
            setLoadingLocation(false);
            handleGeolocationError(error);
        });
    };

    const renderMap = (latitude, longitude) => {
        if (window.google && window.google.maps) {
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
        } else {
            setErrorUbicacion('Google Maps API no se ha cargado correctamente.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'clip_cantidad') {
            const newValue = Math.min(Math.max(1, Number(value)), selectedProduct.pro_cantidad);
            const maxQuantityByPoints = Math.floor(cli_puntos / selectedProduct.pro_puntos);
            setFormData((prevState) => ({
                ...prevState,
                [name]: Math.min(newValue, maxQuantityByPoints)
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleQuantityChange = (change) => {
        setFormData((prevState) => {
            const newQuantity = prevState.clip_cantidad + change;
            const maxQuantityByPoints = Math.floor(cli_puntos / selectedProduct.pro_puntos);
            return {
                ...prevState,
                clip_cantidad: Math.min(Math.max(1, newQuantity), Math.min(selectedProduct.pro_cantidad, maxQuantityByPoints))
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formSubmitted) return;
        try {
            setIsLoading(true);            
            await postPuntos(formData);
            setShowSuccessMessagePro(true);
            updateProductList();
            setFormSubmitted(true);
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-containerPuntos">
            <div className="modal-contentPuntos">
                <span className="close-buttonPuntos" onClick={closeModal}>&times;</span>
                <h2 className="modal-title">Redimir Producto</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <h3 className="product-name">{selectedProduct.pro_nombre}</h3>
                    {selectedProduct.pro_foto && isImageFormat(selectedProduct.pro_foto) ? (
                        <img className='product-image' src={`${process.env.REACT_APP_API_URL}/images/${selectedProduct.pro_nombre}/file`} alt={selectedProduct.pro_nombre} />
                    ) : (
                        <img className='product-image' src={`${process.env.PUBLIC_URL}/images/Sin_imagen_disponible.jpg`} alt="Imagen predeterminada" />
                    )}
                    <p className="product-details">Puntos: {selectedProduct.pro_puntos}</p>
                    <p className="product-details">Disponibles: {selectedProduct.pro_cantidad}</p>

                    <label className="form-label">Cantidad:</label>
                    <div className="quantity-control">
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(-1)}
                            className="quantity-button"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            name="clip_cantidad"
                            value={formData.clip_cantidad}
                            onChange={handleChange}
                            className="form-input2"
                            min="1"
                            max={Math.min(selectedProduct.pro_cantidad, Math.floor(cli_puntos / selectedProduct.pro_puntos))}
                        />
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(1)}
                            className="quantity-button"
                        >
                            +
                        </button>
                    </div>

                    <label className="form-label">Dirección o Apartamento:</label>
                    <input type="text" name="clip_direccion_apartamento" value={formData.clip_direccion_apartamento} onChange={handleChange} className="form-input" required />

                    <label className="form-label">Barrio o Conjunto:</label>
                    <input type="text" name="clip_barrio_conjunto" value={formData.clip_barrio_conjunto} onChange={handleChange} className="form-input" required />
                    {errorUbicacion && <p className="error error-ubicacion">{errorUbicacion}</p>}
                    <div id="map" className="map"></div>
                    <button type="button" onClick={handleGetLocation} disabled={loadingLocation} className="location-button">
                        {loadingLocation ? "Obteniendo ubicación..." : "Obtener ubicación actual"}
                    </button>
                    <div className='form-buttons'>
                        <button type="submit" className="form-button" disabled={formSubmitted}>Enviar</button>
                        <button onClick={closeModal} className="close-modal-button">Cerrar</button>
                    </div>
                </form>
            </div>
            {isLoading && (
                <div className="LoadingModal">
                    <div className="LoadingSpinner"></div>
                </div>
            )}
            {showSuccessMessagePro && <SuccessMessagePro onClose={handleCloseSuccessMessagePro} />}
        </div>
    );
};

export default ModalPuntos;
