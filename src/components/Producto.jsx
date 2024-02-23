import { useEffect, useState } from 'react';
import { listProducto } from '../servivce/Producto'

const Producto = () => {
  const [productos, setProductos] = useState(null)
  useEffect(() => {
    listProducto(setProductos)
  }, [])
  return (
    <>
      <main>        
        <h1>Listado de productos: </h1>
        {productos != null ? (productos.map(producto => (
          <div key={producto.pro_id}>
            <h2>{producto.pro_nombre}</h2>
            <img src="{producto.pro_foto}" alt="" />
            <p>Puntos: {producto.pro_puntos}</p>
          </div>
        ))) : ('no hay productos')}

      </main>      
    </>
  );
}

export default Producto