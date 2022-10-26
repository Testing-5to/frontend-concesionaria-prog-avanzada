import axios from "axios";
import { url } from ".";

// abmc para provincias, usamos axios para hacer las llamadas a la api
const getAllProvincias = async () => {
  const response = await axios.get(url + "provincia");
  const provincias = response.data;
  return await provincias;
};

export { getAllProvincias };