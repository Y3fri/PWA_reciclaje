import React, { useEffect } from 'react';
import './confirpro.css';

const SuccessMessagePro = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // El mensaje se cerrará automáticamente después de 3 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="success-message">
            <p>¡El proceso fue exitoso, tu pedido se entregara entre 24h y 48h!</p>
        </div>
    );
};

export default SuccessMessagePro;
