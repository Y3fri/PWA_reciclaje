import React, { useState } from "react";
import './home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn] = useState(!!localStorage.getItem("token")); 
    const handleRecogida = () => {
        navigate("../Recogida");
    };

    return (
        <div className="root">
            <header className='header-conte'>
                <h1>Materiales Reciclables</h1>
                {isLoggedIn && (
                    <button onClick={handleRecogida} className="recodiga-button">Donar Materiales</button>
                )}  
            </header>
            <main>
                <section className="container">
                    <article className="card">
                        <img className="media" src={`${process.env.PUBLIC_URL}/images/Sin_imagen_disponible.jpg`} alt="Papel y Cartón" />
                        <div className="content">
                            <h2>Papel y Cartón</h2>
                            <p>El papel y el cartón son materiales reciclables que pueden ser reutilizados para hacer nuevos productos.</p>
                        </div>
                    </article>
                    <article className="card">
                        <img className="media" src={`${process.env.PUBLIC_URL}/images/Sin_imagen_disponible.jpg`} alt="Plástico" />
                        <div className="content">
                            <h2>Plástico</h2>
                            <p>El plástico es un material reciclable que se puede transformar en diversos productos, reduciendo la contaminación.</p>
                        </div>
                    </article>
                    <article className="card">
                        <img className="media" src={`${process.env.PUBLIC_URL}/images/Sin_imagen_disponible.jpg`} alt="Vidrio" />
                        <div className="content">
                            <h2>Vidrio</h2>
                            <p>El vidrio es un material reciclable que puede ser fundido y reutilizado para fabricar nuevos envases y objetos.</p>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default Home;
