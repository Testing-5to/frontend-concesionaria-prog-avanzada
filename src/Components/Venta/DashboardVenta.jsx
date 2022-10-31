import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTableVenta from "./DataTableVenta";
import NavbarVentas from "./NavbarVenta";
import { FiltrosBar } from "./FiltrosBar";

const DashboardVenta = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    fechaDesde: "",
    fechaHasta: "",
    modelo: "",
    marca: "",
    pais: "",
    cantidad: "",
    pUnitarioMin: 0,
    pUnitarioMax: 0,
    totalMin: 0,
    totalMax: 0,
    vendedor: "",
    cliente: "",
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
      <NavbarVentas setBusqueda={setBusqueda} />
      <FiltrosBar setFiltros={setFiltros} />
      <br />
      <DataTableVenta
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
        filtros={filtros}
      />
    </Box>
  );
};

export default DashboardVenta;
