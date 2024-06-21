import React, { useState, useEffect } from 'react';
import './Modal.css';
import { listRol } from '../../../service/Login_usu';
import { postUsuario, updateUsuario } from '../../../service/Login_usu';

const Modal = ({ closeModal, updateusuarioList, usuarioId, usuarios }) => {
    const [formData, setFormData] = useState({
        usu_id: 0,
        usu_estado: 1,
        usu_rol: 1,
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
    });

    const [currentUsuario, setCurrentUsuario] = useState(null);
    const [Rols, setRol] = useState(null);
    useEffect(() => {
        if (!usuarioId) { 
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
            
            setFormData(prevFormData => ({
                ...prevFormData,
                usu_fechahora: formattedDate
            }));
        }
        listRol(setRol);
        if (usuarioId && usuarios) {
            const usuarioToUpdate = usuarios.find(usuario => usuario.usu_id === usuarioId);
            setCurrentUsuario(usuarioToUpdate);
        }
    }, [usuarioId, usuarios]);

    useEffect(() => {
        if (currentUsuario) {
            setFormData(prevFormData => ({
                ...prevFormData,
                usu_id: currentUsuario.usu_id,
                usu_correo: currentUsuario.usu_correo,
                usu_documento: currentUsuario.usu_documento,
                usu_nombres: currentUsuario.usu_nombres,
                usu_clave:currentUsuario.usu_clave,
                usu_apellidos: currentUsuario.usu_apellidos,
                usu_estado: currentUsuario.usu_estado,
                usu_rol: currentUsuario.usu_rol,
                usu_nickname: currentUsuario.usu_nickname,
                usu_fechahora: currentUsuario.usu_fechahora
            }));
        }
    }, [currentUsuario]);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (usuarioId) {
                await updateUsuario(usuarioId, formData);
            } else {
                await postUsuario(formData);
            }
            updateusuarioList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
           
        }
        setLoading(false);
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
            {loading && (
                <div className="LoadingModal">
                    <div className="LoadingSpinner"></div>
                </div>
            )}
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>{usuarioId ? 'Editar usuario' : 'Crear nuevo usuario'}</h2>
                <form onSubmit={handleSubmit}>
                    <select name="usu_rol" value={formData.usu_rol} onChange={handleChange} className="form-input">
                        {Rols && Rols.map(rol => (
                            <option key={rol.rol_id} value={parseInt(rol.rol_id)}>{rol.rol_nombre}</option>
                        ))}
                    </select>
                    <label className="form-label">Correo:</label>
                    <input type="email" name="usu_correo" value={formData.usu_correo} onChange={handleChange} className="form-input" />
                    <label className="form-label">Documento:</label>
                    <input type="text" name="usu_documento" value={formData.usu_documento} onChange={handleChange} className="form-input" />
                    <label className="form-label">Nombres:</label>
                    <input type="text" name="usu_nombres" value={formData.usu_nombres} onChange={handleChange} className="form-input" />
                    <label className="form-label">Apellidos:</label>
                    <input type="text" name="usu_apellidos" value={formData.usu_apellidos} onChange={handleChange} className="form-input" />
                    <label className="form-label">Nickname:</label>
                    <input type="text" name="usu_nickname" value={formData.usu_nickname} onChange={handleChange} className="form-input" />
                    {!usuarioId && (
                        <>
                            <label className="form-label">Clave:</label>
                            <input
                                type="password"
                                name="usu_clave"
                                value={formData.usu_clave}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </>
                    )}
                    {usuarioId && (
                        <>
                            <label className="form-label">Estado:</label>
                            <div className="language">
                                <span className="en">Activo</span>
                                <input
                                    type="checkbox"
                                    name="usu_estado"
                                    className="check"
                                    checked={formData.usu_estado === 2}
                                    onChange={(e) => {
                                        const value = e.target.checked ? 2 : 1;
                                        handleChange({ target: { name: 'usu_estado', value } });
                                    }}
                                />
                                <span className="es">Inactivo</span>
                            </div>
                        </>
                    )}
                    <div className='header-product'>
                        <button type="submit" className="form-button">Enviar</button>
                        <button onClick={closeModal} className="close-modal-button">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
