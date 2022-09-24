import axios from "axios";
import { url } from ".";

const getAllProvincias = async () => {
  const response = await axios.get(url + "provincia");
  const provincias = response.data;
  return await provincias;
};

export { getAllProvincias };