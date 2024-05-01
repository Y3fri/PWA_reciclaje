import axios from 'axios';
import JwtCli from '../utils/jwt';



const postRecogida = async (data) => {
  try {
    JwtCli();
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/recogida`, data);    
    return response.data; 
  } catch (error) {
    throw new Error("Error al realizar la solicitud POST: " + error.message);
  }
};



export { postRecogida };
