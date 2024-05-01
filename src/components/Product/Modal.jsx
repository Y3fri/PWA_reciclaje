import React, { useState, useEffect } from 'react';
import './Modal.css';
import { postProducto, updateProducto } from '../../service/Producto';

const Modal = ({ closeModal, updateProductList, productId, productos }) => {
    const [formData, setFormData] = useState({
        pro_id: 0,
        pro_empresa: 1,
        pro_estado: 1,
        pro_foto: '',
        pro_nombre: '',
        pro_puntos: '',
        pro_cantidad: '',
        empresa: {
            inf_id: 0,
            inf_municipio: "",
            inf_nit: "",
            inf_razon_social: "",
            inf_email: "",
            inf_direccion: "",
            inf_telefono: "",
            inf_logo: "",
            inf_facebook: "",
            inf_instagram: "",
            inf_tiktok: ""
        },
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        if (productId && productos) {
            const productToUpdate = productos.find(producto => producto.pro_id === productId);
            setCurrentProduct(productToUpdate);
        }
    }, [productId, productos]);

    useEffect(() => {
        if (currentProduct) {
            setFormData(prevFormData => ({
                ...prevFormData,
                pro_id: currentProduct.pro_id,
                pro_foto: currentProduct.pro_foto,
                pro_nombre: currentProduct.pro_nombre,
                pro_puntos: currentProduct.pro_puntos,
                pro_cantidad: currentProduct.pro_cantidad,
                pro_estado: currentProduct.pro_estado
            }));
        }
    }, [currentProduct]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productId) {
                await updateProducto(productId, formData);
            } else {
                await postProducto(formData);
            }
            updateProductList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>{productId ? 'Editar producto' : 'Crear nuevo producto'}</h2>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">Foto:</label>
                    <input type="text" name="pro_foto" value={formData.pro_foto} onChange={handleChange} className="form-input" />
                    <label className="form-label">Nombre:</label>
                    <input type="text" name="pro_nombre" value={formData.pro_nombre} onChange={handleChange} className="form-input" />
                    <label className="form-label">Puntos:</label>
                    <input type="text" name="pro_puntos" value={formData.pro_puntos} onChange={handleChange} className="form-input" />
                    <label className="form-label">Cantidad:</label>
                    <input type="text" name="pro_cantidad" value={formData.pro_cantidad} onChange={handleChange} className="form-input" />
                    {productId && (
                        <>
                            <label className="form-label">Estado:</label>
                            <div className="language">
                                <span className="en">Activo</span>
                                <input
                                    type="checkbox"
                                    name="pro_estado"
                                    className="check"
                                    checked={formData.pro_estado === 2}
                                    onChange={(e) => {
                                        const value = e.target.checked ? 2 : 1;
                                        handleChange({ target: { name: 'pro_estado', value } });
                                    }}
                                />
                                <span className="es">Inactivo</span>
                            </div>
                        </>
                    )}
                    <div className='header-product'>
                        <button type="submit" className="form-button">Enviar</button>
                        <button onClick={closeModal} className="close-modal-button">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
