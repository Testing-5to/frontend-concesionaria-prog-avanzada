import axios from "axios";
import { url } from ".";

const getAllModelos = async () => {
  const response = await axios.get(url + "modelo");
  return response.data;
};

const saveModelo = async (modelo) => {
    const modelo_parsed = {
        nombre: modelo.nombre,
        marca: {
          id: modelo.marca,
        },
        tipoVehiculo: {
          id: modelo.tipoVehiculo,
        },
      };
  console.log(modelo_parsed);
  const response = await axios.post(url + "modelo", modelo_parsed);
  return response.data;
};
const deleteModelo = async (id) => {
  const response = await axios.delete(url + "modelo/" + id);
  return response.data;
};

const updateModelo = async (modelo) => {
  const modelo_parsed = {
    nombre: modelo.nombre,
    marca: {
      id: modelo.marca,
    },
    tipoVehiculo: {
      id: modelo.tipoVehiculo,
    },
  };
  console.log(modelo_parsed);
  const response = await axios.put(url + "modelo/" + modelo.id, modelo_parsed);
  return response.data;
};

export { getAllModelos, saveModelo, deleteModelo, updateModelo };
