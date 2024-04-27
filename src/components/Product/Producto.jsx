import { useEffect, useState } from 'react';
import { listProducto } from '../../service/Producto'
import './Producto.css';


const isImageFormat = (url) => {
  const imageFormats = ['jpg', 'jpeg', 'png', 'gif'];
  const extension = url.split('.').pop().toLowerCase();
  return imageFormats.includes(extension);
};


const Producto = () => {
  const [productos, setProductos] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      listProducto(setProductos);
    }
  }, []);
  return (
    <>
      {isLoggedIn && (
        <main className="main-producto">
          <h1 className="title">Listado de productos: </h1>
          <div className="contenedor-productos">
            {productos != null ? (
              <ul className='ulProducto'>
                {productos.map(producto => (
                  <li className='liProducto' key={producto.pro_id}>
                    <h2>{producto.pro_nombre}</h2>
                    {producto.pro_foto && isImageFormat(producto.pro_foto) ? (
                      <img src={producto.pro_foto} alt="" />
                    ) : (
                      <img src={`${process.env.PUBLIC_URL}/images/Sin_imagen_disponible.jpg`} alt="Imagen predeterminada" />
                    )}
                    <p>Puntos: {producto.pro_puntos}</p>
                    <p>Disponibles: {producto.pro_cantidad} </p>
                  </li>
                ))}
              </ul>
            ) : ('no hay productos')}

          </div>
        </main >
      )}
      <main>
        holaa
      </main>
    </>
  );

}

export default Producto