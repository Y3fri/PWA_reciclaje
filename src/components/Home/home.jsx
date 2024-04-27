import React from 'react';
import './home.css';


const Home = () => {
    return (
        <div className="root">
            <header>
                <h1>Materiales Reciclables</h1>
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
