import axios from 'axios';

const verifyEmailUsu = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-emailUsu`, data);
        const { expiration, correo } = response.data;                        
        localStorage.setItem('expiration_timestampUsu', expiration); 
        localStorage.setItem('correoUsu', correo); 
    } catch (error) {
        throw new Error("Error al realizar la solicitud POST: " + error.message);
    }
};

const validCodeUsu = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/valid-codeUsu`, data);
        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud POST: " + error.message);
    }
};

const resetPasswordUsu = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/reset-passwordUsu`, data);
        return response.data;
    } catch (error) {
        throw new Error("Error al realizar la solicitud POST: " + error.message);
    }
};



const deletecodeUsu = async (correo) => {
    try {      
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-codeUsu`, {data: { correo: correo }});      
      return response.data; 
    } catch (error) {
      throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
  };
  

export { verifyEmailUsu, validCodeUsu, resetPasswordUsu,deletecodeUsu };