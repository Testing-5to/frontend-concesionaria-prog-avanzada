import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTable from "./DataTableModelo";
import NavbarModelo from "./NavbarModelo";

const DashboardModelo = () => {
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
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
      <NavbarModelo setBusqueda={setBusqueda} />
      <br />
      <DataTable
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
      />
    </Box>
  );
};

export default DashboardModelo;
