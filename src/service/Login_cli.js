import axios from 'axios';

const authenticateUser = async (credentials) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/loginCli", credentials);
    const { token, cli_id, cli_totalpuntos } = response.data;    
    localStorage.setItem('token', token); 
    localStorage.setItem('cli_id', cli_id);
    localStorage.setItem('cli_totalpuntos', cli_totalpuntos);    
  } catch (error) {
    if (error.response) {
      console.error('Error de autenticación:', error.response.data.detail);
      throw new Error(error.response.data.detail);
    } else if (error.request) {      
      console.error('Error de red:', error.request);
      throw new Error('Error de red al intentar iniciar sesión');
    } else {      
      console.error('Error:', error.message);
      throw new Error('Error al intentar iniciar sesión');
    }
  }
};



const createCliente = async (sso_cliente) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/sso_cliente", sso_cliente);
    
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el cliente: " + error.message);
  }
};


export {
  createCliente,authenticateUser
};
