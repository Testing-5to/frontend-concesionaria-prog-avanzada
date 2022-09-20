import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import FormularioClientes from "./FormularioClientes";
import { useState } from "react";
import styles from "../../Styles/styles";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Styles/material";



const NavbarClientes = ({setBusqueda}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#1D1D1D" }} position="static">
        <Toolbar>
          <Typography
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            LISTA DE CLIENTES
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {setBusqueda(e.target.value)}}
            />
          </Search>

          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ marginLeft: "12px" }}
          >
            Cliente
            <AddIcon sx={{ marginLeft: "2px" }} />
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles.box}>
              <FormularioClientes onClose={handleClose} isEdit={false} />
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarClientes;
