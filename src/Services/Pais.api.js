import axios from "axios";
import { url } from "./index";

const getAllPaises = async () => {
  const response = await axios.get(url + "pais");
  const paises = response.data;
  return await paises;
};

export { getAllPaises };
