import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTable from "./DataTableVehiculo";
import NavbarVehiculo from "./NavbarVehiculo";
import { FiltrosBar } from "./FiltroBar";

const DashboardVehiculo = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    marca: "",
    modelo: "",
    tipoVehiculo: "",
    pais: "",
    anio: "",
    importado: "",
    compraMin: 0,
    compraMax: 0,
    ventaMin: 0,
    ventaMax: 0,
    cantidad: "",
  });

  // renderizamos el navbar y la datatable
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        top: "0",
        marginLeft: "80px",
      }}
    >
      <NavbarVehiculo setBusqueda={setBusqueda} />
      <FiltrosBar setFiltros={setFiltros} />
      <br />
      <DataTable
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
        filtros={filtros}
      />
    </Box>
  );
};

export default DashboardVehiculo;
