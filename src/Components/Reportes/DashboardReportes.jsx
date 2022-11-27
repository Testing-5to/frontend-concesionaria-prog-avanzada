import React, { useState } from "react";
import Box from "@mui/material/Box";
import NavbarReportes from "./NavbarReportes";
import ReportsContainer from "./ReportsContainer";

const DashboardReportes = () => {
  // estados para el loader y la busqueda, a este nivel para compartirlos entre componentes
  const [loading, setLoading] = useState(false);

  // renderizamos el navbar y la datatable
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        top: "0",
        marginLeft: "80px",
      }}
    >
      <NavbarReportes />
      <ReportsContainer loading={loading} setLoading={setLoading}/>
      <br />
     
    </Box>
  );
};

export default DashboardReportes;
