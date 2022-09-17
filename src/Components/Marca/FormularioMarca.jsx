import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { saveMarca, updateMarca } from "../../Services/Api";
import { BeatLoader, DotLoader } from "react-spinners";
import { getAllPaises } from "../../Services/Api";


const FormularioMarca = ({ onClose, isEdit, marca }) => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paises, setPaises] = useState([]);

  const getPaises = async () => {
    const paises = await getAllPaises();
    setPaises(paises);
    setLoading(false); 
  };

  useState(()=>{
    getPaises();
  })

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

  const validateValues = (valores) => {
    let errores = {};

    // Validacion marca
    if (!valores.marca) {
      errores.marca = "Por favor ingresa una marca";
    }
    // Validacion pais
    if (!valores.pais) {
      errores.pais = "Por favor ingresa un pais";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.pais)) {
      errores.pais = "El pais solo puede contener letras y espacios";
    }

    return errores;
  };

  const onSubmit = (valores, { resetForm }) => {
    setSaving(true);
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
      {loading ? (
        <DotLoader color="#3f51b5" loading={loading} size={150} />
      ) : (
        <>
          {!isEdit ? <h2>Nueva Marca</h2> : <h2>Editar Marca</h2>}
          <Formik
            initialValues={{
              marca: marca?.nombre ? marca.nombre : "",
              pais: marca?.pais ? marca.pais : "",
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
                  <Field as="select" name="pais">
                    {paises.map((pais) => (
                      <option key={pais.id} value={pais.abreviatura}>
                        {pais.nombre}
                      </option>
                    ))}
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
