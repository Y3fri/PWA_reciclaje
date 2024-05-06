import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LayoutCli.css';
import { listEmpresa } from "../../service/Empresa";

export default function LayoutCli(props) {
    const [empresas, setEmpresa] = useState(null)
    const [isReadyForInstall, setIsReadyForInstall] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        listEmpresa(setEmpresa);

        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            console.log("👍", "beforeinstallprompt", event);
            window.deferredPrompt = event;
            setIsReadyForInstall(true);
        });

        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", () => { });
        };
    }, []);

    async function downloadApp() {
        console.log("👍", "butInstall-clicked");
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
            console.log("oops, no prompt event guardado en window");
            return;
        }
        promptEvent.prompt();
        const result = await promptEvent.userChoice;
        console.log("👍", "userChoice", result);
        window.deferredPrompt = null;
        setIsReadyForInstall(false);
    }
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);

        navigate("/login");
    };
    

    return (
        <div className="App">

            <header className="headerLayout">
                {empresas && empresas.length > 0 && (
                    <h1>{empresas[0].inf_razon_social}</h1>
                )}

                {isReadyForInstall && (
                    <button className="buttonLayout" onClick={downloadApp}> Descargar APP</button>
                )}

                {isLoggedIn ? (
                    <button className="loginButton" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M0 0h24v24H0z" stroke="none" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.009 .128" />
                            <path d="M16 19h6" />
                        </svg>
                    </button>
                ) : (
                    <button className="loginButton" onClick={handleLogin}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M0 0h24v24H0z" stroke="none" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M16 19h6" />
                            <path d="M19 16v6" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                        </svg>
                    </button>
                )}

            </header>         
            {props.children}

            <footer className="footerLayout">
                <div className="footerContent">
                    {empresas && empresas.length > 0 && (
                        <div key={empresas[0].inf_id}>
                            <p>Razón Social: {empresas[0].inf_razon_social}</p>
                            <p>Email: {empresas[0].inf_email}</p>
                            <p>Teléfono: {empresas[0].inf_telefono}</p>
                            <p>Facebook: {empresas[0].inf_facebook}</p>
                            <p>TikTok: {empresas[0].inf_tiktok}</p>
                            <p>Municipio: {empresas[0].inf_municipio}</p>
                            <p>NIT: {empresas[0].inf_nit}</p>
                            <p>Dirección: {empresas[0].inf_direccion}</p>
                            <p>Instagram: {empresas[0].inf_instagram}</p>
                            <img src={empresas[0].inf_logo} alt="Logo de la empresa" />
                        </div>
                    )}
                    <p>¡Gracias por visitarnos!</p>
                    <p>Síguenos en nuestras redes sociales:</p>
                    <div className="socialIcons">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
