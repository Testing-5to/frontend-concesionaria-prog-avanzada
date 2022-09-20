import axios from "axios";
import { url } from "./index";

const getAllPaises = async () => {
  const response = await axios.get(url + "pais");
  return response.data;
};

export { getAllPaises };
