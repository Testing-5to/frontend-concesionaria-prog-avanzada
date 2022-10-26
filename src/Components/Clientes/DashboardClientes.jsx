import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTableClientes from "./DatatableClientes";
import NavbarClientes from "./NavbarClientes";
import { FiltrosBar } from "./FiltrosBar";

// este componente es el que se encarga de renderizar el dashboard de clientes
const DashboardClientes = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    provincia: "",
    localidad: "",
    esCliente: true,
  });

  const handleFiltros = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  // renderizamos el navbar y la datatable
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        top: "0",
        marginLeft: "80px",
      }}
    >
      <NavbarClientes setBusqueda={setBusqueda} />
      <br />
      <FiltrosBar handleFiltros={handleFiltros} />
      <DataTableClientes
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
        filtros={filtros}
      />
    </Box>
  );
};

export default DashboardClientes;
