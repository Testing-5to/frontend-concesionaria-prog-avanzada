import React, { useState } from "react";
import Box from "@mui/material/Box";
import DataTableEmpleados from "./DataTableEmpleados";
import NavbarEmpleados from "./NavbarEmpleados";

const DashboardEmpleados = () => {
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
      <NavbarEmpleados setBusqueda={setBusqueda} />
      <br />
      <DataTableEmpleados
        busqueda={busqueda}
        loading={loading}
        setLoading={setLoading}
      />
    </Box>
  );
};

export default DashboardEmpleados;
