import axios from "axios";
import { url } from ".";

// abmc para localidades, usamos axios para hacer las llamadas a la api

const getAllLocalidades = async () => {
  const response = await axios.get(url + "localidad");
  const localidades = response.data;
  return await localidades;
};

export { getAllLocalidades };