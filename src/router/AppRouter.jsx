import React from "react";
import { Producto, LoginCli, RegistroCliente, LoginUsu, Layout, ProductoPost, LayoutCli, CRUDUsuario, Home, Recogida, Donar, ValidCode, CambioContra, Emailverify, EmailverifyUsu,ValidCodeUsu, CambioContraUsu,SsoRecogida, SsoRecogidaDetalles } from '../components';
import { Routes, Route } from "react-router-dom";
import SessionManagerCli from "../utils/SessionManagerCli";
import SessionManager from "../utils/SessionManager";
import Expiracontra from "../utils/expiraCode";
import ExpiracontraUsu from "../utils/expiraCodeUsu";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginCli />}/>
      <Route path="/verificaEmail" element={<Emailverify />}/>
      <Route path="/validaCodigo" element={<><Expiracontra /><ValidCode /></>}/>
      <Route path="/reset-password/:token" element={<CambioContra />}/>
      <Route path="/Registro" element={<RegistroCliente />}/>
      <Route path="/loginAdm" element={<LoginUsu />}/>
      <Route path="/verificaEmailUsu" element={<EmailverifyUsu />}/>
      <Route path="/validaCodigoUsu" element={<><ExpiracontraUsu /><ValidCodeUsu /></>}/>
      <Route path="/reset-passwordUsu/:token" element={<CambioContraUsu />}/>
      <Route path="/" element={<LayoutCli><SessionManagerCli/><Home/></LayoutCli>} />
      <Route path="/recicla" element={<LayoutCli><SessionManagerCli/><Donar/></LayoutCli>} />
      <Route path="/CRUDproductos" element={<Layout><SessionManager/><ProductoPost/></Layout>} />
      <Route path="/Recogida" element={<LayoutCli><SessionManagerCli/><Recogida/></LayoutCli>} />
      <Route path="/CRUDusuario" element={<Layout><SessionManager/><CRUDUsuario/></Layout>} />      
      <Route path="/productos" element={<LayoutCli><SessionManagerCli/><Producto/></LayoutCli>} />          
      <Route path="/CRUDsso_recogida" element={<Layout><SessionManager/><SsoRecogida/></Layout>} />
      <Route path="/sso_recogida_details" element={<Layout><SessionManager/><SsoRecogidaDetalles/></Layout>} />
    </Routes>
  );
};
