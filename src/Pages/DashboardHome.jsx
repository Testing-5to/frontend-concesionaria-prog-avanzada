import { Box } from '@mui/system'
import React from 'react'
import Dashboard from '../Components/Dashboard/Dashboard'
import NavbarDashboard from '../Components/Dashboard/NavbarDashboard'

const DashboardHome = () => {
  return (
    <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "80px"}}>
      <NavbarDashboard sx={{width: "100%"}}/>
      <Dashboard />
    </Box>
  )
}

export default DashboardHome