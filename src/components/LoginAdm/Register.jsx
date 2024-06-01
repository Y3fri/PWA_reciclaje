// CRUDusuario.js
import React, { useEffect, useState } from 'react';
import { listTodo } from '../../service/Login_usu';
import './Register.css';
import Modal from './Modal';


const CRUDUsuario = () => {
    const [usuarios, setUsuarios] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usuariosPerPage] = useState(5);
    const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listTodo(setUsuarios);
        }
    }, []);

    const [showModal, setShowModal] = useState(false);

    const openModal = (usuarioId) => {
        setShowModal(true);
        setSelectedUsuarioId(usuarioId);        
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const updateusuarioList = async () => {
        await listTodo(setUsuarios);
    };

    // Filtrar Usuario por nombre
    const filteredusuarios = usuarios && usuarios.filter(usuario => {
        return usuario.usu_nombres.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Paginación
    const indexOfLastusuario = currentPage * usuariosPerPage;
    const indexOfFirstusuario = indexOfLastusuario - usuariosPerPage;
    const currentusuarios = filteredusuarios && filteredusuarios.slice(indexOfFirstusuario, indexOfLastusuario);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = filteredusuarios ?
        Array.from({ length: Math.ceil(filteredusuarios.length / usuariosPerPage) }, (_, i) => i + 1) :
        [];
    const pages = filteredusuarios ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];

    return (
        <>
            {isLoggedIn && (
                <main className="main-usuario">
                    <h1 className="title-conte">Listado de usuarios: </h1>
                    <div className="contenedor-usuarios">
                        <div className='header-usuario'>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nombre"
                                className="input-search"
                            />

                            <button onClick={() => openModal(null)} className="usuario-button">Crear Nuevo usuario</button>
                            {showModal && <Modal closeModal={closeModal} updateusuarioList={updateusuarioList} usuarioId={selectedUsuarioId} usuarios={usuarios} />}
                        </div>

                        {currentusuarios ? (
                            <>
                                <table className='tablaUsuario'>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Documento</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentusuarios.map(usuario => (
                                            <tr key={usuario.usu_id}>
                                                <td>{usuario.usu_nombres}</td>
                                                <td>{usuario.usu_correo}</td>
                                                <td>{usuario.usu_documento}</td>
                                                <td>
                                                    {usuario.nombre_estado === 'Activo' ? (
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
                                                    <button className="button-edit" onClick={() => openModal(usuario.usu_id)}>Editar</button>

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
                        ) : ('No hay usuarios')}
                    </div>

                </main>
            )}
        </>
    );
};

export default CRUDUsuario;
