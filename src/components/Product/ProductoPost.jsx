// CRUDProducto.js
import React, { useEffect, useState } from 'react';
import { listProductoTodo } from '../../service/Producto';
import './ProductoPost.css';
import Modal from './Modales/Modal';

const isImageFormat = (url) => {
    const imageFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = url.split('.').pop().toLowerCase();
    return imageFormats.includes(extension);
};

const CRUDProducto = () => {
    const [productos, setProductos] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [selectedProductId, setSelectedProductId] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listProductoTodo(setProductos);
        }
    }, []);

    const [showModal, setShowModal] = useState(false);

    const openModal = (productId) => {
        setShowModal(true);
        setSelectedProductId(productId);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const updateProductList = async () => {
        await listProductoTodo(setProductos);
    };

    // Filtrar productos por nombre
    const filteredProducts = productos && productos.filter(producto => {
        return producto.pro_nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts && filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = filteredProducts ?
        Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => i + 1) :
        [];
    const pages = filteredProducts ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];

    return (
        <>
            {isLoggedIn && (
                <main className="main-producto">
                    <h1 className="title-conte">Listado de productos: </h1>
                    <div className="contenedor-productos">
                        <div className='header-product'>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nombre"
                                className="input-search"
                            />

                            <button onClick={() => openModal(null)} className="product-button">Crear Nuevo Producto</button>
                            {showModal && <Modal closeModal={closeModal} updateProductList={updateProductList} productId={selectedProductId} productos={productos} />}
                        </div>

                        {currentProducts ? (
                            <>
                                <table className='tablaProducto'>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Foto</th>
                                            <th>Puntos</th>
                                            <th>Disponibles</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.map(producto => (
                                            <tr key={producto.pro_id}>
                                                <td>{producto.pro_nombre}</td>
                                                <td className="foto-cell">
                                                    {producto.pro_foto && isImageFormat(producto.pro_foto) ? (
                                                        <img src={`${process.env.REACT_APP_API_URL}/images/${producto.pro_nombre}/file`} alt="" style={{ maxWidth: '80px', maxHeight: '80px' }} />
                                                    ) : (
                                                        <img src={`${process.env.PUBLIC_URL}/images/Sin_imagen_disponible.jpg`} alt="Imagen predeterminada" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                                    )}
                                                </td>
                                                <td>{producto.pro_puntos}</td>
                                                <td>{producto.pro_cantidad}</td>
                                                <td>
                                                    {producto.nombre_estado === 'Activo' ? (
                                                        <button className="button-circle-green">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M5 12l5 5l10 -10" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button className="button-circle-red">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M18 6l-12 12" />
                                                                <path d="M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    <button className="button-edit" onClick={() => openModal(producto.pro_id)}>Editar</button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Paginación */}
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button onClick={() => paginate(1)} className="page-link">&laquo;</button>
                                    </li>
                                    {pages.map(page => (
                                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                            <button onClick={() => paginate(page)} className="page-link">{page}</button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button onClick={() => paginate(pages.length)} className="page-link">&raquo;</button>
                                    </li>
                                </ul>
                            </>
                        ) : ('No hay productos')}
                    </div>

                </main>
            )}
        </>
    );
};

export default CRUDProducto;
