import React from 'react'
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom'


const Sidebar = () => {
    return (
        <ProSidebar collapsed={true}>
            <SidebarHeader style={{ height: "64px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <DirectionsCarIcon />
            </SidebarHeader>
            <SidebarContent >
                <Menu iconShape="square">
                    <MenuItem icon={<ViewCarouselIcon />}><Link to="/marca" /></MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ height: "64px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <a style={{color: "#ADADAD"}} href="https://github.com/alejocerutti4/frontend-concesionaria-prog-avanzada" target="_blank" ><GitHubIcon /></a>
            </SidebarFooter>
        </ProSidebar>
    )
}

export default Sidebar