import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllDatosFormEmpleados, saveEmpleado, updateEmpleado } from "../../Services";
import { Grid } from "@mui/material";

const FormularioEmpleados = ({ onClose, isEdit, empleado }) => {
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [paises, setPaises] = useState([]);
  const [roles, setRoles] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [provincias, setProvincias] = useState([]);

  
  // traemos toda la data necesaria para popular el formulario
  const fetchAllDataForm = async () => {
    const data = await getAllDatosFormEmpleados();
    setPaises(data.paises);
    setRoles(data.roles);
    setLocalidades(data.localidades);
    setProvincias(data.provincias);
    setLoadingModal(false);
  };

  const guardarEmpleado = async (valores) => {
    await saveEmpleado(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  const actualizarEmpleado = async (valores) => {
    valores.id = empleado.id;
    await updateEmpleado(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  const validateValues = (valores) => {
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
    if (!valores.salario) {
      errores.salario = "Por favor ingresa un salario";
    } else if (!/^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]+)?$/.test(valores.salario)) {
      errores.salario = "El salario debe contener entre 1 y 10 numeros";
    }
    // Validacion direccion
    if (!valores.direccion) {
      errores.direccion = "Por favor ingresa una direccion";
    }if (!valores.numero) {
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
      guardarEmpleado(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    } else {
      actualizarEmpleado(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    }
  };

  const getLocalidadInitial = (idProvincia) => {
    const id = localidades.filter((l) => l.provincia.id.toString() === idProvincia)[0].id.toString();
    return id;
  }
  useEffect(() => {
    fetchAllDataForm();
  }, []);

  return (
    <>
      {loadingModal ? (
        <DotLoader color="#1D1D1D" />
      ) : (
        <>
          {!isEdit ? <h2>Nuevo Empleado</h2> : <h2>Editar Empleado</h2>}

          <Formik
            initialValues={{
              nombre: isEdit ? empleado.nombre : "",
              apellido: isEdit ? empleado.apellido : "",
              dni: isEdit ? empleado.dni : "",
              email: isEdit ? empleado.email : "",
              telefono: isEdit ? empleado.telefono : "",
              fechaIngreso: isEdit ? empleado.fechaIngreso : "",
              fechaEgreso: isEdit ? empleado.fechaEgreso : "",
              salario: isEdit ? empleado.salario : "",
              rol: isEdit ? empleado.rol.id : roles[0].id,
              direccion: isEdit ? empleado.direccion.calle : "",
              numero: isEdit ? empleado.direccion.numero : "",
              provincia: isEdit ? empleado.direccion.localidad.provincia.id.toString() : provincias[0].id.toString(),
              localidad: isEdit ? empleado.direccion.localidad.id.toString() : getLocalidadInitial(provincias[0].id.toString()),
              pais: "Argentina"
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
                  <Grid item md={6} xs={12}>
                    <label htmlFor="nombre">Empleado</label>
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre del empleado"
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
                      placeholder="DNI del empleado"
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
                      type="number"
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
                    <label htmlFor="salario">Salario</label>
                    <Field
                      type="number"
                      id="salario"
                      name="salario"
                      placeholder="Salario del empleado"
                    />
                    <ErrorMessage
                      name="salario"
                      component={() => (
                        <div className="error">{errors.salario}</div>
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
                    <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
                    <Field
                      type="date"
                      id="fechaIngreso"
                      name="fechaIngreso"
                      placeholder="Fecha de Ingreso del empleado"
                    />
                    <ErrorMessage
                      name="fechaIngreso"
                      component={() => (
                        <div className="error">{errors.fechaIngreso}</div>
                      )}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <label htmlFor="fechaEgreso">Fecha de Egreso</label>
                    <Field
                      type="date"
                      id="fechaEgreso"
                      name="fechaEgreso"
                      placeholder="Fecha de Egreso del empleado"
                    />
                    <ErrorMessage
                      name="fechaEgreso"
                      component={() => (
                        <div className="error">{errors.fechaEgreso}</div>
                      )}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <label htmlFor="rol">Rol</label>
                    <Field as="select" name="rol" id="rol">
                      {
                        roles.map((rol) => (
                          <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                        ))
                      }
                    </Field>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <label htmlFor="provincia">Provincia</label>
                    <Field as="select" id="provincia" name="provincia">
                      {
                        provincias.map((provincia) => (
                          <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
                        ))
                      }

                    </Field>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <label htmlFor="localidad">Localidad</label>
                    <Field as="select" id="localidad" name="localidad">
                      {
                        localidades.map((localidad) => { 
                          if(localidad.provincia.id.toString() === values.provincia){
                            return <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
                          }else{
                            return null
                          }
                        })
                      }

                    </Field>
                  </Grid>
                
                  <Grid item md={6} xs={12}>
                    <label htmlFor="pais">País</label>
                    <Field as="select" disabled name="pais" id="pais">
                      {paises.map((pais) => {
                        if(pais.nombre === "Argentina"){
                          return <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                        }else{
                          return null;
                        }
      
                      })}
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

export default FormularioEmpleados;
