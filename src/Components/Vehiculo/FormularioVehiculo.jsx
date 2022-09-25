import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import {
  getAllDatosFormVehiculo,
  saveVehiculo,
  updateVehiculo,
} from "../../Services";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";

const FormularioVehiculos = ({ onClose, isEdit, vehiculo }) => {
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [tipos, setTipos] = useState([]);

  // traemos toda la data necesaria para popular el formulario
  const fetchAllDataForm = async () => {
    const data = await getAllDatosFormVehiculo();
    setMarcas(data.marcas);
    setModelos(data.modelos);
    setTipos(data.tiposVehiculo);
    setLoadingModal(false);
  };

  const guardarVehiculo = async (valores) => {
    await saveVehiculo(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  const actualizarVehiculo = async (valores) => {
    valores.id = vehiculo.id;
    await updateVehiculo(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  const validateValues = (valores) => {
    let errores = {};
    // Validacion vehiculo
    if (!valores.nombre) {
      errores.nombre = "Por favor ingresa un nombre";
    }

    return errores;
  };

  const onSubmit = (valores, { resetForm }) => {
    setSaving(true);
    if (!isEdit) {
      guardarVehiculo(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    } else {
      actualizarVehiculo(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    }
  };

  useEffect(() => {
    fetchAllDataForm();
  }, []);

  return (
    <>
      {loadingModal ? (
        <DotLoader color="#1D1D1D" />
      ) : (
        <>
          {!isEdit ? <h2>Nuevo Vehiculo</h2> : <h2>Editar Vehiculo</h2>}

          <Formik
            initialValues={{
              nombre: isEdit ? vehiculo.nombre : "",
              modelo: isEdit ? vehiculo.modelo.id : modelos[0].id,
              marca: isEdit ? vehiculo.modelo.marca.id : marcas[0].id,
              tipoVehiculo: isEdit
                ? vehiculo.modelo.tipoVehiculo.id
                : tipos[0].id,
              year: isEdit ? vehiculo.year : "",
              kilometros: isEdit ? vehiculo.kilometros : "",
              importado: isEdit ? vehiculo.importado : false,
              precioCompra: isEdit ? vehiculo.precioCompra : "",
              precioVenta: isEdit ? vehiculo.precioVenta : "",
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
          >
            {({ errors, values, handleChange }) => (
              <Form
                className="formulario"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid container spacing={2}>
                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="nombre">Vehiculo</label>
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre del vehiculo"
                    />
                    <ErrorMessage
                      name="nombre"
                      component={() => (
                        <div className="error">{errors.nombre}</div>
                      )}
                    />
                  </Grid>

                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="year">Vehiculo</label>
                    <Field
                      type="number"
                      id="year"
                      name="year"
                      placeholder="Año del vehiculo"
                    />
                    <ErrorMessage
                      name="year"
                      component={() => (
                        <div className="error">{errors.year}</div>
                      )}
                    />
                  </Grid>

                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="kilometros">Vehiculo</label>
                    <Field
                      type="number"
                      id="kilometros"
                      name="kilometros"
                      placeholder="Kilómetros del vehiculo"
                    />
                    <ErrorMessage
                      name="kilometros"
                      component={() => (
                        <div className="error">{errors.kilometros}</div>
                      )}
                    />
                  </Grid>

                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="precioCompra">Vehiculo</label>
                    <Field
                      type="number"
                      id="precioCompra"
                      name="precioCompra"
                      placeholder="Precio de compra"
                    />
                    <ErrorMessage
                      name="precioCompra"
                      component={() => (
                        <div className="error">{errors.precioCompra}</div>
                      )}
                    />
                  </Grid>

                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="precioVenta">Vehiculo</label>
                    <Field
                      type="number"
                      id="precioVenta"
                      name="precioVenta"
                      placeholder="Precio de venta"
                    />
                    <ErrorMessage
                      name="precioVenta"
                      component={() => (
                        <div className="error">{errors.precioVenta}</div>
                      )}
                    />
                  </Grid>

                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="marca">Marca</label>
                    <Field as="select" name="marca" id="marca">
                      {marcas.map((marca) => (
                        <option key={marca.id} value={marca.id}>
                          {marca.nombre}
                        </option>
                      ))}
                    </Field>
                  </Grid>
                  {/* localidades.map((localidad) => { 
                          if(localidad.provincia.id.toString() === values.provincia){
                            return <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
                          }else{
                            return null
                          }
                        }) */}

                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="modelo">Modelo</label>
                    <Field as="select" name="modelo" id="modelo">
                      {modelos.map((modelo) => {
                        if (modelo.marca.id.toString() === values.marca.toString()) {
                          return (
                            <option key={modelo.id} value={modelo.id}>
                              {modelo.nombre}
                            </option>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </Field>
                  </Grid>

                

                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="tipoVehiculo">Tipo Vehículo</label>
                    <Field as="select" id="tipoVehiculo" name="tipoVehiculo">
                      {tipos.map((tipoVehiculo) => (
                        <option key={tipoVehiculo.id} value={tipoVehiculo.id}>
                          {tipoVehiculo.nombre}
                        </option>
                      ))}
                    </Field>
                  </Grid>

                  <Grid
                    item
                    lg={4}
                    md={6}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox checked={values.importado} />}
                      label="Importado"
                      name="importado"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <button type="submit">
                      {!saving ? (
                        <span>Enviar</span>
                      ) : (
                        <BeatLoader color="white" />
                      )}
                    </button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default FormularioVehiculos;
