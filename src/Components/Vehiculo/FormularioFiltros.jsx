import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Select } from "@mui/material";
import { Form, Formik } from "formik";
import styles from "../../Styles/styles";
import { CheckBox } from "@mui/icons-material";

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
          marca: "",
          modelo: "",
          tipoVehiculo: "",
          pais: "",
          anio: "",
          importado: "",
          compraMin: 0,
          compraMax: 0,
          ventaMin: 0,
          ventaMax: 0,
          cantidad: "",
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
                    <h3>Tipo de vehiculo</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese tipo de vehiculo"
                    variant="outlined"
                    fullWidth
                    name="tipoVehiculo"
                    value={values.tipoVehiculo}
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
                    <h3>Año</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese año"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name={"anio"}
                    value={values.anio}
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
                    <h3>Importado</h3>
                  </div>
                  <Select
                    native
                    fullWidth
                    name="importado"
                    value={values.importado}
                    onChange={handleChange}
                  >
                    <option value={""}>Seleccione</option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </Select>
                </div>
              </Grid>
              <Grid item xs={1}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    <h3>Precio compra min - max</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese compra min"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name={"compraMin"}
                    value={values.compraMin}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    id="outlined-basic"
                    label="Ingrese compra max"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name="compraMax"
                    value={values.compraMax}
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
                    <h3>Precio venta min - max</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese venta min"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name={"ventaMin"}
                    value={values.ventaMin}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    id="outlined-basic"
                    label="Ingrese venta max"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name="ventaMax"
                    value={values.ventaMax}
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
                    name="cantidad"
                    value={values.cantidad}
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
                Filtrar vehiculos
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
