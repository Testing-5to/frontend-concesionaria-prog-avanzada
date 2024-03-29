import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import StoreIcon from "@mui/icons-material/Store";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link } from "react-router-dom";
import styles from "../Styles/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const hidden = collapsed ? styles.visibilityHidden : styles.visibilityVisible;

  return (
    <div style={{ height: "100% !important" }}>
      <ProSidebar
        collapsed={collapsed}
        width="200px"
        collapsedWidth="80px"
        onMouseOver={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        style={styles.sideBar}
      >
        <SidebarHeader>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "64px",
            }}
          >
            <Link to="/">
            <img
              src="./logo2.png"
              id="logo"
              alt="logo2"
              border="0"
              /></Link>
          </Box>
        </SidebarHeader>
        <SidebarContent style={{ marginTop: "10px" }}>
          <Menu iconShape="square">
            {/* Abmc's de autos */}
            <Box sx={styles.sidebarLabels}>
              <Typography style={hidden}>Entidades</Typography>
            </Box>
            <MenuItem icon={<ViewCarouselIcon />}>
              <strong>Marca</strong> <Link to="/marca" />
            </MenuItem>
            <MenuItem icon={<AutoAwesomeMotionIcon />}>
              <strong>Modelo</strong> <Link to="/modelo" />
            </MenuItem>
            <MenuItem icon={<DirectionsCarIcon />}>
              <strong>Vehículo</strong> <Link to="/vehiculo" />
            </MenuItem>
            <br />
            {/* Abmc's de personas */}
            <Box sx={styles.sidebarLabels}>
              <Typography style={hidden}>Personal</Typography>
            </Box>
            <MenuItem icon={<RecentActorsIcon />}>
              <strong>Clientes</strong> <Link to="/clientes" />
            </MenuItem>
            <MenuItem icon={<PersonIcon />}>
              <strong>Empleados</strong> <Link to="/empleados" />
            </MenuItem>
            <br />
            {/* Abmc's de ventas */}
            <Box sx={styles.sidebarLabels}>
              <Typography style={hidden}>Ventas</Typography>
            </Box>
            <MenuItem icon={<StoreIcon />}>
              <strong>Ventas</strong> <Link to="/ventas" />
            </MenuItem>
            <MenuItem icon={<AssessmentIcon />}>
              <strong>Reportes</strong> <Link to="/reportes" />
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
