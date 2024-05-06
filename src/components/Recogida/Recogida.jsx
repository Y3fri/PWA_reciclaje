import React, { useState, useEffect } from 'react';
import './Recogida.css';
import { postRecogida } from '../../service/Recogida';
import { listComu } from '../../service/Comunidad';
import { useNavigate } from 'react-router-dom';

const Recogida = () => {
    const cli_id = localStorage.getItem('cli_id');

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
                comuna: {
                    com_id: 0,
                    com_nombre: ""
                }
            }
        }
    };

    const [recogida, setRecogida] = useState(initialState);
    const [Comu, setComu] = useState(null);
    const navigate = useNavigate();
    const [errorMaterial, setErrorMaterial] = useState('');
    const [errorComuna, setErrorComuna] = useState('');


    useEffect(() => {
        listComu(setComu);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecogida({
            ...recogida,
            recogida: {
                ...recogida.recogida,
                [name]: value
            }
        });
    };
    const handleKeyPress = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const { reg_plastico, reg_papel, reg_carton, reg_metal, reg_vidrio } = recogida.recogida;
        const alMenosUnoSeleccionado = reg_plastico || reg_papel || reg_carton || reg_metal || reg_vidrio;

        if (!alMenosUnoSeleccionado) {
            setErrorMaterial('Debes seleccionar al menos un material para recoger.');
            return;
        } else {
            setErrorMaterial('');
        }
        if (recogida.recogida.reg_idcomuna === 0) {
            setErrorComuna('Debes seleccionar una comuna.');
            return;
        } else {
            setErrorComuna('');
        }
        try {
            await postRecogida(recogida);
            console.log(recogida);
            navigate('/');
        } catch (error) {
            console.error('Error al enviar la recogida:', error);
            console.log('Error al enviar la recogida. Por favor, inténtalo de nuevo más tarde.',error);
        }
    };


    const handleHome = () => {
        navigate("/");
    };
    return (
        <div className="root">
             <button onClick={handleHome} className="home-button">Volver</button>
            <h1>Materiales Reciclables</h1>
            <form onSubmit={handleSubmit}>
                {errorComuna && <p>{errorComuna}</p>}
                <select name="reg_idcomuna" value={recogida.recogida.reg_idcomuna} onChange={handleChange} className="reg_idcomuna" >
                    <option value="0">Selecciona tu comunidad</option>
                    {Comu && Comu.map(com => (
                        <option key={com.com_id} value={parseInt(com.com_id)}>{com.com_nombre}</option>
                    ))}
                </select>
                {errorMaterial && <p>{errorMaterial}</p>}
                <label>
                    Plástico:
                    <input type="checkbox" name="reg_plastico" checked={recogida.reg_plastico} onChange={handleChange} />
                </label>
                <label>
                    Papel:
                    <input type="checkbox" name="reg_papel" checked={recogida.reg_papel} onChange={handleChange} />
                </label>
                <label>
                    Cartón:
                    <input type="checkbox" name="reg_carton" checked={recogida.reg_carton} onChange={handleChange} />
                </label>
                <label>
                    Metal:
                    <input type="checkbox" name="reg_metal" checked={recogida.reg_metal} onChange={handleChange} />
                </label>
                <label>
                    Vidrio:
                    <input type="checkbox" name="reg_vidrio" checked={recogida.reg_vidrio} onChange={handleChange} />
                </label>
                <label>
                    Ubicación (latitud):
                    <input type="text" name="reg_ubicacion_lag" value={recogida.reg_ubicacion_lag} onChange={handleChange} required  />
                </label>
                <label>
                    Ubicación (longitud):
                    <input type="text" name="reg_ubicacion_log" value={recogida.reg_ubicacion_log} onChange={handleChange} required />
                </label>
                <label>
                    Número:
                    <input
                        type="text"
                        name="reg_numero"
                        value={recogida.reg_numero}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        required 
                    />
                </label>
                <button type="submit">Enviar Recogida</button>
            </form>
        </div>
    );
};

export default Recogida;
