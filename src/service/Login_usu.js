import axios from 'axios';

const authenticateUserAd = async (credentials) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/login", credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);    
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
export {
  authenticateUserAd
};
