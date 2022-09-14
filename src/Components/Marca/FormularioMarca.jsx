import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { saveMarca, updateMarca } from "../../Services/Api";

const FormularioMarca = ({ onClose, isEdit, marca }) => {
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
    if (!isEdit) {
      guardarMarca(valores);
      resetForm();
      console.log("Formulario enviado");
    } else {
      actualizarMarca(valores);
      resetForm();
      console.log("Formulario enviado");
    }
  };
  return (
    <>
      {!isEdit ? <h2>Nueva Marca</h2> : <h2>Editar Marca</h2>}
      <Formik
        initialValues={{
          marca: marca?.nombre ? marca.nombre : "",
          pais: marca?.pais ? marca.pais : "",
        }}
        validate={(valores) => validateValues(valores)}
        onSubmit={(valores, { resetForm }) => onSubmit(valores, { resetForm })}
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
                component={() => <div className="error">{errors.marca}</div>}
              />
            </div>

            <div>
              <label htmlFor="pais">País</label>
              <Field
                type="text"
                id="pais"
                name="pais"
                placeholder="Pais de la marca"
              />
              <ErrorMessage
                name="pais"
                component={() => <div className="error">{errors.pais}</div>}
              />
            </div>

            <button type="submit">Enviar</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormularioMarca;
