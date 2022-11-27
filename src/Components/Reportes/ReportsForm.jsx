import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const tiposReportes = [
  {
    id: 1,
    nombre: "Reporte de utilidades",
  },
  {
    id: 2,
    nombre: "Reporte de autos vendidos",
  },
  {
    id: 3,
    nombre: "Reporte ventas por mes",
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

const ReportsForm = ({ vendedores, handleConsultarReporte, cleanTable }) => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(1);
  const [vendedoresDisabled, setVendedoresDisabled] = useState(false);
  const [fechaDesde, setFechaDesde] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [fechaHasta, setFechaHasta] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [vendedoresSeleccionados, setVendedoresSeleccionados] =
    useState(vendedores);

  const handleChangeReporteSeleccionado = (event) => {
    setReporteSeleccionado(event.target.value);
  };

  const handleChangeFechaDesde = (newDate) => {
    setFechaDesde(newDate);
  };

  const handleChangeFechaHasta = (newDate) => {
    setFechaHasta(newDate);
  };

  const handleClickForm = () => {
    handleConsultarReporte({
      reporteSeleccionado: reporteSeleccionado,
      fechaDesde: dayjs(fechaDesde).format("DD-MM-YYYY"),
      fechaHasta: dayjs(fechaHasta).format("DD-MM-YYYY"),
      vendedoresSeleccionados: vendedoresSeleccionados,
    });
  };

  const handleChangeVendedoresSeleccionados = (event) => {
    const {
      target: { value },
    } = event;
    setVendedoresSeleccionados(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (reporteSeleccionado === 3) {
      setVendedoresDisabled(true);
    } else {
      setVendedoresDisabled(false);
    };
    cleanTable();
  }, [reporteSeleccionado]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "90%",
        flexDirection: "column",
        alignItems: "flex-start",
        ml: 4,
        my: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <Typography variant="h5">Reportes</Typography>
        <Box>
          <FormControl sx={{ my: 2, width: 300 }}>
            <InputLabel id="select-reporte-label">Reporte</InputLabel>
            <Select
              labelId="select-reporte-label"
              id="select-reporte"
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
      <Box sx={{ width: "100%", display: "flex" }}>
        <LocalizationProvider adapterLocale={"es"} dateAdapter={AdapterDayjs}>
          <Stack spacing={3} sx={{ width: 300 }}>
            <DesktopDatePicker
              label="Fecha desde"
              inputFormat="DD/MM/YYYY"
              value={fechaDesde}
              sx={{ width: 300 }}
              onChange={handleChangeFechaDesde}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <LocalizationProvider adapterLocale={"es"} dateAdapter={AdapterDayjs}>
          <Stack spacing={3} sx={{ width: 300, ml: 2 }}>
            <DesktopDatePicker
              label="Fecha hasta"
              inputFormat="DD/MM/YYYY"
              value={fechaHasta}
              sx={{ width: 300 }}
              onChange={handleChangeFechaHasta}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <Box hidden={vendedoresDisabled}>
          <FormControl sx={{ width: 300, ml: 2 }} >
            <InputLabel id="select-vendedor-label">Vendedores</InputLabel>
            <Select
              labelId="select-vendedor-label"
              id="select-vendedor"
              multiple
              value={vendedoresSeleccionados}
              onChange={handleChangeVendedoresSeleccionados}
              input={<OutlinedInput label="Vendedor" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {vendedores.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    checked={vendedoresSeleccionados.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          onClick={handleClickForm}
          sx={{ width: 200, ml: 2 }}
          variant="contained"
          size="large"
        >
          Consultar <FindInPageIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ReportsForm;
