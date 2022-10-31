import React from "react";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import StoreIcon from "@mui/icons-material/Store";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const SingleCard = ({ title, icon, route }) => {
  const getIcon = () => {
    switch (icon) {
      case "marca":
        console.log("aaa");
        return <ViewCarouselIcon sx={{ color: "white" }} />;
      case "modelos":
        return <AutoAwesomeMotionIcon sx={{ color: "white" }} />;
      case "clientes":
        return <RecentActorsIcon sx={{ color: "white" }} />;
      case "empleados":
        return <PersonIcon sx={{ color: "white" }} />;
      case "vehiculos":
        return <DirectionsCarIcon sx={{ color: "white" }} />;
      case "ventas":
        return <StoreIcon sx={{ color: "white" }} />;
      default:
        return <ViewCarouselIcon sx={{ color: "white" }} />;
    }
  };
  return (
    <Link className="single__card" to={route}>
      <div style={{ width: "200px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          className="card__content"
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <h4>{title}</h4>
          {getIcon()}
        </div>
      </div>
    </Link>
  );
};

export default SingleCard;
