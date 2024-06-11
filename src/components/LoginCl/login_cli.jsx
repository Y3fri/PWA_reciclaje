import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { authenticateUser } from '../../service/Login_cli';
import './login.css';

const LoginCli = () => {
  const [credentials, setCredentials] = useState({ cli_nickname: '', cli_clave: '' });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    try {
      setIsLoading(true); 
      await authenticateUser(credentials);
      navigate("/");
    } catch (error) {
      console.error('Error de autenticación:', error.message);
    } finally{
        setIsLoading(false)
    }
  };

  const handleRegister = () => {
    navigate("../Registro");
  };

  return (
    <div className='root-home'>
      <div className='sesion'>
        <div className="login-container">
          <h2 className="login-title">Iniciar Sesión</h2>
          <label htmlFor="cli_nickname" className="input-label">Usuario:</label>
          <input
            type="text"
            id="cli_nickname"
            value={credentials.cli_nickname}
            onChange={(e) => setCredentials({ ...credentials, cli_nickname: e.target.value })}
            className="input-field"
          />

          <label htmlFor="cli_clave" className="input-label">Contraseña:</label>
          <input
            type="password"
            id="cli_clave"
            value={credentials.cli_clave}
            onChange={(e) => setCredentials({ ...credentials, cli_clave: e.target.value })}
            className="input-field"
          />

          <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>
          <button onClick={handleRegister} className="login-button">Registrar</button>
        </div>
      </div>
      {isLoading && (
                <div className="LoadingModal">
                    <div className="LoadingSpinner"></div>
                </div>
            )}
    </div>
  );
};

export default LoginCli;
