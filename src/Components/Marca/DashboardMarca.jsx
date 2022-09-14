import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import styles from "../../Styles/styles";
import DataTable from "./DataTableMarca";
import FormularioMarca from "./FormularioMarca";
import NavbarMarca from "./NavbarMarca";

const DashboardMarca = () => {
  const [open, setOpen] = useState(false);
  const [marca, setMarca] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const editarUnaMarca = (marca) => {
    const id = marca.row.id;
    const nombre = marca.row.nombre;
    const pais = marca.row.pais;
    setMarca({ id, nombre, pais });
    handleOpen();
  };
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <NavbarMarca />
      <br />
      <DataTable editarUnaMarca={editarUnaMarca} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.box}>
          <FormularioMarca onClose={handleClose} isEdit={true} marca={marca} />
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardMarca;
