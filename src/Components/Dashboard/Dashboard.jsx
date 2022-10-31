import React, { useEffect, useState } from "react";
import "./styles/dashboard.css";
import SingleCard from "./reuseable/SingleCard";
import { DotLoader } from "react-spinners";
import { Box } from "@mui/system";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: 'https://www.carlogos.org/car-logos/nissan-logo-2013-700x700.png',
  },
  {
    original: 'https://1000marcas.net/wp-content/uploads/2020/01/Fiat-logo.png',
  },
  {
    original: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png',
  },
  {
    original: 'https://www.carlogos.org/car-logos/porsche-logo-950x1100.png',
  },
  {
    original: 'https://www.pngmart.com/files/10/Renault-Logo-PNG-Transparent-Image.png' ,
  },
  {
    original: 'https://noticias.coches.com/wp-content/uploads/2017/03/emblema-de-tesla.png',
  },
];

const Dashboard = () => {
  // estados del dashboard
  const [loading, setLoading] = useState(true);

  // funcion para obtener los datos de los graficos
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // renderizamos el dashboard
  return loading ? (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DotLoader color="#1D1D1D" />
    </div>
  ) : (
    <Box sx={{width: "100%", height: "100vh"}} >
    
      
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
  );
};

export default Dashboard;
