import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { saveMarca, updateMarca } from "../../Services/Api";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllPaises } from "../../Services/Api";

const FormularioMarca = ({ onClose, isEdit, marca }) => {
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

  const guardarMarca = async (valores) => {
    await saveMarca(valores).then((response) => {
      onClose();

    });
  };

  const actualizarMarca = async (valores) => {
    await updateMarca({
      id: marca.id,
      nombre: valores.marca,
      pais: valores.pais,
    }).then((response) => {
      onClose();

    });
  };

  const getPais = (nombre) => {
    const pais = paises.find((pais) => pais.nombre === nombre);
    if (pais){
      return pais.id;
    }else{
      return 4;
    }
  }


  const validateValues = (valores) => {
    let errores = {};
    // Validacion marca
    if (!valores.marca) {
      errores.marca = "Por favor ingresa una marca";
    }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.marca)) {
      errores.marca = "La marca solo puede contener letras y espacios";
    }
    return errores;
  };

  const onSubmit = (valores, { resetForm }) => {
    setSaving(true);
    console.log(valores);
    if (!isEdit) {
      guardarMarca(valores).then(() => {
        resetForm();
        setSaving(false);
      });
    } else {
      actualizarMarca(valores).then(() => {
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
          {!isEdit ? <h2>Nueva Marca</h2> : <h2>Editar Marca</h2>}
          <Formik
            initialValues={{
              marca: marca?.nombre ? marca.nombre : "",
              pais: getPais(marca?.pais),
            }}
            validate={(valores) => validateValues(valores)}
            onSubmit={(valores, { resetForm }) =>
              onSubmit(valores, { resetForm })
            }
          >
            {({ errors }) => (
              <Form className="formulario">
                <div>
                  <label htmlFor="marca">Marca</label>
                  <Field
                    type="text"
                    id="marca"
                    name="marca"
                    placeholder="Nombre de la marca"
                  />
                  <ErrorMessage
                    name="marca"
                    component={() => (
                      <div className="error">{errors.marca}</div>
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
                  <ErrorMessage
                    name="pais"
                    component={() => <div className="error">{errors.pais}</div>}
                  />
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

export default FormularioMarca;
