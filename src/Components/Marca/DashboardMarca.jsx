import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import React from 'react'
import DataTable from './DataTableMarca'
import FormularioMarca from './FormularioMarca'
import NavbarMarca from './NavbarMarca'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
const DashboardMarca = () => {
    const [open, setOpen] = React.useState(false);
    const [marca, setMarca] = React.useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const editarUnaMarca = (marca) => {
        const id = marca.row.id;
        const nombre = marca.row.nombre;
        const pais = marca.row.pais;
        setMarca({id, nombre, pais});
        handleOpen();
    }
  return (
    <Box sx={{width: "100%", display: "flex", flexDirection:"column"}}>
        <NavbarMarca/>
        <br/>
        <DataTable editarUnaMarca={editarUnaMarca}/>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FormularioMarca onClose={handleClose} isEdit={true} marca={marca}/>
            </Box>
          </Modal>
    </Box>
  )
}

export default DashboardMarca