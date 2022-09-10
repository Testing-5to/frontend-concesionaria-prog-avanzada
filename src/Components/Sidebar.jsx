import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import DiamondIcon from '@mui/icons-material/Diamond';
import FavoriteIcon from '@mui/icons-material/Favorite';



const Sidebar = () => {
  return (
    <ProSidebar  collapsed={true}>
        <SidebarHeader style={{height: "64px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            CM
        </SidebarHeader>
        <SidebarContent >
            <Menu iconShape="square">
                <MenuItem icon={<DiamondIcon />}>Dashboard</MenuItem>
                <SubMenu title="Components" icon={<FavoriteIcon />}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu>    
            </Menu>
        </SidebarContent>
        <SidebarFooter style={{height: "64px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            FT
        </SidebarFooter>
    </ProSidebar>
  )
}

export default Sidebar