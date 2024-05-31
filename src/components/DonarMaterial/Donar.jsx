import React, { useState } from "react";
import './Donar.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Donar = () => {


    const navigate = useNavigate();
    const [isLoggedIn] = useState(!!localStorage.getItem("token"));
    const handleRecogida = () => {
        navigate("../Recogida");
    };

    const handlelogin = () => {
        navigate("/login");
    };

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
            <main className="body">               
                    {isLoggedIn ? (
                        <div class="containerDonar">
                        <p class="title2">¿Listo para reciclar?</p>                        
                        <button onClick={handleRecogida} className="button1">Empezar</button>
                    </div>
                    ) : (
                        <div className="containerSesion">
                            <h2 className="title1">¡Inicia Sesión!</h2>
                            <p className="description">Para acceder a esta función, necesitas iniciar sesión.</p>
                            <button onClick={handlelogin} className="button">Iniciar Sesión</button>
                        </div>

                    )}
                

            </main>
        </div>
    );
};

export default Donar;
