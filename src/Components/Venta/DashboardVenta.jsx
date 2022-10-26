import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTableVenta from "./DataTableVenta";
import NavbarVentas from "./NavbarVenta";

const DashboardVenta = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

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
      <br />
      <DataTableVenta
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
      />
    </Box>
  );
};

export default DashboardVenta;
