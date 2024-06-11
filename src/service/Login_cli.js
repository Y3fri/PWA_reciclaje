import axios from 'axios';


const getClienteById = async (id, setState) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/sso_cliente/${id}`);
    setState(response.data);
  } catch (error) {
    throw new Error("Error al obtener el cliente: " + error.message);
  }
};



const authenticateUser = async (credentials) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/loginCli", credentials);
    const { token, cli_id, session} = response.data;    
    const { ses_created_at, ses_expiration_timestamp } = session;        
    localStorage.setItem('token', token);
    localStorage.setItem('cli_id', cli_id);   
    localStorage.setItem('session_created_at', ses_created_at);
    localStorage.setItem('session_expiration_timestamp', ses_expiration_timestamp);     
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
  createCliente,authenticateUser,getClienteById
};
