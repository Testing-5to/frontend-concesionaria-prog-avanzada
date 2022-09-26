import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import {
  getAllDatosFormEmpleados,
  saveCliente,
  updateCliente,
} from "../../Services";
import { Grid, Checkbox, FormControlLabel } from "@mui/material";

const FormularioClientes = ({ onClose, isEdit, cliente }) => {
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [paises, setPaises] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [localidadesDeProvincia, setLocalidadesDeProvincia] = useState([]);
  const [provincias, setProvincias] = useState([]);

  // traemos toda la data necesaria para popular el formulario
  const fetchAllDataForm = async () => {
    const data = await getAllDatosFormEmpleados();
    setPaises(data.paises);
    setLocalidades(data.localidades);
    setProvincias(data.provincias);
    if (!isEdit) {
      guardarLocalidadesDeProvincia(data.localidades, data.provincias[0].id);
    } else {
      guardarLocalidadesDeProvincia(
        data.localidades,
        cliente.direccion.localidad.provincia.id.toString()
      );
    }
    setLoadingModal(false);
  };

  const guardarCliente = async (valores) => {
    await saveCliente(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  const actualizarCliente = async (valores) => {
    valores.id = cliente.id;
    await updateCliente(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };
  // este metodo es para setear las localidades que se van a mostrar en el select
  const guardarLocalidadesDeProvincia = (localidades, idProvincia) => {
    const localidadesFiltradas = localidades.filter(
      (localidad) => localidad.provincia.id.toString() === idProvincia.toString()
    );
    setLocalidadesDeProvincia(localidadesFiltradas);
  };

  const validateValues = (valores) => {
    console.log(valores)
    let errores = {};
    // Validacion empleado
    if (!valores.nombre) {
      errores.nombre = "Por favor ingresa un nombre";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
      errores.nombre = "Los nombres solo puede contener letras y espacios";
    }
    if (!valores.apellido) {
      errores.apellido = "Por favor ingresa un apellido";
    }
    if (!valores.dni) {
      errores.dni = "Por favor ingresa un dni";
    } else if (!/^[0-9]{3,12}$/.test(valores.dni)) {
      errores.dni = "El dni debe contener entre 7 y 8 numeros";
    }
    if (!valores.email) {
      errores.email = "Por favor ingresa un email";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)
    ) {
      errores.email = "El email no es valido";
    }
    // Validacion direccion
    if (!valores.direccion) {
      errores.direccion = "Por favor ingresa una direccion";
    }
    if (!valores.numero) {
      errores.numero = "Por favor ingresa un numero";
    } else if (!/^[0-9]{1,10}$/.test(valores.numero)) {
      errores.numero = "El numero debe contener entre 1 y 10 numeros";
    }

    // Validacion teléfono
    if (!valores.telefono) {
      errores.telefono = "Por favor ingresa un telefono";
    }

    return errores;
  };

  const onSubmit = (valores, { resetForm }) => {
    setSaving(true);
    if (!isEdit) {
      guardarCliente(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    } else {
      actualizarCliente(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    }
  };

  const getLocalidadInitial = (idProvincia) => {
    try {
      const id = localidades
        .filter((l) => l.provincia.id.toString() === idProvincia)[0]
        .id.toString();
      return id;
    } catch (e) {
      return "1";
    }
  };

  const handleChangeProvincia = (e, values, handleChange) => {
    // esta funcion esta para que cuando cambie la marca, se cambie el modelo
    values.provincia = e.target.value
    try{
      guardarLocalidadesDeProvincia(localidades, e.target.value)
      values.localidad = getLocalidadInitial(e.target.value)
      
    }catch{
      values.localidad = "1";
    }
    handleChange(e);
    
  };




  useEffect(() => {
    console.log("cliente", cliente);
    fetchAllDataForm();
  }, []);

  return (
    <>
      {loadingModal ? (
        <DotLoader color="#1D1D1D" />
      ) : (
        <>
          {!isEdit ? <h2>Nuevo Cliente</h2> : <h2>Editar Cliente</h2>}

          <Formik
            initialValues={{
              nombre: isEdit ? cliente.nombre : "",
              apellido: isEdit ? cliente.apellido : "",
              dni: isEdit ? cliente.dni : "",
              email: isEdit ? cliente.email : "",
              telefono: isEdit ? cliente.telefono : "",
              direccion: isEdit ? cliente.direccion.calle : "",
              numero: isEdit ? cliente.direccion.numero : "",
              esCliente: isEdit ? cliente.esCliente : false,
              provincia: isEdit
                ? cliente.direccion.localidad.provincia.id.toString()
                : provincias[0].id.toString(),
              localidad: isEdit
                ? cliente.direccion.localidad.id.toString()
                : getLocalidadInitial(provincias[0].id.toString()),
              pais: "1",
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
                  <Grid item md={6} xs={12}>
                    <label htmlFor="nombre">Cliente</label>
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre del cliente"
                    />
                    <ErrorMessage
                      name="nombre"
                      component={() => (
                        <div className="error">{errors.nombre}</div>
                      )}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <label htmlFor="apellido">Apellido</label>
                    <Field
                      type="text"
                      id="apellido"
                      name="apellido"
                      placeholder="Apellido del empleado"
                    />
                    <ErrorMessage
                      name="apellido"
                      component={() => (
                        <div className="error">{errors.apellido}</div>
                      )}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <label htmlFor="dni">DNI</label>
                    <Field
                      type="text"
                      id="dni"
                      name="dni"
                      placeholder="DNI del cliente"
                    />
                    <ErrorMessage
                      name="dni"
                      component={() => (
                        <div className="error">{errors.dni}</div>
                      )}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email del empleado"
                    />
                    <ErrorMessage
                      name="email"
                      component={() => (
                        <div className="error">{errors.email}</div>
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <label htmlFor="telefono">Telefono</label>
                    <Field
                      type="string"
                      id="telefono"
                      name="telefono"
                      placeholder="Teléfono del empleado"
                    />
                    <ErrorMessage
                      name="telefono"
                      component={() => (
                        <div className="error">{errors.telefono}</div>
                      )}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <label htmlFor="direccion">Direccion</label>
                    <Field
                      type="text"
                      id="direccion"
                      name="direccion"
                      placeholder="Direccion del empleado"
                    />
                    <ErrorMessage
                      name="direccion"
                      component={() => (
                        <div className="error">{errors.direccion}</div>
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <label htmlFor="numero">Numero</label>
                    <Field
                      type="number"
                      id="numero"
                      name="numero"
                      placeholder="Numero de calle"
                    />
                    <ErrorMessage
                      name="numero"
                      component={() => (
                        <div className="error">{errors.numero}</div>
                      )}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <label htmlFor="provincia">Provincia</label>
                    <Field
                      as="select"
                      id="provincia"
                      name="provincia"
                      onChange={(e) => {
                        handleChangeProvincia(e, values, handleChange);
                      }}
                    >
                      {provincias.map((provincia) => (
                        <option key={provincia.id} value={provincia.id}>
                          {provincia.nombre}
                        </option>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <label htmlFor="localidad">Localidad</label>
                    <Field as="select" id="localidad" name="localidad">
                      {localidadesDeProvincia.map((localidad) => (
                        <option key={localidad.id} value={localidad.id}>
                          {localidad.nombre}
                        </option>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <label htmlFor="pais">Pais</label>
                    <Field disabled as="select" id="pais" name="pais">
                      {paises.map((pais) => (
                        <option key={pais.id} value={pais.id}>
                          {pais.nombre}
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
                      justifyContent: "space-between",
                      alignItems: "center",

                      mt: 2,
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox checked={values.esCliente} />}
                      label="Es Cliente"
                      name="esCliente"
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

export default FormularioClientes;
