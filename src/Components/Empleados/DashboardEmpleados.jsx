import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTableEmpleados from "./DataTableEmpleados";
import NavbarEmpleados from "./NavbarEmpleados";
import { FiltrosBar } from "./FiltroBar";

const DashboardEmpleados = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    nombre: "",
    apellido: "",
    email: "",
    salarioMin: 0,
    salarioMax: 0,
    rol: "",
    direccion: "",
    provincia: "",
    localidad: "",
  });
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
      <NavbarEmpleados setBusqueda={setBusqueda} />
      <FiltrosBar setFiltros={setFiltros} />
      <br />
      <DataTableEmpleados
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
        filtros={filtros}
      />
    </Box>
  );
};

export default DashboardEmpleados;
