import { Box } from "@mui/material";
import React from "react";
import Marca from "./Pages/Marca";
import Empleados from "./Pages/Empleados";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Clientes from "./Pages/Clientes";

const App = () => {
  return (
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
          <Route path="/cliente" element={<Clientes/>} /> 
          <Route path="*" element={<Marca />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
