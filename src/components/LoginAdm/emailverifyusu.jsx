import React, { useState } from 'react';
import { verifyEmailUsu } from '../../service/cambiocontrausu'; 
import { useNavigate } from "react-router-dom";
import './emailverifyusu.css'

const EmailverifyUsu = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) return;
    try {
      setIsLoading(true);
      await verifyEmailUsu({ correo: email });      
      setShowSuccessMessage(true);
      setFormSubmitted(true);
      navigate("/validaCodigoUsu");
    } catch (error) {
      setErrorMessage("Error al enviar el formulario: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='root-home'>
      <div className="forgot-password-container">
        <h2 className="reset-password-title">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <label htmlFor="email" className="input-label">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="reset-button" disabled={isLoading || formSubmitted}>
            {isLoading ? 'Enviando...' : 'Enviar Código de Verificación'}
          </button>
        </form>
        {showSuccessMessage && (
          <p className="success-message">Código de recuperación de contraseña enviado con éxito</p>
        )}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        {isLoading && (
          <div className="LoadingModal">
            <div className="LoadingSpinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailverifyUsu;
