import axios from "axios";
import { url } from ".";

// abmc para impuesto, usamos axios para hacer las llamadas a la api
const getAllImpuestos = async () => {
  const response = await axios.get(url + "impuesto");
  return response.data;
};

const saveImpuesto = async (impuesto) => {
  //   const impuesto_parsed = {
  //     modelo: { id: impuesto.modelo },
  //     anio: impuesto.anio,
  //     importado: impuesto.importado,
  //     precioCompra: impuesto.precioCompra,
  //     precioVenta: impuesto.precioVenta,
  //     cantidad: impuesto.cantidad
  //   };
  //   console.log(impuesto_parsed + "asdf")
  //   const response = await axios.post(url + "impuesto", impuesto_parsed);
  //   return response.data;
  return 1;
};
const deleteImpuesto = async (id) => {
  //   console.log(id)
  //     const response = await axios.delete(url + "impuesto/" + id);
  //     return response.data;
  return 1;
};

const updateImpuesto = async (impuesto) => {
  //   const impuesto_parsed = {
  //     modelo: { id: impuesto.modelo },
  //     anio: impuesto.anio,
  //     importado: impuesto.importado,
  //     precioCompra: impuesto.precioCompra,
  //     precioVenta: impuesto.precioVenta,
  //     cantidad: impuesto.cantidad

  //   };

  //   const response = await axios.put(url + "impuesto/" + impuesto.id, impuesto_parsed);
  //   return response.data;
  return 1;
};

export { getAllImpuestos, saveImpuesto, deleteImpuesto, updateImpuesto };
