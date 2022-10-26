import { Grid } from "@mui/material";
import React from "react";

export const FiltrosBar = ({ handleFiltros }) => {
  // read the inputs and set the state
  const handleChange = (e) => {
    handleFiltros(e);
    console.log(e.target.value);
  };

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
        justifyContent: "space-between",
        alignItems: "center",
        margin: "auto",
        height: "50px",
      }}
      columns={9}
    >
      <Grid item sx={{}}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => handleChange(e)}
          name="nombre"
        />
      </Grid>
      <Grid item sx={{}}>
        <input
          type="text"
          placeholder="Buscar por apellido"
          onChange={(e) => handleChange(e)}
          name="apellido"
        />
      </Grid>
      <Grid item sx={{}}>
        <input
          type="text"
          placeholder="Buscar por telefono"
          onChange={(e) => handleChange(e)}
          name="telefono"
        />
      </Grid>
      <Grid item sx={{}}>
        <input
          type="text"
          placeholder="Buscar por email"
          onChange={(e) => handleChange(e)}
          name="email"
        />
      </Grid>
      <Grid item sx={{}}>
        <input
          type="text"
          placeholder="Buscar por direccion"
          onChange={(e) => handleChange(e)}
          name="direccion"
        />
      </Grid>
      <Grid item sx={{}}>
        <input
          type="text"
          placeholder="Buscar por dni"
          onChange={(e) => handleChange(e)}
          name="direccion"
        />
      </Grid>
      <Grid item sx={{}}>
        <select name="provincia" id="provincia">
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Catamarca">Catamarca</option>
          <option value="Chaco">Chaco</option>
        </select>
      </Grid>
      <Grid item sx={{}}>
        <select name="localidad" id="localidad">
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Catamarca">Catamarca</option>
          <option value="Chaco">Chaco</option>
        </select>
      </Grid>
    </Grid>
  );
};
