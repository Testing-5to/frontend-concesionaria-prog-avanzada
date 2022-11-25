import { FormControl, InputLabel, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Field } from "formik";
import { MenuItem } from "react-pro-sidebar";

const tiposReportes = [
  {
    id: 1,
    nombre: "Reporte 1",
  },
  {
    id: 2,
    nombre: "Reporte 2",
  },
  {
    id: 3,
    nombre: "Reporte 3",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ReportsForm = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(1);
  const handleChangeReporteSeleccionado = (event) => {
    console.log(event.target.value);
    setReporteSeleccionado(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "90%",
        flexDirection: "column",
        alignItems: "flex-start",
        ml: 4,
        mt: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <Typography variant="h5">Reportes</Typography>
        <Box>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Reporte</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={reporteSeleccionado}
              onChange={handleChangeReporteSeleccionado}
              input={<OutlinedInput label="Reporte" />}
              MenuProps={MenuProps}
            >
              {tiposReportes.map((tipoReporte) => (
                <MenuItem key={tipoReporte.id} value={tipoReporte.id}>
                  {tipoReporte.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default ReportsForm;
