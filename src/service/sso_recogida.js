import axios from 'axios';

const listsso_recogida = async (state) => {    
    try {
      const peticion = await axios.get(process.env.REACT_APP_API_URL + "/sso_recogida");
      state(peticion.data);
    } catch (error) {
      throw new Error("Error al obtener la lista de sso_recogidas: " + error.message);
    }
  };

const listsso_recogida_id = async (id) => {    
    try {
      const peticion = await axios.get(`${process.env.REACT_APP_API_URL}/sso_recogida_id/${id}`);
      return peticion.data
    } catch (error) {
      throw new Error("Error al obtener la lista de sso_recogidas: " + error.message);
    }
  };

const listsso_recogida_asignacion = async (state) => {    
    try {
      const peticion = await axios.get(process.env.REACT_APP_API_URL + "/sso_recogida_asignacion");
      state(peticion.data);
    } catch (error) {
      throw new Error("Error al obtener la lista de sso_recogidas: " + error.message);
    }
  };

  const updatesso_recogida = async (ssorecogidaId, data) => {
    try {      
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/sso_recogida/puntos/${ssorecogidaId}`, data);
      
      return response.data; 
    } catch (error) {
      throw new Error("Error al realizar la solicitud PUT: " + error.message);
    }
  };
  
  
export { listsso_recogida, updatesso_recogida, listsso_recogida_asignacion, listsso_recogida_id};