import axios from "axios";
import { url } from ".";

const getAllLocalidades = async () => {
  const response = await axios.get(url + "localidad");
  const localidades = response.data;
  return await localidades;
};

export { getAllLocalidades };