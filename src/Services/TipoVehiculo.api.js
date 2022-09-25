import axios from "axios";
import { url } from ".";

const getAllTiposVehiculo = async () => {
  const response = await axios.get(url + "tipoVehiculo");
  return response.data;
};

export { getAllTiposVehiculo };
