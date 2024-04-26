// Modal.js
import React from 'react';

const Modal = ({ closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <p>Contenido del modal...</p>
            </div>
        </div>
    );
};

export default Modal;
