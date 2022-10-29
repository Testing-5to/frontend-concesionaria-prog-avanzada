import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllDatosFormVentas, saveVenta, updateVenta } from "../../Services";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DataTableVehiculoEnVenta from "./DataTableVehiculoEnVenta";

const filtrosVehiculo = [
  { id: 1, nombre: "Marca", value: "marca" },
  { id: 2, nombre: "Modelo", value: "modelo" },
  { id: 3, nombre: "Tipo", value: "tipo" },
  { id: 4, nombre: "Año", value: "anio" },
];

const FormularioVentas = ({ onClose }) => {
  // estados del formulario
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [impuestos, setImpuestos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState({});
  const [vehiculosFiltradosDT, setVehiculosFiltradosDT] = useState([]);
  const [filtroVehiculo, setFiltroVehiculo] = useState("marca");

  // traemos toda la data necesaria para popular el formulario
  const fetchAllDataForm = async () => {
    const data = await getAllDatosFormVentas();
    setImpuestos(data.impuestos);
    setClientes(data.clientes);
    setVendedores(
      data.vendedores.filter((vendedor) => vendedor.rol.nombre === "Vendedor")
    );
    setVehiculos(data.vehiculos);
    setVehiculosFiltradosDT(data.vehiculos);
    setLoadingModal(false);
  };

  // funcion para filtrar los vehiculos segun la busqueda y la propiedad
  const filtrarVehiculos = (vehiculos, busqueda, propiedad) => {
    if (busqueda === "") {
      setVehiculosFiltradosDT(vehiculos);
    } else {
      switch (propiedad) {
        case "marca":
          const vehiculosFiltradosMarca = vehiculos.filter((vehiculo) =>
            vehiculo.modelo.marca.nombre
              .toLowerCase()
              .includes(busqueda.toLowerCase())
          );
          setVehiculosFiltradosDT(vehiculosFiltradosMarca);
          break;
        case "modelo":
          const vehiculosFiltradosModelo = vehiculos.filter((vehiculo) =>
            vehiculo.modelo.nombre
              .toLowerCase()
              .includes(busqueda.toLowerCase())
          );
          setVehiculosFiltradosDT(vehiculosFiltradosModelo);
          break;
        case "tipo":
          const vehiculosFiltradosTipo = vehiculos.filter((vehiculo) =>
            vehiculo.modelo.tipoVehiculo.nombre
              .toLowerCase()
              .includes(busqueda.toLowerCase())
          );
          setVehiculosFiltradosDT(vehiculosFiltradosTipo);
          break;
        case "anio":
          const vehiculosFiltradosAnio = vehiculos.filter((vehiculo) =>
            vehiculo.anio.toString().includes(busqueda)
          );
          setVehiculosFiltradosDT(vehiculosFiltradosAnio);
          break;

        default:
          setVehiculosFiltradosDT(vehiculos);
      }
    }
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

  // funcion para devolver el texto del vehiculo seleccionado
  const getVehiculoSeleccionado = () => {
    if (vehiculoSeleccionado.id) {
      return `${vehiculoSeleccionado.modelo.marca.nombre} ${vehiculoSeleccionado.modelo.nombre} ${vehiculoSeleccionado.anio}`;
    } else {
      return "Seleccione un vehiculo";
    }
  }

  // funcion para submitear el formulario, esta llama a la funcion de guardar o editar segun corresponda y resetea el modal
  const onSubmit = (valores, { resetForm }) => {
    valores.vehiculo = vehiculoSeleccionado.id;
    setSaving(true);

    guardarVenta(valores).then(() => {
      resetForm();
      setSaving(false);
    });
  };

  const getDatosClienteSeleccionado = (idCliente) => {
    const cliente = clientes.filter(
      (cliente) => cliente.id.toString() === idCliente.toString()
    )[0];
    if (cliente) {
      return `${cliente.nombre} ${cliente.apellido}, D.N.I: ${cliente.dni}, ${cliente.direccion.calle} ${cliente.direccion.numero}, ${cliente.direccion.localidad.nombre}`;
    } else {
      return "Selecciona un cliente";
    }
  };
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
          <h2 style={{ marginBottom: "5px" }}>Nueva Venta</h2>
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontStyle: "bold" }}>
                        Datos del cliente seleccionado:{" "}
                      </Typography>
                      <Typography>
                        {getDatosClienteSeleccionado(values.cliente)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <select
                        style={{ width: "30%" }}
                        onChange={(e) => setFiltroVehiculo(e.target.value)}
                      >
                        {filtrosVehiculo.map((filtro) => (
                          <option key={filtro.id} value={filtro.value}>
                            {filtro.nombre}
                          </option>
                        ))}
                      </select>
                      <input
                        style={{
                          marginLeft: "10px",
                          width: "70%",
                          height: "45px",
                          mb: 1,
                        }}
                        onChange={(e) =>
                          filtrarVehiculos(
                            vehiculos,
                            e.target.value,
                            filtroVehiculo
                          )
                        }
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <DataTableVehiculoEnVenta
                      vehiculos={vehiculosFiltradosDT}
                      vehiculoSeleccionado={vehiculoSeleccionado}
                      setVehiculoSeleccionado={setVehiculoSeleccionado}
                    />
                  </Grid>

                  <Grid item xs={6} md={5}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "fkex-start",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontStyle: "bold" }}>
                        Vehiculo seleccionado:{" "}
                      </Typography>
                      <Typography>
                        {getVehiculoSeleccionado()}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        
                      }}
                    >
                      <Typography variant="h6" sx={{ fontStyle: "bold", mr: 1 }}>
                        Fecha:{" "}
                      </Typography>
                      <Typography variant="h6">
                        {new Date().toLocaleDateString("es-AR")}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={4}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <Typography variant="h6" sx={{ fontStyle: "bold", mr: 1 }}>
                      Cantidad:{" "}
                    </Typography>
                    <Field
                      type="text"
                      id="cantidad"
                      name="cantidad"
                      placeholder="Cantidad"
                      style={{height: "40px", width: "150px"}}

                    />
                    <ErrorMessage
                      name="cantidad"
                      component={() => (
                        <div className="error">{errors.cantidad}</div>
                      )}
                    />
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
