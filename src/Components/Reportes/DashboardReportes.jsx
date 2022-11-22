import React, { useState } from "react";
import Box from "@mui/material/Box";
import NavbarReportes from "./NavbarReportes";

const DashboardReportes = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(true);

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
      <NavbarReportes />
      <br />
     
    </Box>
  );
};

export default DashboardReportes;
