import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTableClientes from "./DatatableClientes";
import NavbarClientes from "./NavbarClientes";

const DashboardClientes = () => {
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
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
      <DataTableClientes
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
      />
    </Box>
  );
};

export default DashboardClientes;
