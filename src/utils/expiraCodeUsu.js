// SessionManager.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletecodeUsu} from '../service/cambiocontrausu';

const ExpiracontraUsu = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const contra = () => {
            localStorage.removeItem('correoUsu');
            localStorage.removeItem('expiration_timestampUsu');
            navigate('/loginAdm');
        };


        
        const handlecontra = async () => {
            const correo = localStorage.getItem('correoUsu');            
            if (!correo) {
                console.error('No se pudo obtener el correo del usuario desde el almacenamiento local.');
                return;
            }
    
            try {
                
                await deletecodeUsu(correo);                
                navigate("/loginAdm");
            } catch (error) {
                console.error('Error al intentar cambiar la contraseña:', error.message);
                
            }
        };

        const checkExpiration = () => {
            const sessionExpirationTimestamp = localStorage.getItem('expiration_timestampUsu');           
            if (sessionExpirationTimestamp) {
                const expirationTime = new Date(sessionExpirationTimestamp).getTime();
                const currentTime = new Date().getTime();                
                if (currentTime > expirationTime) {
                    handlecontra();
                    contra();
                }
            }
        };
        
        const interval = setInterval(checkExpiration, 120000);            
        checkExpiration();        
        return () => clearInterval(interval);
    }, [navigate]);

    return null;
};

export default ExpiracontraUsu;
