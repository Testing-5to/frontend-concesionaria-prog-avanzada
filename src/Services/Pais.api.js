import axios from "axios";
import { url } from "./index";

// abmc para paises, usamos axios para hacer las llamadas a la api
const getAllPaises = async () => {
  const response = await axios.get(url + "pais");
  const paises = response.data;
  return await paises;
};

export { getAllPaises };
