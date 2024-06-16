// SessionManager.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {deactivateSession} from '../service/Login_usu';

const SessionManager = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = () => {
            console.log('Cerrando sesión...');
            localStorage.removeItem('token');
            localStorage.removeItem('usu_rol');
            localStorage.removeItem('active');
            localStorage.removeItem('session_created_at');
            localStorage.removeItem('session_expiration_timestamp');
            navigate('/loginAdm');
        };


        
        const handleLogout = async () => {
            const userId = localStorage.getItem('iduser');
            if (!userId) {
                console.error('No se pudo obtener el ID del usuario desde el almacenamiento local.');
                return;
            }
    
            try {
                
                await deactivateSession(userId);                
                navigate("/loginAdm");
            } catch (error) {
                console.error('Error al intentar cerrar sesión:', error.message);
                
            }
        };

        const checkSessionExpiration = () => {
            const sessionExpirationTimestamp = localStorage.getItem('session_expiration_timestamp');           
            if (sessionExpirationTimestamp) {
                const expirationTime = new Date(sessionExpirationTimestamp).getTime();
                const currentTime = new Date().getTime();                
                if (currentTime > expirationTime) {
                    handleLogout();
                    logout();
                }
            }
        };
        
        const interval = setInterval(checkSessionExpiration, 300000);            
        checkSessionExpiration();        
        return () => clearInterval(interval);
    }, [navigate]);

    return null;
};

export default SessionManager;
