import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCliente } from '../../service/Login_cli';

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
            navigate('/LoginCliente'); 
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
        }
    };

    return (
        <div>
            <h2>Registro de Cliente</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Cargando...</p>} {/* Mostrar pantalla de carga si loading es true */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombres:</label>
                    <input type="text" name="cli_nombres" value={cliente.cli_nombres} onChange={handleChange} />
                </div>
                <div>
                    <label>Apellidos:</label>
                    <input type="text" name="cli_apellidos" value={cliente.cli_apellidos} onChange={handleChange} />
                </div>
                <div>
                    <label>Correo:</label>
                    <input type="email" name="cli_correo" value={cliente.cli_correo} onChange={handleChange} />
                </div>
                <div>
                    <label>Documento:</label>
                    <input type="text" name="cli_documento" value={cliente.cli_documento} onChange={handleChange} />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="text" name="cli_telefono" value={cliente.cli_telefono} onChange={handleChange} />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input type="text" name="cli_nickname" value={cliente.cli_nickname} onChange={handleChange} />
                </div>
                <div>
                    <label>Clave:</label>
                    <input type="password" name="cli_clave" value={cliente.cli_clave} onChange={handleChange} />
                </div>
                <button type="submit">Registrar Cliente</button>
            </form>
        </div>
    );
};

export default RegistroCliente;