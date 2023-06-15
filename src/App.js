import { Box } from "@mui/material";
import React from "react";
import Marca from "./Pages/Marca";
import Empleados from "./Pages/Empleados";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Clientes from "./Pages/Clientes";
import Modelo from "./Pages/Modelo";
import Vehiculo from "./Pages/Vehiculo";
import DashboardHome from "./Pages/DashboardHome";
import Venta from "./Pages/Venta";
import Reportes from "./Pages/Reportes";

// componentes principal de la app
const App = () => {
  return (
    // wrapper de las rutas
    <BrowserRouter>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh",
        }}
      >
        <Sidebar />
        <Routes>
          <Route path="/marca" element={<Marca />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/modelo" element={<Modelo />} />
          <Route path="/vehiculo" element={<Vehiculo />} />
          <Route path="/ventas" element={<Venta />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="*" element={<DashboardHome />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
