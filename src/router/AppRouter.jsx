import React from "react";
import { About, Producto, LoginCli, RegistroCliente, LoginUsu, Layout } from '../components';
import { Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginCli />}/>
      <Route path="/Registro" element={<RegistroCliente />}/>
      <Route path="/loginAdm" element={<LoginUsu />}/>
      
      <Route path="/productos" element={<Layout><Producto/></Layout>} />
      <Route path="/acerca" element={<Layout><About /></Layout>} />
    
    </Routes>
  );
};
