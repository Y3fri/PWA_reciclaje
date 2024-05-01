import axios from 'axios';


const listComu = async (state) => {    
  try {
    const peticion = await axios.get(process.env.REACT_APP_API_URL + "/comuna");
    state(peticion.data);
  } catch (error) {
    throw new Error("Error al obtener la lista de comuna: " + error.message);
  }
};

export { listComu };