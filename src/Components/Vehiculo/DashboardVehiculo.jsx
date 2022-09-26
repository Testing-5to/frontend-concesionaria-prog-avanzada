import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTable from "./DataTableVehiculo";
import NavbarVehiculo from "./NavbarVehiculo";

const DashboardVehiculo = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

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
      <br />
      <DataTable
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
      />
    </Box>
  );
};

export default DashboardVehiculo;
