import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import {
  getAllClientes,
  saveCliente,
  updateCliente,
  getAllPaises,
} from "../../Services";

const FormularioClientes = ({ onClose, isEdit, cliente }) => {
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

  const guardarCliente = async (valores) => {
    await saveCliente(valores).then((response) => {
      onClose();
    });
  };

  const actualizarCliente = async (valores) => {
    const { id, nombre, apellido, telefono, documento, email } = valores;

    await updateCliente({
      id,
      nombre,
      apellido,
      telefono,
      documento,
      email,
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

  const initialValues = {
    id: cliente.id,
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    telefono: cliente.telefono,
    documento: cliente.documento,
    email: cliente.email,
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

  const validateValues = (values) => {
    let errors = {};

    if (!values.nombre) {
      errors.nombre = "El nombre es obligatorio";
    } else if (values.nombre.length < 3) {
      errors.nombre = "El nombre debe tener al menos 3 caracteres";
    }

    if (!values.apellido) {
      errors.apellido = "El apellido es obligatorio";
    } else if (values.apellido.length < 3) {
      errors.apellido = "El apellido debe tener al menos 3 caracteres";
    }
  };

  return (
    <>
      {loadingModal ? (
        <DotLoader color="#1D1D1D" />
      ) : (
        <>
          {!isEdit ? <h2>Nuevo Cliente</h2> : <h2>Editar Cliente</h2>}

          <Formik
            initialValues={initialValues}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
          >
            {({ errors }) => (
              <Form
                className="formulario"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <div>
                  <label htmlFor="nombre">Nombre</label>
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
                </div>

                <div>
                  <label htmlFor="apellido">Apellido</label>
                  <Field
                    type="text"
                    id="apellido"
                    name="apellido"
                    placeholder="Apellido del cliente"
                  />
                  <ErrorMessage
                    name="apellido"
                    component={() => (
                      <div className="error">{errors.apellido}</div>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="telefono">Telefono</label>
                  <Field
                    type="text"
                    id="telefono"
                    name="telefono"
                    placeholder="Telefono del cliente"
                  />
                  <ErrorMessage
                    name="telefono"
                    component={() => (
                      <div className="error">{errors.telefono}</div>
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="dni">Documento</label>
                  <Field
                    type="text"
                    id="dni"
                    name="dni"
                    placeholder="DNI del cliente"
                  />
                  <ErrorMessage
                    name="dni"
                    component={() => <div className="error">{errors.dni}</div>}
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
                  <label htmlFor="provincia">Provincia</label>
                  <Field as="select" id="provincia" name="provincia">
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Cordoba">Cordoba</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Tucuman">Tucuman</option>
                  </Field>
                </div>
                <div>
                  <label htmlFor="localidad">Localidad</label>
                  <Field as="select" id="localidad" name="localidad">
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

export default FormularioClientes;
