import axios from 'axios';
import JwtCli from '../utils/jwt';


const listCliente_producto = async (state) => {    
  try {
    const peticion = await axios.get(process.env.REACT_APP_API_URL + "/cliente_producto");
    state(peticion.data);
  } catch (error) {
    throw new Error("Error al obtener la lista: " + error.message);
  }
};



const postCliente_producto = async (data) => {
  try {
    JwtCli();
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/cliente_producto`, data);
    return response.data; 
  } catch (error) {
    throw new Error("Error al realizar la solicitud POST: " + error.message);
  }
};

const updateCliente_producto = async (productId, data) => {
  try {    
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/cliente_producto/${productId}`, data);
    
    return response.data; 
  } catch (error) {
    throw new Error("Error al realizar la solicitud PUT: " + error.message);
  }
};


export { listCliente_producto, postCliente_producto, updateCliente_producto };
