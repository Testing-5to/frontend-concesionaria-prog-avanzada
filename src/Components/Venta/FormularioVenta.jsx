import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import {
  getAllDatosFormVentas,
  saveVenta,
  getImpuestoDelVehiculo,
} from "../../Services";
import { Alert, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DataTableVehiculoEnVenta from "./DataTableVehiculoEnVenta";
import { parseCurrency } from "../../Utils/Utils";

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
  const [cantidad, setCantidad] = useState(0);
  const [impuestoDelVehiculo, setImpuestoDelVehiculo] = useState([]);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [impuestosDeLaVenta, setImpuestosDeLaVenta] = useState(0);
  const [errorVehiculoSeleccionado, setErrorVehiculoSeleccionado] = useState(false)

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

  // devolver el texto del precio unitario
  const getPrecioUnitario = () => {
    if (vehiculoSeleccionado.precioVenta) {
      // fix number to 2 decimals
      const precioUnitario = vehiculoSeleccionado.precioVenta.toFixed(2);
      return parseCurrency(precioUnitario);
    }
    return parseCurrency(0);
  };

  const getSubtotal = () => {
    if (vehiculoSeleccionado.precioVenta) {
      // fix number to 2 decimals
      const st = (vehiculoSeleccionado.precioVenta * cantidad).toFixed(2);
      setSubtotal(st);
      return parseCurrency(st);
    }
    return parseCurrency(0);
  };

  // devolver el texto del impuesto
  const getImpuestos = () => {
    if (vehiculoSeleccionado.precioVenta) {
      if(impuestoDelVehiculo.porcentaje){
        const impVenta = (subtotal * (impuestoDelVehiculo.porcentaje / 100)).toFixed(2);
        setImpuestosDeLaVenta(impVenta);
      return parseCurrency(impVenta);
      }else{
        setImpuestosDeLaVenta(0);
        return parseCurrency(0);
      }
    }
    return parseCurrency(0);
  };

  // devolver el texto del precio total
  const getTotal = () => {
    if (vehiculoSeleccionado.precioVenta) {
  
      const tot = (parseFloat(subtotal) + parseFloat(impuestosDeLaVenta)).toFixed(2);
      setTotal(tot);
      return parseCurrency(tot);
    };
    return parseCurrency(0);
  };

  // impuesto del vehiculo
  const getPorcentajeImpuesto = () => {
    if (vehiculoSeleccionado.id) {
      return impuestoDelVehiculo.porcentaje+"%";
    }else{
      return "0%";
    }
  };
  // manejamos la cantidad
  const handleCantidad = (e, values, errors) => {
 
    if(e.target.value > vehiculoSeleccionado.cantidad){
      setCantidad(e.target.value);
      values.cantidad = e.target.value;
      errors.cantidad = "No hay suficiete stock";
    }else if(e.target.value <= 0){
      setCantidad(e.target.value);
      values.cantidad = e.target.value;
      errors.cantidad = "La cantidad debe ser mayor a cero";
    }
    else{
      setCantidad(e.target.value);
      values.cantidad = e.target.value;
    }
  }

  // calcular el impuesto del vehiculo seleccionado
  const calcularImpuestoVehiculoSeleccionado = async (precio, pais) => {
    const impuesto = await getImpuestoDelVehiculo(precio, pais);
    setImpuestoDelVehiculo(impuesto);
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
    console.log(valores.cantidad, vehiculoSeleccionado.cantidad);
    if (valores.cantidad > vehiculoSeleccionado.cantidad) {
      errores.cantidad = "No hay suficiente stock";
    }
    if(valores.cantidad <= 0){
      errores.cantidad = "La cantidad debe ser mayor a cero";
    }
    
    return errores;
  };

  // funcion para devolver el texto del vehiculo seleccionado
  const getVehiculoSeleccionado = () => {
    if (vehiculoSeleccionado.id) {
      return `${vehiculoSeleccionado.modelo.marca.nombre} ${vehiculoSeleccionado.modelo.nombre} ${vehiculoSeleccionado.anio}`;
    } else {
      return "Seleccione un vehículo";
    }
  };

  // funcion para submitear el formulario, esta llama a la funcion de guardar o editar segun corresponda y resetea el modal
  const onSubmit = (valores, { resetForm }) => {
    if(vehiculoSeleccionado.id){
      valores.vehiculo = vehiculoSeleccionado.id;
      valores.precioUnitario = vehiculoSeleccionado.precioVenta;
      valores.impuesto = impuestoDelVehiculo.id;
      setSaving(true);
      guardarVenta(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    }else{
      setErrorVehiculoSeleccionado(true);
    }
    
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

  useEffect(() => {
    if (vehiculoSeleccionado.id) {
      calcularImpuestoVehiculoSeleccionado(
        vehiculoSeleccionado.precioVenta,
        vehiculoSeleccionado.modelo.marca.pais.nombre
      );
      setErrorVehiculoSeleccionado(false)

    } else {
      setImpuestoDelVehiculo([]);
      setErrorVehiculoSeleccionado(true)
    }
  }, [vehiculoSeleccionado]);
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
              vendedor: vendedores[0].id,
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
            sx={{ width: "100%", height: "100%" }}
          >
            {({ errors, values, handleSubmit }) => (
              <Form
                className="formulario"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "1000px",
                }}
              >
                <Grid container spacing={1}>
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
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <Card variant="outlined" sx={{ width: "100%" }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Datos del cliente seleccionado:{" "}
                        </Typography>
                        <Typography variant="h6" component="div">
                          {getDatosClienteSeleccionado(values.cliente)}
                        </Typography>
                      </CardContent>
                    </Card>
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
                      height: "305px",
                    }}
                  >
                    <DataTableVehiculoEnVenta
                      vehiculos={vehiculosFiltradosDT}
                      vehiculoSeleccionado={vehiculoSeleccionado}
                      setVehiculoSeleccionado={setVehiculoSeleccionado}
                    />
                  </Grid>
                  {errorVehiculoSeleccionado && <Alert severity="error">Debe seleccionar un vehículo!</Alert>}

                  <Grid item xs={12}>
                    <Card variant="outlined" sx={{ width: "100%" }}>
                      <CardContent sx={{ display: "flex" }}>
                        <Grid item xs={6} md={5}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography variant="h6" sx={{ fontStyle: "bold", whiteSpace: "nowrap" }}>
                              Vehículo seleccionado:{" "}
                            </Typography>
                            <Typography variant="h6" sx={{ whiteSpace: "nowrap"}}>
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
                            <Typography
                              variant="h6"
                              sx={{ fontStyle: "bold", mr: 1 }}
                            >
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
                          <Typography
                            variant="h6"
                            sx={{ fontStyle: "bold", mr: 1 }}
                          >
                            Cantidad:{" "}
                          </Typography>
                          <Box sx={{display: "flex", flexDirection:"column"}}>
                          <Field
                            type="number"
                            id="cantidad"
                            name="cantidad"
                            placeholder="Cantidad"
                            onChange={(e) => {
                              handleCantidad(e, values, errors);
                              
                            }}
                            style={{ height: "40px", width: "150px" }}
                          />
                          <ErrorMessage
                            name="cantidad"
                            component={() => (
                              <div className="error">{errors.cantidad}</div>
                            )}
                          />
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Box sx={{ width: "40%" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontStyle: "bold", mr: 1 }}
                      >
                        Vendedor:{" "}
                      </Typography>
                      <Field as="select" id="vendedor" name="vendedor">
                        {vendedores.map((vendedor) => (
                          <option key={vendedor.id} value={vendedor.id}>
                            {vendedor.nombre + " " + vendedor.apellido}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="vendedor"
                        component={() => (
                          <div className="error">{errors.vendedor}</div>
                        )}
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Card variant="outlined" sx={{ width: "40%", display: "flex", justifyContent: "flex-start"}}>
                      <CardContent>
                        <Typography variant="h6" component="div" color="text.secondary">
                          P. Unitario: {getPrecioUnitario()}
                        </Typography>
                        <Typography variant="h6" component="div" color="text.secondary">
                          Subtotal: {getSubtotal()}
                        </Typography>
                        <Typography variant="h6" component="div"color="text.secondary">
                          Impuestos ({getPorcentajeImpuesto()}): {getImpuestos()}
                        </Typography>
                        <Typography variant="h5" component="div">
                          Total: {getTotal()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end"}}>
                   <Box sx={{width: "40%"}}>
                    <Box sx={{display:"flex", width: "100%", justifyContent: "flex-end"}}>
                        <Button onClick={onClose} variant="contained" size="large" color="error">
                          <span>Cancelar</span>
                            
                        </Button>
                        <Button onClick={handleSubmit} sx={{ml: 1}} variant="contained" size="large" color="success">
                        {!saving ? (
                            <span>Registrar venta</span>
                          ) : (
                            <BeatLoader color="white" />
                          )}
                            
                        </Button>
                      
                      </Box>
                   </Box>
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
