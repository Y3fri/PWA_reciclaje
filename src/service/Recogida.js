import axios from 'axios';
import JwtCli from '../utils/jwt';



const postRecogida = async (data) => {
  try {
    JwtCli();
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/recogida`, data);    
    return response.data; 
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};



export { postRecogida };