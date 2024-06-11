// SessionManager.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionManager = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = () => {
            console.log('Cerrando sesión...');
            localStorage.removeItem('token');
            localStorage.removeItem('cli_id');
            localStorage.removeItem('session_created_at');
            localStorage.removeItem('session_expiration_timestamp');
            navigate('/login');
        };

        const checkSessionExpiration = () => {
            const sessionExpirationTimestamp = localStorage.getItem('session_expiration_timestamp');           
            if (sessionExpirationTimestamp) {
                const expirationTime = new Date(sessionExpirationTimestamp).getTime();
                const currentTime = new Date().getTime();                
                if (currentTime > expirationTime) {
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
