import { Box } from '@mui/material'
import React from 'react'
import Marca from './Pages/Marca'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Sidebar from './Components/Sidebar';


const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{display: "flex", flexDirection: "row", width: "100%", height: "100vh"}}>
        <Sidebar/>
        <Routes>
          <Route path="/marca" element={<Marca/>} />
          {/* <Route path="/autos" element={<DashboardAuto/>} /> */}
          <Route path="*" element={<Marca/>}/>
        </Routes>
      </Box>

      
       
    </BrowserRouter>
  )
}

export default App