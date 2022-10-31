import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import styles from "../../Styles/styles";

export const FormularioFiltros = ({ onClose, setFiltros }) => {
  const onSubmit = async (valores) => {
    setFiltros({ ...valores });
    onClose();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Formik
        initialValues={{
          fechaDesde: "",
          fechaHasta: "",
          modelo: "",
          marca: "",
          pais: "",
          cantidad: "",
          pUnitarioMin: 0,
          pUnitarioMax: 0,
          totalMin: 0,
          totalMax: 0,
          vendedor: "",
          cliente: "",
        }}
        onSubmit={(valores, { resetForm }) => onSubmit(valores, { resetForm })}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              rows={3}
              columns={3}
              spacing={2}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                padding: "10px",
              }}
            >
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    <h3>Fecha desde - hasta</h3>
                  </div>
                  <TextField
                    id="date"
                    label="Fecha desde"
                    type="datetime-local"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="fechaDesde"
                    value={values.fechaDesde}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    id="date"
                    label="Fecha hasta"
                    type="datetime-local"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="fechaHasta"
                    value={values.fechaHasta}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      padding: "15px",
                    }}
                  >
                    <h3>Modelo</h3>
                  </div>

                  <TextField
                    id="outlined-basic"
                    label="Ingrese modelo"
                    variant="outlined"
                    fullWidth
                    name="modelo"
                    value={values.modelo}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      padding: "15px",
                    }}
                  >
                    <h3>Marca</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese marca"
                    variant="outlined"
                    fullWidth
                    name="marca"
                    value={values.marca}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      padding: "15px",
                    }}
                  >
                    <h3>Pais</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese pais"
                    variant="outlined"
                    fullWidth
                    name="pais"
                    value={values.pais}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      padding: "15px",
                    }}
                  >
                    <h3>Cantidad</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese cantidad"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name={"cantidad"}
                    value={values.cantidad}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    <h3>Precio unitario min - max</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese precio min"
                    variant="outlined"
                    fullWidth
                    type="number"
                    min={0}
                    name={"pUnitarioMin"}
                    value={values.pUnitarioMin}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    id="outlined-basic"
                    label="Ingrese precio max"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name={"pUnitarioMax"}
                    value={values.pUnitarioMax}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    <h3>Precio total min - max</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese precio min"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name={"totalMin"}
                    value={values.totalMin}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    id="outlined-basic"
                    label="Ingrese precio max"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name="totalMax"
                    value={values.totalMax}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      padding: "15px",
                    }}
                  >
                    <h3>Vendedor</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese vendedor"
                    variant="outlined"
                    fullWidth
                    name="vendedor"
                    value={values.vendedor}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      padding: "15px",
                    }}
                  >
                    <h3>Cliente</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese cliente"
                    variant="outlined"
                    fullWidth
                    name="cliente"
                    value={values.cliente}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "25px",
                marginTop: "15px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Filtrar ventas
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
