import React from "react";
import { Producto, LoginCli, RegistroCliente, LoginUsu, Layout, ProductoPost, LayoutCli, CRUDUsuario, Home, Recogida, Donar } from '../components';
import { Routes, Route } from "react-router-dom";
import SessionManager from "../utils/SessionManager";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginCli />}/>
      <Route path="/Registro" element={<RegistroCliente />}/>
      <Route path="/loginAdm" element={<LoginUsu />}/>
      <Route path="/" element={<LayoutCli><Home/></LayoutCli>} />
      <Route path="/recicla" element={<LayoutCli><Donar/></LayoutCli>} />
      <Route path="/CRUDproductos" element={<Layout><ProductoPost/></Layout>} />
      <Route path="/Recogida" element={<LayoutCli><SessionManager/><Recogida/></LayoutCli>} />
      <Route path="/CRUDusuario" element={<Layout><CRUDUsuario/></Layout>} />
      <Route path="/productos" element={<LayoutCli><Producto/></LayoutCli>} />          
    </Routes>
  );
};
