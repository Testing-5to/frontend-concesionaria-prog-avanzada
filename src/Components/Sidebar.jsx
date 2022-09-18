import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  //SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
//import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import styles from "../Styles/styles";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <ProSidebar
      collapsed={collapsed}
      width="150px"
      collapsedWidth="78px"
      onMouseOver={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      style={styles.sidebar}
    >
      <SidebarHeader style={styles.sideBarHeader}>
        <DirectionsCarIcon />
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<ViewCarouselIcon />}>
            Marca <Link to="/marca" />
          </MenuItem>
        </Menu>
      </SidebarContent>

      {/* <SidebarFooter style={styles.sideBarFooter}>
        <a
          style={{ color: "#ADADAD" }}
          href="https://github.com/alejocerutti4/frontend-concesionaria-prog-avanzada"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Sidebar;
