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
        {/* renderizamos el sidebar a este nivel porque aparece en todas las pantallas */}
        <Sidebar />
        {/* renderizamos las rutas */}
        <Routes>
          <Route path="/marca" element={<Marca />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/modelo" element={<Modelo />} />
          <Route path="/vehiculo" element={<Vehiculo />} />
          <Route path="/ventas" element={<Venta />} />
          <Route path="*" element={<DashboardHome />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
