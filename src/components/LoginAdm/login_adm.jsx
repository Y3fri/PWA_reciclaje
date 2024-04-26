import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { authenticateUserAd } from '../../service/Login_usu';
import './login_ad.css'

const LoginUsu = () => {
  const [credentials, setCredentials] = useState({ usu_nickname: '', usu_clave: '' });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await authenticateUserAd(credentials);       
      navigate("/CRUDproductos");
    } catch (error) {
      console.error('Error de autenticación:', error.message);
    }


  };
  return (
    <div className="login-container">
    <label htmlFor="usu_nickname">Usuario:</label>
    <input
      type="text"
      id="usu_nickname"
      value={credentials.usu_nickname}
      onChange={(e) => setCredentials({ ...credentials, usu_nickname: e.target.value })}
      className="input-field"
    />

    <label htmlFor="usu_clave">Contraseña:</label>
    <input
      type="password"
      id="usu_clave"
      value={credentials.usu_clave}
      onChange={(e) => setCredentials({ ...credentials, usu_clave: e.target.value })}
      className="input-field"
    />

    <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>
  </div>
  );
};

export default LoginUsu;
