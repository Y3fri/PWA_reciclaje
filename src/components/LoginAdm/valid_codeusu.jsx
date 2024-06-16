import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validCodeUsu } from '../../service/cambiocontrausu';

const ValidCodeUsu = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const token = await validCodeUsu({ code: code});       
      navigate(`/reset-passwordUsu/${token.token}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Validar Código</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="code" className="input-label">Código de Verificación:</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Validando...' : 'Validar Código'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ValidCodeUsu;
