import { useEffect, useState } from 'react';
import { listProducto } from '../../service/Producto'
import { useNavigate } from "react-router-dom";
import './Producto.css';
import { Link } from "react-router-dom";

const isImageFormat = (url) => {
  const imageFormats = ['jpg', 'jpeg', 'png', 'gif'];
  const extension = url.split('.').pop().toLowerCase();
  return imageFormats.includes(extension);
};


const Producto = () => {
  const [productos, setProductos] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      listProducto(setProductos).then(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const cli_puntos = localStorage.getItem('cli_totalpuntos');  

  const navigate = useNavigate();
  const [isLoggedIn1] = useState(!!localStorage.getItem("token"));
  const handleRecogida = () => {
      navigate("../Recogida");
  };
  return (
    <>
      <header className='header-conte'>
        <h1 className='title-conte'>Materiales Reciclables</h1>
        {isLoggedIn1 && (
          <button onClick={handleRecogida} className="recodiga-button">Donar Materiales</button>
        )}
      </header>
      <p className="puntos-acumulados">
                <span>{cli_puntos}</span>
                puntos! 🌟
            </p>
      {isLoggedIn && (
        <main className="main-producto">
          
          <nav>
            <ul className="ulLayout">
              <li className="liLayout">
                <Link className="aLayout" to="../">Inicio</Link>
              </li>
              <li className="liLayout">
                <Link className="aLayout" to="../productos"> Productos</Link>
              </li>
            </ul>
          </nav>
          <div className="contenedor-productos">
            {isLoading ? (
              <div className="LoadingModal">
                <div className="LoadingSpinner"></div>
              </div>
            ) : (
              productos != null ? (
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
              ) : ('No hay productos')
            )}
          </div>
        </main>
      )}
    </>
  );
}

export default Producto;
