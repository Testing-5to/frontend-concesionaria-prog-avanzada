import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllDatosFormModelo, saveModelo, updateModelo } from "../../Services";
import { Grid } from "@mui/material";

const FormularioModelos = ({ onClose, isEdit, modelo }) => {
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);


  
  // traemos toda la data necesaria para popular el formulario
  const fetchAllDataForm = async () => {
    const data = await getAllDatosFormModelo();
    setMarcas(data.marcas);
    setTipos(data.tiposVehiculo);
    setLoadingModal(false);
  };

  const guardarModelo = async (valores) => {
    await saveModelo(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  const actualizarModelo = async (valores) => {
    valores.id = modelo.id;
    await updateModelo(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  const validateValues = (valores) => {
    let errores = {};
    // Validacion modelo
    if (!valores.nombre) {
      errores.nombre = "Por favor ingresa un nombre";
    }

    return errores;
  };

  const onSubmit = (valores, { resetForm }) => {
    setSaving(true);
    if (!isEdit) {
      guardarModelo(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    } else {
      actualizarModelo(valores).then(() => {
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
          {!isEdit ? <h2>Nuevo Modelo</h2> : <h2>Editar Modelo</h2>}

          <Formik
            initialValues={{
              nombre: isEdit ? modelo.nombre : "",
              marca: isEdit ? modelo.marca.id : marcas[0].id,
              tipoVehiculo: isEdit ? modelo.tipoVehiculo.id : tipos[0].id,
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
            
          >
            {({ errors, values }) => (
              <Form
                className="formulario"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <label htmlFor="nombre">Modelo</label>
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre del modelo"
                    />
                    <ErrorMessage
                      name="nombre"
                      component={() => (
                        <div className="error">{errors.nombre}</div>
                      )}
                    />
                  </Grid>

                  
                  <Grid item xs={12}>
                    <label htmlFor="marca">Marca</label>
                    <Field as="select" name="marca" id="marca">
                      {
                        marcas.map((marca) => (
                          <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                        ))
                      }
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <label htmlFor="tipoVehiculo">Tipo Vehículo</label>
                    <Field as="select" id="tipoVehiculo" name="tipoVehiculo">
                      {
                        tipos.map((tipoVehiculo) => (
                          <option key={tipoVehiculo.id} value={tipoVehiculo.id}>{tipoVehiculo.nombre}</option>
                        ))
                      }

                    </Field>
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

export default FormularioModelos;
