import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Select } from "@mui/material";
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
          nombre: "",
          apellido: "",
          email: "",
          salarioMin: 0,
          salarioMax: 0,
          rol: "",
          direccion: "",
          provincia: "",
          localidad: "",
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
                    <h3>Nombre</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese nombre"
                    variant="outlined"
                    fullWidth
                    name="nombre"
                    value={values.nombre}
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
                    <h3>Apellido</h3>
                  </div>

                  <TextField
                    id="outlined-basic"
                    label="Ingrese apellido"
                    variant="outlined"
                    fullWidth
                    name="apellido"
                    value={values.apellido}
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
                    <h3>Email</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={values.email}
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
                    <h3>Salario min - max</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese salario min"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    name={"salarioMin"}
                    value={values.salarioMin}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    id="outlined-basic"
                    label="Ingrese salario max"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    min={0}
                    name="salarioMax"
                    value={values.salarioMax}
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
                    <h3>Rol</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese rol"
                    variant="outlined"
                    fullWidth
                    type={"text"}
                    name={"rol"}
                    value={values.rol}
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
                    <h3>Direccion</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese direccion"
                    variant="outlined"
                    fullWidth
                    name="direccion"
                    value={values.direccion}
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
                    <h3>Provincia</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese provincia"
                    variant="outlined"
                    fullWidth
                    type={"text"}
                    name={"provincia"}
                    value={values.provincia}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <div style={styles.boxFilter}>
                  <div
                    style={{
                      padding: "15px",
                    }}
                  >
                    <h3>Localidad</h3>
                  </div>
                  <TextField
                    id="outlined-basic"
                    label="Ingrese localidad"
                    variant="outlined"
                    fullWidth
                    type={"text"}
                    name={"localidad"}
                    value={values.localidad}
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
                Filtrar empleados
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
