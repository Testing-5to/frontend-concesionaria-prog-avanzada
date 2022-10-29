import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllDatosFormVentas, saveVenta, updateVenta } from "../../Services";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DataTableVehiculoEnVenta from "./DataTableVehiculoEnVenta";

const FormularioVentas = ({ onClose }) => {
  // estados del formulario
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [impuestos, setImpuestos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState([]);

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

  // funcion para validar los valores del formulario
  const validateValues = (valores) => {
    let errores = {};
    // Validacion venta

    return errores;
  };

  // funcion para submitear el formulario, esta llama a la funcion de guardar o editar segun corresponda y resetea el modal
  const onSubmit = (valores, { resetForm }) => {
    setSaving(true);
    
      guardarVenta(valores).then(() => {
        resetForm();
        setSaving(false);
      });
   
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
          Nueva Venta
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
            sx={{ width: "100%", height: "100%" }}
          >
            {({ errors, values, handleChange }) => (
              <Form
                className="formulario"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "1000px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", flexDirection: "column"}}
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
                        sx={{ ml: 1, width: "25%", height: "45px", mb: 1 }}
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

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", flexDirection: "row", height: "100%", width: "100%", alignItems: "flex-start" }}
                  >
                    <DataTableVehiculoEnVenta vehiculos={vehiculos} vehiculoSeleccionado={vehiculoSeleccionado} setVehiculoSeleccionado={setVehiculoSeleccionado}/>
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

export default FormularioVentas;
