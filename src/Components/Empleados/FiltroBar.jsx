import { Button, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import styles from "../../Styles/styles";
import { FormularioFiltros } from "./FormularioFiltros";

export const FiltrosBar = ({ setFiltros }) => {
  // read the inputs and set the state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // A grid that is used to place filters in the top of the datatable of clientes
    // Contains a grid with 9 columns

    // Place the grid center
    <Grid
      container
      sx={{
        width: "95%",
        marginBottom: 2,
        backgroundColor: "white",
        display: "flex",
        margin: "auto",
      }}
    >
      <Grid
        item
        xs={3}
        sx={{
          ml: 2,
          my: 1,
        }}
      >
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{
            backgroundColor: styles.primaryColor,
            width: "100%",
            height: "100%",
          }}
        >
          <h4>Filtros multiples</h4>
        </Button>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          ml: 2,
          my: 1,
        }}
      >
        <Button
          onClick={() =>
            setFiltros({
              nombre: "",
              apellido: "",
              email: "",
              salarioMin: 0,
              salarioMax: 0,
              rol: "",
              direccion: "",
              provincia: "",
              localidad: "",
            })
          }
          variant="outlined"
          sx={{
            backgroundColor: styles.primaryColor,
            width: "100%",
            height: "100%",
          }}
        >
          <h4>Limpiar</h4>
        </Button>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.boxVenta}>
          <FormularioFiltros
            sx={{ height: "100%" }}
            onClose={handleClose}
            setFiltros={setFiltros}
          />
        </Box>
      </Modal>
    </Grid>
  );
};
