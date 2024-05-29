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
    <div className='root-home'>
      <div className='sesion'>
      <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
        <label htmlFor="usu_nickname" className="input-label">Usuario:</label>
        <input
          type="text"
          id="usu_nickname"
          value={credentials.usu_nickname}
          onChange={(e) => setCredentials({ ...credentials, usu_nickname: e.target.value })}
          className="input-field"
        />

        <label htmlFor="usu_clave" className="input-label">Contraseña:</label>
        <input
          type="password"
          id="usu_clave"
          value={credentials.usu_clave}
          onChange={(e) => setCredentials({ ...credentials, usu_clave: e.target.value })}
          className="input-field"
        />

        <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>
      </div>
    </div>
    </div>
  );
};

export default LoginUsu;
