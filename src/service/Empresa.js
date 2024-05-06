import axios from 'axios';

const listEmpresa = async (state) => {    
  try {
    const peticion = await axios.get(process.env.REACT_APP_API_URL + "/empresa");
    state(peticion.data);    
  } catch (error) {
    throw new Error("Error al obtener la lista de productos: " + error.message);
  }
};

export { listEmpresa };