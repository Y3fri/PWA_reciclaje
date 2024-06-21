import axios from 'axios';
import JwtAdm from '../utils/jwtAd';

const authenticateUserAd = async (credentials) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/login", credentials);
    const { token,usu_rol,session } = response.data;
    const { uses_created_at, uses_expiration_timestamp, uses_active, uses_iduser } = session;     
    localStorage.setItem('token', token);   
    localStorage.setItem('usu_rol', usu_rol); 
    localStorage.setItem('active',uses_active);  
    localStorage.setItem('iduser',uses_iduser);
    localStorage.setItem('session_created_at', uses_created_at);
    localStorage.setItem('session_expiration_timestamp', uses_expiration_timestamp);     
    return { usu_rol };     
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

const deactivateSession = async (userId) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/deactivate-session/${userId}`);        
    localStorage.removeItem('token');
    localStorage.removeItem('usu_rol');
    localStorage.removeItem('iduser');
    localStorage.removeItem('active');
    localStorage.removeItem('session_created_at');
    localStorage.removeItem('session_expiration_timestamp');
  } catch (error) {       
      console.error('Error de red:', error.request);
      throw new Error('Error de red al intentar desactivar la sesión');   
  }
};

const listTodo = async (state) => {    
  try {
    JwtAdm();
    const peticion = await axios.get(process.env.REACT_APP_API_URL + "/sso_usuario");
    state(peticion.data);
  } catch (error) {
    throw new Error("Error al obtener la lista de usuarios: " + error.message);
  }
};

const listbyRol = async (state) => {    
  try {
    JwtAdm();
    const peticion = await axios.get(process.env.REACT_APP_API_URL + "/sso_usuario_rol");
    state(peticion.data);
  } catch (error) {
    throw new Error("Error al obtener la lista de usuarios: " + error.message);
  }
};

const listRol = async (state) => {    
  try {
    JwtAdm();
    const peticion = await axios.get(process.env.REACT_APP_API_URL + "/sso_rol");
    state(peticion.data);
  } catch (error) {
    throw new Error("Error al obtener la lista de usuarios: " + error.message);
  }
};


const postUsuario = async (sso_usuario) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/sso_usuario", sso_usuario);    
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el Usuario: " + error.message);
  }
};

const updateUsuario = async (usuarioId, data) => {
  try {
    JwtAdm();
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/sso_usuario/${usuarioId}`, data);
    
    return response.data; 
  } catch (error) {
    throw new Error("Error al realizar la solicitud PUT: " + error.message);
  }
};



export {
  authenticateUserAd, postUsuario, listTodo, updateUsuario, listRol,deactivateSession,listbyRol
};
