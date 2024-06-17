import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { validCodeUsu } from '../../service/cambiocontrausu';
import './valid_codeusu.css'

const ValidCodeUsu = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const codeString = code.join('');
      const token = await validCodeUsu({ code: codeString});       
      navigate(`/reset-passwordUsu/${token.token}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='root-home'>
    <div className='center'>
      <div className="forgot-password-container">
        <h2 className='reset-password-title'>Validar Código</h2>
        <form onSubmit={handleSubmit} className="reset-password-formvalid">
          <label htmlFor="code" className="input-label">Código de Verificación:</label>
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                type="number"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                ref={(el) => (inputs.current[index] = el)}
                maxLength={1}
                className="code-input"
                required
              />
            ))}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Validando...' : 'Validar Código'}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  </div>
  );
};

export default ValidCodeUsu;
