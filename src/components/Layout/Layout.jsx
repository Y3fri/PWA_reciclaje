import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Layout(props) {
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    
    navigate("/login");
  };

  return (
    <div className="App">

      <header className="headerLayout">
        <h1> PWA</h1>
        {isReadyForInstall && (
          <button className="buttonLayout" onClick={downloadApp}> Descargar APP</button>
        )}
        
        {isLoggedIn && <button onClick={handleLogout}>Cerrar Sesión</button>} 
      </header>

      <nav>
        <ul className="ulLayout">
          <li className="liLayout">
            <Link className="aLayout" to="../">Inicio</Link>
          </li>
          <li className="liLayout">
            <Link className="aLayout" to="../productos">Productos</Link>
          </li>
          <li className="liLayout">
            <Link className="aLayout" to="../acerca">Acerca</Link>
          </li>

        </ul>      
      </nav>

      {props.children}
    </div>
  );
}