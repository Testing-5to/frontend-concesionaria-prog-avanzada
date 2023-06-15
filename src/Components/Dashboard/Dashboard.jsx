import React, { useEffect, useState } from "react";
import "./styles/dashboard.css";
import SingleCard from "./reuseable/SingleCard";
import { DotLoader } from "react-spinners";
import { Box } from "@mui/system";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: './images/emblema-de-tesla.png',
  },
  {
    original: './images/Fiat-logo.png',
  },
  {
    original: './images/Lamborghini_Logo.svg.png',
  },
  {
    original: './images/nissan-logo-2013-700x700.png',
  },
  {
    original: './images/Renault-Logo-PNG-Transparent-Image.png',
  }
];

const Dashboard = () => {
   return <Box sx={{width: "100%", height: "100vh"}} >
        <Box sx={{display: "flex", justifyContent: "space-around", width: "100%"}}>
          <SingleCard title="Marca" icon="marca" route="/marca"/>
          <SingleCard title="Modelos" icon="modelos" route="/modelo"/>
          <SingleCard title="Vehiculos" icon="vehiculos" route="/vehiculo"/>
          <SingleCard title="Clientes" icon="clientes" route="/clientes"/>
          <SingleCard title="Empleados" icon="empleados" route="/empleados"/>
          <SingleCard title="Ventas" icon="ventas" route="/ventas"/>
        </Box>

        <Box sx={{display: "flex", justifyContent: "center", height: "100%", marginTop: "30px"}}>
          <ImageGallery sx={{height: "100%"}} items={images} autoPlay={true} showPlayButton={false} showBullets={false} showFullscreenButton={false} showNav={true}/>

        </Box>
    </Box>
};

export default Dashboard;
