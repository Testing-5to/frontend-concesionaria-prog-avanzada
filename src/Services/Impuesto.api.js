import axios from "axios";
import { url } from ".";

// abmc para impuesto, usamos axios para hacer las llamadas a la api
const getAllImpuestos = async () => {
  const response = await axios.get(url + "impuesto");
  return response.data;
};

const getImpuestoDelVehiculo = async (precio, pais) => {

  const response = await axios.get(url + "impuesto/consultar?pais=" + pais + "&precioDeVenta=" + precio);
  return response.data;

};

export { getAllImpuestos, getImpuestoDelVehiculo };
