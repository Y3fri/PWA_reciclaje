import { useEffect, useState } from 'react';
import { listProducto } from '../../service/Producto';
import { getClienteById } from '../../service/Login_cli';
import { useNavigate } from "react-router-dom";
import './Producto.css';
import { Link } from "react-router-dom";
import ModalPuntos from './Modales/ModalPuntos';
import ErrorMessage from './Message/Error';

const isImageFormat = (url) => {
  const imageFormats = ['jpg', 'jpeg', 'png', 'gif'];
  const extension = url.split('.').pop().toLowerCase();
  return imageFormats.includes(extension);
};

const Producto = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [isClienteLoading, setIsClienteLoading] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  
 
  const clienteId = localStorage.getItem('cli_id');
  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoggedIn(true);
      listProducto(setProductos).then(() => {
        setIsLoading(false);
      });
      getClienteById(clienteId, setCliente)
        .then(() => {
          setIsClienteLoading(false);
        })
        .catch(error => {
          console.error("Error al obtener el cliente:", error);
          setIsClienteLoading(false);
        });
    }
  }, []);

  const openModal = (producto) => {
    if (cli_puntos >= producto.pro_puntos){
    setSelectedProduct(producto);
    setShowModal(true);
    }else{
      setShowErrorMessage(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    getClienteById(clienteId, setCliente)
  };

  const handlelogin = () => {
    navigate("/login");
  };

  const cli_puntos = cliente ? cliente.cli_totalpuntos : 0;
  const cli_id = cliente ? cliente.cli_id : null;
  
  return (
    <>
      <div className='root-home'>
        <nav className='navintro'>
          <ul className="ulLayout">
            <li className="liLayout">
              <Link className="aLayout iconLink" to="../">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-question-mark" width="34" height="34" viewBox="0 0 24 24" strokeWidth="3.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
                  <path d="M12 19l0 .01" />
                </svg>
              </Link>
              <Link className="aLayout textLink" to="../">Inicio</Link>
            </li>
            <li className="liLayout">
              <Link className="aLayout iconLink" to="../recicla">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="34" height="34" viewBox="0 0 24 24" strokeWidth="3.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24H0z" fill="none" />
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
              </Link>
              <Link className="aLayout textLink" to="../recicla">Reciclar</Link>
            </li>
            <li className="liLayout">
              <Link className="aLayout iconLink" to="../productos">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="34" height="34" viewBox="0 0 24 24" strokeWidth="3.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </Link>
              <Link className="aLayout textLink" to="../productos">Productos</Link>
            </li>
          </ul>
        </nav>

        {isLoggedIn ? (
          <main className="main-producto">
            <p className="puntos-acumulados">
              <span className="cuadro-blanco">
                <span className="puntos">{cli_puntos}</span>
                <span className="texto-puntos">Puntos</span>
              </span>
            </p>

            <h1 className='title-conte'>Productos redimibles</h1>
            <div className="contenedor-productos1">
              {isLoading  || isClienteLoading ? (
                <div className="LoadingModal">
                  <div className="LoadingSpinner"></div>
                </div>
              ) : (
                productos != null ? (
                  <ul className='ulProducto'>
                    {productos.map(producto => (
                      <li className='liProducto' key={producto.pro_id} onClick={() => openModal(producto)}>
                        {cli_puntos >= producto.pro_puntos ? (
                          <>
                            <h2>{producto.pro_nombre}</h2>
                            {producto.pro_foto && isImageFormat(producto.pro_foto) ? (
                              <img className='imagenProducto' src={`${process.env.REACT_APP_API_URL}/images/${producto.pro_nombre}/file`} alt={producto.pro_nombre} />
                            ) : (
                              <img className='imagenProducto' src={`${process.env.PUBLIC_URL}/images/Sin_imagen_disponible.jpg`} alt="Imagen predeterminada" />
                            )}
                            <p>Puntos: {producto.pro_puntos}</p>
                            <p>Disponibles: {producto.pro_cantidad} </p>
                          </>
                        ) : (
                          <>
                            <div className="image-container">
                              <img className='imagenCadena' src={`${process.env.PUBLIC_URL}/images/Cadenas.png`} alt="No suficientes puntos" />
                              <div className="text-overlay">
                                <p>{producto.pro_puntos}</p>
                                <p>Puntos</p>
                              </div>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : ('No hay productos')
              )}
            </div>
          </main>
        ) : (
          <div className="containerSesion">
            <h2 className="title1">¡Inicia Sesión!</h2>
            <p className="description">Para acceder a esta función, necesitas iniciar sesión.</p>
            <button onClick={handlelogin} className="button">Iniciar Sesión</button>
          </div>
        )}
      </div>
      {showErrorMessage && <ErrorMessage onClose={handleCloseErrorMessage} />}

      {showModal && (
        <ModalPuntos 
          closeModal={closeModal} 
          updateProductList={() => listProducto(setProductos)}
          selectedProduct={selectedProduct}
          clienteId={cli_id}
          cli_puntos={cli_puntos}
        />
      )}
    </>
  );
}

export default Producto;
