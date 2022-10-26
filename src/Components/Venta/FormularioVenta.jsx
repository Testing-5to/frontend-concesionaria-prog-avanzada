import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllDatosFormVentas, saveVenta, updateVenta } from "../../Services";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const FormularioVentas = ({ onClose, isEdit, venta }) => {
  // estados del formulario
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [impuestos, setImpuestos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  // traemos toda la data necesaria para popular el formulario
  const fetchAllDataForm = async () => {
    const data = await getAllDatosFormVentas();
    setImpuestos(data.impuestos);
    setClientes(data.clientes);
    setVendedores(
      data.vendedores.filter((vendedor) => vendedor.rol.nombre === "Vendedor")
    );
    setVehiculos(data.vehiculos);
    setLoadingModal(false);
  };

  // funcion para guardar un venta nuevo, esta llama a la api y luego cierra el modal
  const guardarVenta = async (valores) => {
    await saveVenta(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  // funcion para editar un venta, esta llama a la api y luego cierra el modal
  const actualizarVenta = async (valores) => {
    valores.id = venta.id;
    await updateVenta(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  // funcion para validar los valores del formulario
  const validateValues = (valores) => {
    let errores = {};
    // Validacion venta

    return errores;
  };

  // funcion para submitear el formulario, esta llama a la funcion de guardar o editar segun corresponda y resetea el modal
  const onSubmit = (valores, { resetForm }) => {
    setSaving(true);
    if (!isEdit) {
      guardarVenta(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    } else {
      actualizarVenta(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    }
  };

  const getDatosClienteSeleccionado = (idCliente) => {    
    const cliente = clientes.filter(cliente => cliente.id.toString() === idCliente.toString())[0];
    if(cliente){
      return `${cliente.nombre} ${cliente.apellido}, D.N.I: ${cliente.dni}, ${cliente.direccion.calle} ${cliente.direccion.numero}, ${cliente.direccion.localidad.nombre}`

    }else{
      return "Selecciona un cliente"
    }

  }
  // este metodo es para traer todos los datos que necesita el formulario cuando se renderiza el componente
  useEffect(() => {
    fetchAllDataForm();
  }, []);

  // renderizamos el componente
  return (
    <>
      {loadingModal ? (
        <DotLoader color="#1D1D1D" />
      ) : (
        <>
          {!isEdit ? <h2>Nuevo Venta</h2> : <h2>Editar Venta</h2>}

          <Formik
            initialValues={{
              cliente: clientes[0].id,
              vehiculo: "",
              cantidad: 0,
              vendedor: "",
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
          >
            {({ errors, values, handleChange }) => (
              <Form
                className="formulario"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="cliente">Cliente</label>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Field as="select" id="cliente" name="cliente">
                        {clientes.map((cliente) => (
                          <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre + " " + cliente.apellido}
                          </option>
                        ))}
                      </Field>
                      <Button
                        sx={{ ml: 1, width: "25%" }}
                        variant="contained"
                        color="primary"
                      >
                        + Nuevo Cliente
                      </Button>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="localidad">Cliente</label>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{fontStyle: 'bold'}}>Datos del cliente seleccionado: </Typography>
                      <Typography>{getDatosClienteSeleccionado(values.cliente)}</Typography>
                    </Box>
                  </Grid>

                  {/* <Grid item md={6} xs={12}>
                    <label htmlFor="nombre">Venta</label>
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre del venta"
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
                      placeholder="Apellido del venta"
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
                      placeholder="DNI del venta"
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
                      placeholder="Email del venta"
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
                      type="text"
                      id="telefono"
                      name="telefono"
                      placeholder="Teléfono del venta"
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
                      placeholder="Salario del venta"
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
                      placeholder="Direccion del venta"
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
                      placeholder="Fecha de Ingreso del venta"
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
                      placeholder="Fecha de Egreso del venta"
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
                    <Field as="select" id="provincia" name="provincia" onChange={(e) => {
                        handleChangeProvincia(e, values, handleChange);
                      }}>
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
                        localidadesDeProvincia.map((localidad) => (
                          
                            <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
                          )
                        )
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
                  </Grid> */}
                </Grid>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default FormularioVentas;
