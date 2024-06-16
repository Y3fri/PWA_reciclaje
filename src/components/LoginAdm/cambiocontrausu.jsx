import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordUsu } from '../../service/cambiocontrausu';


const CambioContraUsu = () => {
  const { token } = useParams(); 
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 


  const handleSubmit =  async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await resetPasswordUsu({ token, new_password: newPassword });      
      setIsLoading(false);
      setErrorMessage('');
      navigate('/loginAdm'); 
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Error al cambiar la contraseña: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword" className="input-label">Nueva Contraseña:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CambioContraUsu;
