import React, { useEffect, useState } from 'react';
import { listsso_recogida_asignacion } from '../../service/sso_recogida';
import './sso_recogida.css';
import ModalReg from './Modales/Modal';

const SsoRecogida = () => {
    const [sso_recogidas, setsso_recogidas] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ssorecogidasPerPage] = useState(5);
    const [selectedssorecogidaId, setSelectedssorecogidaId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listsso_recogida_asignacion(setsso_recogidas);
        }
    }, []);

    const openModal = (ssorecogidaId) => {        
        setSelectedssorecogidaId(ssorecogidaId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const updatessorecogidaList = async () => {
        await listsso_recogida_asignacion(setsso_recogidas);
    };

    const filteredssorecogidas = sso_recogidas.filter(sso_recogida =>
        sso_recogida.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastssorecogida = currentPage * ssorecogidasPerPage;
    const indexOfFirstssorecogida = indexOfLastssorecogida - ssorecogidasPerPage;
    const currentssorecogidas = filteredssorecogidas.slice(indexOfFirstssorecogida, indexOfLastssorecogida);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = Array.from(
        { length: Math.ceil(filteredssorecogidas.length / ssorecogidasPerPage) },
        (_, i) => i + 1
    );
    const pages = pageNumbers.slice(
        Math.max(0, currentPage - 3),
        Math.min(pageNumbers.length, currentPage + 2)
    );

    return (
        <>
            {isLoggedIn && (
                <main className="main-sso_recogida">
                    <h1 className="title-conte">Listado De Recogidas Pendientes: </h1>
                    <div className="contenedor-sso_recogidas">
                        <div className="header-ssorecogida">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nombre del cliente"
                                className="input-search"
                            />
                            {showModal && (
                                <ModalReg
                                    closeModal={closeModal}
                                    updatessorecogidaList={updatessorecogidaList}
                                    ssorecogidaId={selectedssorecogidaId}
                                    sso_recogidas={sso_recogidas}
                                />
                            )}
                        </div>

                        {currentssorecogidas.length ? (
                            <>
                                <table className="tablasso_recogida">
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>                                                                                        
                                            <th>Fecha</th>
                                            <th>Hora Inicio</th>
                                            <th>Hora Fin</th>
                                            <th>Asignación</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentssorecogidas.map(sso_recogida => (
                                            <tr key={sso_recogida.sreg_id}>
                                                <td>{sso_recogida.nombre_cliente} {sso_recogida.apellido_cliente}</td>
                                                <td>{sso_recogida.sreg_fecha}</td>
                                                <td>{sso_recogida.sreg_hora1}</td>
                                                <td>{sso_recogida.sreg_hora2}</td>                                                
                                                <td>
                                                    {sso_recogida.sreg_asignacion === true ? (
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
                                                    <button className="button-edit" onClick={() => openModal(sso_recogida.sreg_id)}>Editar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

export default SsoRecogida;
