import React from "react";
import { Producto, LoginCli, RegistroCliente, LoginUsu, Layout, ProductoPost, LayoutCli, CRUDUsuario, Home, Recogida } from '../components';
import { Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginCli />}/>
      <Route path="/Registro" element={<RegistroCliente />}/>
      <Route path="/loginAdm" element={<LoginUsu />}/>
      <Route path="/" element={<LayoutCli><Home/></LayoutCli>} />
      <Route path="/CRUDproductos" element={<Layout><ProductoPost/></Layout>} />
      <Route path="/Recogida" element={<LayoutCli><Recogida/></LayoutCli>} />
      <Route path="/CRUDusuario" element={<Layout><CRUDUsuario/></Layout>} />
      <Route path="/productos" element={<LayoutCli><Producto/></LayoutCli>} />          
    </Routes>
  );
};
