import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { saveEmpleado, updateEmpleado } from "../../Services/Api";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllPaises } from "../../Services/Api";

const FormularioEmpleados = ({ onClose, isEdit, empleado }) => {
  const [saving, setSaving] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);
  const [paises, setPaises] = useState([]);

  const getPaises = async () => {
    const paises = await getAllPaises();
    setPaises(paises);
    setLoadingModal(false);
  };

  useEffect(() => {
    getPaises();
  }, []);

  const guardarEmpleado = async (valores) => {
    await saveEmpleado(valores).then((response) => {
      onClose();
    });
  };

  const actualizarEmpleado = async (valores) => {
    await updateEmpleado({
      id: empleado.id,
      nombre: valores.empleado,
      pais: valores.pais,
    }).then((response) => {
      onClose();
    });
  };

  const getPais = (nombre) => {
    const pais = paises.find((pais) => pais.nombre === nombre);
    if (pais) {
      return pais.id;
    } else {
      return 4;
    }
  };

  const validateValues = (valores) => {
    let errores = {};
   console.log(valores)
    // Validacion empleado
    if (!valores.nombre) {
      errores.nombre = "Por favor ingresa una nombre";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
      errores.nombre = "Los nombres solo puede contener letras y espacios";
    }
    if (!valores.apellido) {
      errores.apellido = "Por favor ingresa una apellido";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido)) {
      errores.apellido = "Los apellidos solo puede contener letras y espacios";
    }
    if (!valores.dni) {
      errores.dni = "Por favor ingresa una dni";
    } else if (!/^[0-9]{7,8}$/.test(valores.dni)) {
      errores.dni = "El dni debe contener entre 7 y 8 numeros";
    }
    if (!valores.cuit) {
      errores.cuit = "Por favor ingresa una cuit";
    } else if (!/^[0-9]{11}$/.test(valores.cuit)) {
      errores.cuit = "El cuit debe contener 11 numeros";
    }
    if (!valores.email) {
      errores.email = "Por favor ingresa una email";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)
    ) {
      errores.email = "El email no es valido";
    }
    if (!valores.salario) {
      errores.salario = "Por favor ingresa una salario";
    } else if (!/^[0-9]{1,10}$/.test(valores.salario)) {
      errores.salario = "El salario debe contener entre 1 y 10 numeros";
    }
    // Validacion direccion
    if (!valores.direccion) {
      errores.direccion = "Por favor ingresa una direccion";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.direccion)) {
      errores.direccion = "La direccion solo puede contener letras y espacios";
    }
    if (!valores.numero) {
      errores.numero = "Por favor ingresa una numero";
    } else if (!/^[0-9]{1,10}$/.test(valores.numero)) {
      errores.numero = "El numero debe contener entre 1 y 10 numeros";
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
              cuit: isEdit ? empleado.cuit : "",
              email: isEdit ? empleado.email : "",
              fechaIngreso: isEdit ? empleado.fechaIngreso : "",
              fechaEgreso: isEdit ? empleado.fechaEgreso : "",
              salario: isEdit ? empleado.salario : "",
              rol: isEdit ? empleado.rol : "",
              direccion: isEdit ? empleado.direccion : "",
              numero: isEdit ? empleado.numero : "",
              localidad: isEdit ? empleado.localidad : "",
              provincia: isEdit ? empleado.provincia : "",
              pais: isEdit ? empleado.pais : "",
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
          >
            {({ errors }) => (
              <Form className="formulario" style={{display:"flex", flexWrap: "wrap"}}>
                <div>
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
                </div>

                <div>
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
                </div>

                <div>
                  <label htmlFor="dni">DNI</label>
                  <Field
                    type="text"
                    id="dni"
                    name="dni"
                    placeholder="DNI del empleado"
                  />
                  <ErrorMessage
                    name="dni"
                    component={() => <div className="error">{errors.dni}</div>}
                  />
                </div>

                <div>
                  <label htmlFor="cuit">CUIT</label>
                  <Field
                    type="text"
                    id="cuit"
                    name="cuit"
                    placeholder="CUIT del empleado"
                  />
                  <ErrorMessage
                    name="cuit"
                    component={() => <div className="error">{errors.cuit}</div>}
                  />
                </div>

                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>

                <div>
                  <label htmlFor="salario">Salario</label>
                  <Field
                    type="text"
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
                </div>

                

                <div>
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
                </div>
                <div>
                  <label htmlFor="numero">Numero</label>
                  <Field
                    type="text"
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
                </div>

                <div>
                  <label htmlFor="rol">Rol</label>
                  <Field as="select" name="rol" id="rol">
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Cajero">Cajero</option>
                  </Field>
                </div>
                <div>
                  <label htmlFor="provincia">Provincia</label>
                  <Field
                    as="select"
                    id="provincia"
                    name="provincia"
                  >
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Cordoba">Cordoba</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Tucuman">Tucuman</option>
                  </Field>
                </div>
                <div>
                  <label htmlFor="localidad">Localidad</label>
                  <Field
                  as="select"
                  id="localidad"
                  name="localidad"
                  >
                    <option value="CABA">CABA</option>
                    <option value="San Miguel">San Miguel</option>
                    <option value="San Isidro">San Isidro</option>
                    <option value="San Fernando">San Fernando</option>
                    <option value="San Vicente">San Vicente</option>
                  </Field>
                </div>
                

                <div>
                  <label htmlFor="pais">País</label>
                  <Field as="select" name="pais" id="pais">
                    {paises.map((pais) => {
                      return (
                        <option key={pais.id} value={pais.id}>
                          {pais.nombre}
                        </option>
                      );
                    })}
                  </Field>
                  
                </div>

                <button type="submit">
                  {!saving ? <span>Enviar</span> : <BeatLoader color="white" />}
                </button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default FormularioEmpleados;
