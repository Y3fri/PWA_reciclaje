import React, { useEffect } from 'react';
import './confir.css';

const SuccessMessage = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // El mensaje se cerrará automáticamente después de 3 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="success-message">
            <p>¡La recogida fue enviada exitosamente!</p>
        </div>
    );
};

export default SuccessMessage;
