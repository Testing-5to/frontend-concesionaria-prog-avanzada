import axios from "axios";
import { url } from ".";

const getAllClientes = async () => {
  const response = await axios.get(url + "cliente");
  const clientes = response.data.map((cliente) => ({
    // TODO: atributos
    id: cliente.id,
    nombre: cliente.nombre,
    pais: cliente.pais.nombre,
  }));
  return clientes;
};

const saveCliente = async (marca) => {
  const cliente_parsed =  { nombre: marca.marca, pais: { id: marca.pais } };
  const response = await axios.post(url + "cliente", cliente_parsed);
  return response.data;
};

const deleteCliente = async (id) => {
  console.log(id);
  const response = await axios.delete(url + "cliente/" + id);
  return response.data;
};

const updateCliente = async (cliente) => {
  const cliente_parsed = { nombre: cliente.nombre, pais: { id: cliente.pais } };
  const response = await axios.put(url + "cliente/" + cliente.id, cliente_parsed);
  return response.data;
};

export { getAllClientes, saveCliente, deleteCliente, updateCliente };
