import axios from "axios";
import { url } from ".";

// abmc para venta, usamos axios para hacer las llamadas a la api
const getAllVentas = async () => {
  const response = await axios.get(url + "venta");
  return response.data;
};

const saveVenta = async (venta) => {
  //   const venta_parsed = {
  //     modelo: { id: venta.modelo },
  //     anio: venta.anio,
  //     importado: venta.importado,
  //     precioCompra: venta.precioCompra,
  //     precioVenta: venta.precioVenta,
  //     cantidad: venta.cantidad
  //   };
  //   console.log(venta_parsed + "asdf")
  //   const response = await axios.post(url + "venta", venta_parsed);
  //   return response.data;
  return 1;
};
const deleteVenta = async (id) => {
  //   console.log(id)
  //     const response = await axios.delete(url + "venta/" + id);
  //     return response.data;
  return 1;
};

const updateVenta = async (venta) => {
  //   const venta_parsed = {
  //     modelo: { id: venta.modelo },
  //     anio: venta.anio,
  //     importado: venta.importado,
  //     precioCompra: venta.precioCompra,
  //     precioVenta: venta.precioVenta,
  //     cantidad: venta.cantidad

  //   };

  //   const response = await axios.put(url + "venta/" + venta.id, venta_parsed);
  //   return response.data;
  return 1;
};

export { getAllVentas, saveVenta, deleteVenta, updateVenta };
