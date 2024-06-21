import React, { useEffect, useState } from 'react';
import { listsso_recogida} from '../../service/sso_recogida';
import './sso_recogida.css';
import ModalRegDeta from './Modales/ModalDetails';

const SsoRecogidaDetalles = () => {
    const [sso_recogidas, setsso_recogidas] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ssorecogidasPerPage] = useState(5);
    const [selectedssorecogidaId, setSelectedssorecogidaId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listsso_recogida(setsso_recogidas);
        }
    }, []);

    const [showModal, setShowModal] = useState(false);

    const openModal = (ssorecogidaId) => {
        setShowModal(true);
        setSelectedssorecogidaId(ssorecogidaId);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    // Filtrar sso_recogidas por nombre del cliente
    const filteredssorecogidas = sso_recogidas && sso_recogidas.filter(sso_recogida => {
        return sso_recogida.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Paginación
    const indexOfLastssorecogida = currentPage * ssorecogidasPerPage;
    const indexOfFirstssorecogida = indexOfLastssorecogida - ssorecogidasPerPage;
    const currentssorecogidas = filteredssorecogidas && filteredssorecogidas.slice(indexOfFirstssorecogida, indexOfLastssorecogida);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = filteredssorecogidas ?
        Array.from({ length: Math.ceil(filteredssorecogidas.length / ssorecogidasPerPage) }, (_, i) => i + 1) :
        [];
    const pages = filteredssorecogidas ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];

    return (
        <>
            {isLoggedIn && (
                <main className="main-sso_recogida">
                    <h1 className="title-conte">Ver Detalles de Recogidas: </h1>
                    <div className="contenedor-sso_recogidas">
                        <div className='header-ssorecogida'>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nombre del cliente"
                                className="input-search"
                            />                            
                        </div>
                        {showModal && (
                                <ModalRegDeta
                                    closeModal={closeModal}                                    
                                    ssorecogidaId={selectedssorecogidaId}
                                    sso_recogidas={sso_recogidas}
                                />
                            )}

                        {currentssorecogidas ? (
                            <>
                                <table className='tablasso_recogida'>
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Trabajador</th>
                                            <th>Entregado</th>                                            
                                            <th>Fecha</th>
                                            <th>Hora Inicio</th>
                                            <th>Hora Fin</th>                                            
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentssorecogidas.map((sso_recogida, index) => (
                                            <tr key={sso_recogida.sreg_id || index}>
                                                <td>{sso_recogida.nombre_cliente} {sso_recogida.apellido_cliente}</td>
                                                <td>{sso_recogida.nombre_trabajador} {sso_recogida.apellido_trabajador}</td>
                                                <td>
                                                    {sso_recogida.nombre_estado === 'Activo' ? (
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
                                                <td>{sso_recogida.sreg_fecha}</td>
                                                <td>{sso_recogida.sreg_hora1}</td>
                                                <td>{sso_recogida.sreg_hora2}</td>                                                
                                                <td>
                                                    <button className="button-edit" onClick={() => openModal(sso_recogida.sreg_id)}>Detalles</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button onClick={() => paginate(1)} className="page-link">&laquo;</button>
                                    </li>
                                    {pages.map((page, index) => (
                                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                            <button onClick={() => paginate(page)} className="page-link">{page}</button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button onClick={() => paginate(pageNumbers.length)} className="page-link">&raquo;</button>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            'No hay Recogidas'
                        )}
                    </div>
                </main>
            )}
        </>
    );
};

export default SsoRecogidaDetalles;
