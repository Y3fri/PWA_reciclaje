import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCliente } from '../../service/Login_cli';
import './createcli.css';

const RegistroCliente = () => {
    const initialState = {
        cli_id: 0,
        cli_estado: 1,
        cli_correo: '',
        cli_documento: '',
        cli_nombres: '',
        cli_apellidos: '',
        cli_nickname: '',
        cli_clave: '',
        cli_telefono: '',
        cli_totalpuntos: 0,
        estado: {
            est_id: 0,
            est_nombre: ''
        }
    };

    const navigate = useNavigate();
    const [cliente, setCliente] = useState(initialState);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => {
                navigate('/login');
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [loading, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await createCliente(cliente);
            console.log('Cliente registrado exitosamente:', response);
        } catch (error) {
            console.error('Error al registrar cliente:', error);
            setError('Error al registrar cliente. Por favor, inténtalo de nuevo más tarde.');
            setLoading(false);
        }
    };
    return (
        <div className="RegistroClienteContainer">
            <h2 className="RegistroClienteTitle">Registro de Cliente</h2>
            {error && <p className="ErrorText">{error}</p>}
            {loading && (
                <div className="LoadingModal">
                    <div className="LoadingSpinner"></div>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="FormRow">
                    <label className="FormLabel">Nombres:</label>
                    <input type="text" className="FormInput" name="cli_nombres" value={cliente.cli_nombres} onChange={handleChange} />
                </div>
                <div className="FormRow">
                    <label className="FormLabel">Apellidos:</label>
                    <input type="text" className="FormInput" name="cli_apellidos" value={cliente.cli_apellidos} onChange={handleChange} />
                </div>
                <div className="FormRow">
                    <label className="FormLabel">Correo:</label>
                    <input type="email" className="FormInput" name="cli_correo" value={cliente.cli_correo} onChange={handleChange} />
                </div>
                <div className="FormRow">
                    <label className="FormLabel">Documento:</label>
                    <input type="text" className="FormInput" name="cli_documento" value={cliente.cli_documento} onChange={handleChange} />
                </div>
                <div className="FormRow">
                    <label className="FormLabel">Teléfono:</label>
                    <input type="text" className="FormInput" name="cli_telefono" value={cliente.cli_telefono} onChange={handleChange} />
                </div>
                <div className="FormRow">
                    <label className="FormLabel">Nickname:</label>
                    <input type="text" className="FormInput" name="cli_nickname" value={cliente.cli_nickname} onChange={handleChange} />
                </div>
                <div className="FormRow">
                    <label className="FormLabel">Clave:</label>
                    <input type="password" className="FormInput" name="cli_clave" value={cliente.cli_clave} onChange={handleChange} />
                </div>
                <button type="submit" className="SubmitButton">Registrar Cliente</button>
            </form>
        </div>
    );
};

export default RegistroCliente;