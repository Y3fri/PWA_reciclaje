import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { authenticateUser } from '../../service/Login_cli';
import './login.css'

const LoginCli = () => {
  const [credentials, setCredentials] = useState({ cli_nickname: '', cli_clave: '' });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await authenticateUser(credentials);       
      navigate("/productos");
    } catch (error) {
      console.error('Error de autenticación:', error.message);
    }


  };
  return (
    <div className="login-container">
    <label htmlFor="cli_nickname">Usuario:</label>
    <input
      type="text"
      id="cli_nickname"
      value={credentials.cli_nickname}
      onChange={(e) => setCredentials({ ...credentials, cli_nickname: e.target.value })}
      className="input-field"
    />

    <label htmlFor="cli_clave">Contraseña:</label>
    <input
      type="password"
      id="cli_clave"
      value={credentials.cli_clave}
      onChange={(e) => setCredentials({ ...credentials, cli_clave: e.target.value })}
      className="input-field"
    />

    <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>
  </div>
  );
};

export default LoginCli;
