import axios from "axios";
import { url } from ".";

// abmc para tipos de vehiculo, usamos axios para hacer las llamadas a la api
const getAllTiposVehiculo = async () => {
  const response = await axios.get(url + "tipoVehiculo");
  return response.data;
};

export { getAllTiposVehiculo };
