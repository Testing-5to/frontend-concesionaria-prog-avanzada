import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllPaises, saveModelo, updateModelo } from "../../Services";

const FormularioModelo = ({ onClose, isEdit, modelo }) => {
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

  const guardarModelo = async (valores) => {
    await saveModelo(valores).then((response) => {
      onClose();
      window.location.reload();
    });
  };

  const actualizarModelo = async (valores) => {
    await updateModelo({
      id: modelo.id,
      nombre: valores.modelo,
      pais: valores.pais,
    }).then((response) => {
      onClose();
      window.location.reload();
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
    // Validacion modelo
    if (!valores.modelo) {
      errores.modelo = "Por favor ingresa una modelo";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.modelo)) {
      errores.modelo = "La modelo solo puede contener letras y espacios";
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
  return (
    <>
      {loadingModal ? (
        <DotLoader color="#1D1D1D" />
      ) : (
        <>
          {!isEdit ? <h2>Nueva Modelo</h2> : <h2>Editar Modelo</h2>}
          <Formik
            initialValues={{
              modelo: modelo?.nombre ? modelo.nombre : "",
              pais: getPais(modelo?.pais),
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
          >
            {({ errors }) => (
              <Form className="formulario">
                <div>
                  <label htmlFor="modelo">Modelo</label>
                  <Field
                    type="text"
                    id="modelo"
                    name="modelo"
                    placeholder="Nombre de la modelo"
                  />
                  <ErrorMessage
                    name="modelo"
                    component={() => (
                      <div className="error">{errors.modelo}</div>
                    )}
                  />
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

export default FormularioModelo;
