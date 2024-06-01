import React from "react";
import './home.css';

import { Link } from "react-router-dom";

const Home = () => {



    return (

        <div className="root-home">
            <nav className='navintro'>
                <ul className="ulLayout">
                    <li className="liLayout">
                        <Link className="aLayout iconLink" to="../">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-question-mark" width="34" height="34" viewBox="0 0 24 24" strokeWidth="3.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
                                <path d="M12 19l0 .01" />
                            </svg>
                        </Link>
                        <Link className="aLayout textLink" to="../">Inicio</Link>
                    </li>
                    <li className="liLayout">
                        <Link className="aLayout iconLink" to="../recicla">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="34" height="34" viewBox="0 0 24 24" strokeWidth="3.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                            </svg>
                        </Link>
                        <Link className="aLayout textLink" to="../recicla">Reciclar</Link>
                    </li>
                    <li className="liLayout">
                        <Link className="aLayout iconLink" to="../productos">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="34" height="34" viewBox="0 0 24 24" strokeWidth="3.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        </Link>
                        <Link className="aLayout textLink" to="../productos">Productos</Link>
                    </li>
                </ul>
            </nav>

            <main >
                <nav className="mainhome">
                    <h1 className='title-conte'>Materiales Reciclables</h1>
                    <section className="containerhome">
                        <article className="card">
                            <img className="media" src={`${process.env.PUBLIC_URL}/images/cartonypapel.jpeg`} alt="Papel y Cartón" />
                            <div className="content">
                                <h2 className="h2home">Papel y Cartón</h2>
                                <p>Papel blanco, mezclado, usado (no engrasado), periódicos, revistas, cajas de cartón, etc..</p>
                            </div>
                        </article>
                        <article className="card">
                            <img className="media" src={`${process.env.PUBLIC_URL}/images/platico1.jpeg`} alt="Plástico" />
                            <div className="content">
                                <h2 className="h2home">Plástico</h2>
                                <p>PET (botellas de condimentos o bebidas), PEAD (botellas de productos de aseo, contenedores de detergente) e icopor.</p>
                            </div>
                        </article>
                        <article className="card">
                            <img className="media" src={`${process.env.PUBLIC_URL}/images/vidrio1.jpeg`} alt="Vidrio" />
                            <div className="content">
                                <h2 className="h2home">Vidrio</h2>
                                <p>Botellas de vidrio, frascos de vidrios, vidrio de colores.</p>
                            </div>
                        </article>
                        <article className="card">
                            <img className="media" src={`${process.env.PUBLIC_URL}/images/metal1.jpeg`} alt="Metal" />
                            <div className="content">
                                <h2 className="h2home">Metal</h2>
                                <p>Chatarra, latas, aluminio, CLAUSEN.</p>
                            </div>
                        </article>
                    </section>
                </nav>
            </main>
        </div>
    );
};

export default Home;
