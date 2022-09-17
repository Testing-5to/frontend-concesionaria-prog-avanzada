import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import StoreIcon from '@mui/icons-material/Store';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import styles from "../Styles/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const hidden = collapsed ?  styles.visibilityHidden: styles.visibilityVisible;

  return (
    <ProSidebar
      collapsed={collapsed}
      width="200px"
      collapsedWidth="80px"
      onMouseOver={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      style={styles.sideBar}
    >
      <SidebarHeader style={styles.sideBarHeader}>
        <DirectionsCarIcon />
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="square">
          {/* Abmc's de autos */}
          <Box sx={styles.sidebarLabels}>
            <Typography style={hidden}>Entidades</Typography>
          </Box>
          <MenuItem icon={<ViewCarouselIcon />}>
            <strong>Marca</strong> <Link to="/marca" />
          </MenuItem>
          <MenuItem icon={<AutoAwesomeMotionIcon />}>
            <strong>Modelo</strong> <Link to="/marca" />
          </MenuItem>
          <MenuItem icon={<DirectionsCarIcon />}>
            <strong>Auto</strong> <Link to="/marca" />
          </MenuItem>
          <br/>
          {/* Abmc's de personas */}
          <Box sx={styles.sidebarLabels}>
            <Typography style={hidden}>Personas</Typography>
          </Box>
          <MenuItem icon={<RecentActorsIcon />}>
            <strong>Clientes</strong> <Link to="/marca" />
          </MenuItem>
          <MenuItem icon={<PersonIcon/>}>
            <strong>Personal</strong> <Link to="/marca" />
          </MenuItem>
          <br/>
          {/* Abmc's de ventas */}
          <Box sx={styles.sidebarLabels}>
            <Typography style={hidden}>Ventas</Typography>
          </Box>
          <MenuItem icon={<StoreIcon />}>
            <strong>Venta</strong> <Link to="/marca" />
          </MenuItem>
        </Menu>
      </SidebarContent>

     
    </ProSidebar>
  );
};

export default Sidebar;
