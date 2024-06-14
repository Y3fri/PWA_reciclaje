import React, { useEffect } from 'react';
import './Error.css';

const ErrorMessage = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // El mensaje se cerrará automáticamente después de 3 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="error-message">
            <p>¡Aún no tienes los suficientes puntos para este producto!</p>
        </div>
    );
};

export default ErrorMessage;
