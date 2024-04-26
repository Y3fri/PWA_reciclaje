import axios from 'axios';


const listProducto = async (state) => {    
  try {
    const peticion = await axios.get(process.env.REACT_APP_API_URL + "/producto");
    state(peticion.data);
  } catch (error) {
    throw new Error("Error al obtener la lista de productos: " + error.message);
  }
};

const listProductoTodo = async (state) => {    
  try {
    const peticion = await axios.get(process.env.REACT_APP_API_URL + "/productoTodo");
    state(peticion.data);
  } catch (error) {
    throw new Error("Error al obtener la lista de productos: " + error.message);
  }
};


const postProducto = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/producto`, data);
    return response.data; 
  } catch (error) {
    throw new Error("Error al realizar la solicitud POST: " + error.message);
  }
};

export { listProducto, listProductoTodo, postProducto };
