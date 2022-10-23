import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import {
  getAllDatosFormVehiculo,
  saveVehiculo,
  updateVehiculo,
} from "../../Services";
import { Box, Checkbox, FormControlLabel, Grid, Modal, Typography } from "@mui/material";
import FormularioMarca from "../Marca/FormularioMarca";
import styles from "../../Styles/styles";
import FormularioModelos from "../Modelo/FormularioModelo";


const FormularioVehiculos = ({ onClose, isEdit, vehiculo }) => {
  // estados para el formulario
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [modelosDeMarca, setModelosDeMarca] = useState([]);
  const [marcaSelected, setMarcaSelected] = useState([]);

  // estados para manejar el modal de marca
  const [openMarca, setOpenMarca] = useState(false);
  const handleOpenMarca = () => setOpenMarca(true);
  const handleCloseMarca = () => setOpenMarca(false);

    // estados para manejar el modal de marca
    const [openModelo, setOpenModelo] = useState(false);
    const handleOpenModelo = () => setOpenModelo(true);
    const handleCloseModelo = () => setOpenModelo(false);


  // traemos toda la data necesaria para popular el formulario
  const fetchAllDataForm = async () => {
    setLoadingModal(true);
    const data = await getAllDatosFormVehiculo();
    setMarcas(data.marcas);
    setModelos(data.modelos);
    if(!isEdit){
      guardarModelosDeMarca(data.modelos, data.marcas[0].id);

    }else{
      guardarModelosDeMarca(data.modelos, vehiculo.modelo.marca.id.toString());
    }
    setLoadingModal(false);
 
      setMarcaSelected(data.marcas[0].id.toString());
    

  };

  // funcion para guardar el vehiculo, este metodo llama a la api y cierren el componente
  const guardarVehiculo = async (valores) => {
    await saveVehiculo(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  // funcion para actualizar el vehiculo, este metodo llama a la api y cierren el componente
  const actualizarVehiculo = async (valores) => {
    valores.id = vehiculo.id;
    await updateVehiculo(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  // funcion para validar el formulario
  const validateValues = (valores) => {
    let errores = {};
    // Validacion vehiculo
    if (!valores.nombre) {
      errores.nombre = "Por favor ingresa un VIN";
    }
    if (!valores.anio) {
      errores.anio = "Por favor ingresa un año";
    }
    if(!valores.precioCompra){
      errores.precioCompra = "Por favor ingresa el precio de compra";
    }
    if(!valores.precioVenta){
      errores.precioVenta = "Por favor ingresa el precio de venta";
    }
    if(!valores.cantidad){
      errores.cantidad = "Por favor ingresa la marca";
    }

    return errores;
  };
  


  // funcion para submitear el formulario y guardar o actualizar el vehiculo segun corresponda
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

  // funcion para obtener los datos del formulario cuando renderiza el componente
  useEffect(() => {
    fetchAllDataForm();
  }, []);

  
  // funcion para guardar los modelos de una marca
  const guardarModelosDeMarca = (modelos, idMarca) => {
    const modelosDeMarcaFiltrados = modelos.filter((modelo) => modelo?.marca.id.toString() === idMarca.toString());  
    setModelosDeMarca(modelosDeMarcaFiltrados);
  }

  // funcion para obtener el modelo inicial del formulario
  const getModeloInitialValue = (idMarca) => {
    
    const modelosDeMarcaFiltrados = modelos.filter((modelo) => modelo?.marca.id.toString() === idMarca);
    if(modelosDeMarcaFiltrados.length > 0){
      return modelosDeMarcaFiltrados[0].id.toString();
    }
    else{
      return "0";
    }

    // the above code is generating a infinite loop because of the setModelosDeMarca
  };

  
  
  // funcion para actualizar el modelo cuando cambiar la marca, y setear sus valores en el formulario
  const handleChangeMarca = (e, values, handleChange) => {
    // esta funcion esta para que cuando cambie la marca, se cambie el modelo
    values.marca = e.target.value
    try{
      const modelosDeMarcaFiltrados = modelos.filter((modelo) => modelo?.marca.id.toString() === e.target.value.toString());  
      setModelosDeMarca(modelosDeMarcaFiltrados);
      console.log(modelosDeMarca)
      values.modelo = modelosDeMarcaFiltrados[0].id.toString();
      
    }catch{
      values.modelo = "1";
    }
    handleChange(e);
    
  };


  // renderizamos el componente
  return (
    <>
      {loadingModal ? (
        <DotLoader color="#1D1D1D" />
      ) : (
        <>
         

          <Modal
            open={openMarca}
            onClose={handleCloseMarca}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles.box}>
              <FormularioMarca onClose={handleCloseMarca} isEdit={false} isEmbedded={true} fetchAllDataFormVehiculo={fetchAllDataForm}/>
            </Box>
          </Modal>


          <Modal
            open={openModelo}
            onClose={handleCloseModelo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles.box}>
              <FormularioModelos onClose={handleCloseModelo} isEdit={false} isEmbedded={true} fetchAllDataFormVehiculo={fetchAllDataForm}/>
            </Box>
          </Modal>

          {!isEdit ? <h2>Nuevo Vehiculo</h2> : <h2>Editar Vehiculo</h2>}

          <Formik
            initialValues={{
              modelo: isEdit
                ? vehiculo.modelo.id.toString()
                : getModeloInitialValue(marcaSelected),
              marca: isEdit
                ? vehiculo.modelo.marca.id.toString()
                : marcaSelected,
              anio: isEdit ? vehiculo.anio : "",
              importado: isEdit ? vehiculo.importado : false,
              precioCompra: isEdit ? vehiculo.precioCompra : "",
              precioVenta: isEdit ? vehiculo.precioVenta : "",
              cantidad: isEdit ? vehiculo.cantidad : ""
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
          >
            {({ errors, values, handleChange, resetForm }) => (
              <Form
                className="formulario"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid container spacing={2}>
                  
                <Grid item lg={4} md={6} xs={12}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <label htmlFor="marca">Marca</label>
                      <Typography onClick={handleOpenMarca} sx={{fontSize: 20, color: "#0F52BA", mb: 1, "&:hover":{cursor: "pointer", color: "#0818A8"}}}>+</Typography>
                    </Box>
                    <Field
                      as="select"
                      name="marca"
                      id="marca"
                      onChange={(e) => {handleChangeMarca(e, values, handleChange)}}
                    >
                      {marcas.map((marca) => {
                        if(marca.id.toString() === values.marca){
                          return (
                            <option key={marca.id} value={marca.id} selected>
                              {marca.nombre}
                            </option>
                          );
                        }else{
                          return (
                            <option key={marca.id} value={marca.id}>
                              {marca.nombre}
                            </option>
                          );

                        }
                        
                      })}
                    </Field>
                  </Grid>

                  <Grid item lg={4} md={6} xs={12}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <label htmlFor="modelo">Modelo</label>
                      <Typography onClick={handleOpenModelo} sx={{fontSize: 20, color: "#0F52BA", mb: 1, "&:hover":{cursor: "pointer", color: "#0818A8"}}}>+</Typography>
                    </Box>
                    <Field
                      as="select"
                      name="modelo"
                      id="modelo"
                    >
                     {
                      modelosDeMarca.map((modelo)=>(
                        <option key={modelo.id} value={modelo.id}>
                                {modelo.nombre}
                              </option>
                      ))
                     }
                    </Field>
                  </Grid>
                  <Grid item lg={4} md={6} xs={12}>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                      <label htmlFor="modelo">Año</label>
                      <Typography sx={{fontSize: 20, mb: 1, opacity: 0}}>+</Typography>
                    </Box>
                    <Field
                      type="number"
                      id="anio"
                      name="anio"
                      placeholder="Año del vehiculo"
                    />
                    <ErrorMessage
                      name="anio"
                      component={() => (
                        <div className="error">{errors.anio}</div>
                      )}
                    />
                  </Grid>


                  <Grid item lg={4} md={6} xs={12}>
                    <label htmlFor="precioCompra">Precio de compra</label>
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
                    <label htmlFor="precioVenta">Precio de venta</label>
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
                    <label htmlFor="cantidad">Cantidad</label>
                    <Field
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      placeholder="Cantidad"
                    />
                    <ErrorMessage
                      name="cantidad"
                      component={() => (
                        <div className="error">{errors.cantidad}</div>
                      )}
                    />
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
                    <button type="submit" onClick={()=>onSubmit(values, { resetForm })}>
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
