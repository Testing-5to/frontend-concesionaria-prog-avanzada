import axios from "axios";
import { url } from "./index";

const getAllRoles = async () => {
  const response = await axios.get(url + "rol");
  return response.data;
};

export { getAllRoles };
