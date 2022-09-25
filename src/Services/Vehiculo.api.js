import axios from "axios";
import { url } from ".";

const getAllVehiculos = async () => {
  const response = await axios.get(url + "vehiculo");
  return response.data;
};

const saveVehiculo = async (vehiculo) => {
  const vehiculo_parsed = {
    nombre: vehiculo.nombre,
    modelo: { id: vehiculo.modelo },
    anio: vehiculo.anio,
    kilometros: vehiculo.kilometros,
    importado: vehiculo.importado,
    precioCompra: vehiculo.precioCompra,
    precioVenta: vehiculo.precioVenta,
  };
  const response = await axios.post(url + "vehiculo", vehiculo_parsed);
  return response.data;
};
const deleteVehiculo = async (id) => {
  console.log(id)
    const response = await axios.delete(url + "vehiculo/" + id);
    return response.data;
};

const updateVehiculo = async (vehiculo) => {
  const vehiculo_parsed = {
    nombre: vehiculo.nombre,
    modelo: { id: vehiculo.modelo },
    anio: vehiculo.anio,
    kilometros: vehiculo.kilometros,
    importado: vehiculo.importado,
    precioCompra: vehiculo.precioCompra,
    precioVenta: vehiculo.precioVenta,
  };


  const response = await axios.put(url + "vehiculo/" + vehiculo.id, vehiculo_parsed);
  return response.data;
};

export { getAllVehiculos, saveVehiculo, deleteVehiculo, updateVehiculo };
