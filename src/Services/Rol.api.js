import axios from "axios";
import { url } from "./index";

// abmc para roles, usamos axios para hacer las llamadas a la api
const getAllRoles = async () => {
  const response = await axios.get(url + "rol");
  return response.data;
};

export { getAllRoles };
