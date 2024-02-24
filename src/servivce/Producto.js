import axios from 'axios'

const listProducto = async (state) =>{    
    const peticion = await axios.get(process.env.REACT_APP_API_URL+"/producto")
    state(peticion.data)
}

export{
    listProducto
}