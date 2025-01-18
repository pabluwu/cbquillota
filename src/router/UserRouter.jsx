import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SolicitarUnidad from "../pages/SolicitarUnidad";
import Solicitudes from "../pages/Solicitudes";
import SolicitudDetalle from "../pages/SolicitudDetalle";
export const UserRouter = () => {

  return (
    <Routes>
      {/* <Route path="/" element={<Home/>}/> */}
      <Route path="/solicitar-unidad" element={<SolicitarUnidad/>}/>
      <Route path="/solicitudes" element={<Solicitudes/>}/>
      <Route path="/solicitud/:codigo" element={<SolicitudDetalle/>}/>
    </Routes>
  );
};