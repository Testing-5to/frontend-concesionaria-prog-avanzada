import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import FormularioMarca from "./Marca/FormularioMarca";
import FormularioEmpleados from "./Empleados/FormularioEmpleados";
import { useState } from "react";
import styles from "../Styles/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "14ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = ({ nombre, setBusqueda }) => {
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
            {{ nombre }}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setBusqueda(e.target.value);
              }}
            />
          </Search>

          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ marginLeft: "12px" }}
          >
            {{ nombre }}
            <AddIcon sx={{ marginLeft: "2px" }} />
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles.box}>
              {nombre ===
                "LISTA DE MARCAS"(
                  <FormularioMarca onClose={handleClose} isEdit={false} />
                )}
              {nombre ===
                "LISTA DE EMPLEADOS"(
                  <FormularioEmpleados onClose={handleClose} isEdit={false} />
                )}
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
