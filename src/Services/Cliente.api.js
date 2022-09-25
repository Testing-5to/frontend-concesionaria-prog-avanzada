import axios from "axios";
import { url } from ".";

const getAllClientes = async () => {
  const response = await axios.get(url + "cliente");
  const clientes = response.data;
  console.log(clientes);
  return clientes;
};

const saveCliente = async (cliente) => {
  const {
    nombre,
    apellido,
    telefono,
    dni,
    email,
    direccion,
    numero,
    localidad,
    esCliente,
  } = cliente;
  const cliente_parsed = {
    nombre,
    apellido,
    telefono: telefono.toString(),
    dni,
    email,
    esCliente,
    direccion: {
      calle: direccion,
      numero: numero,
      localidad: {
        id: localidad,
      },
    },
  };
  const response = await axios.post(url + "cliente", cliente_parsed);
  return response.data;
};

const deleteCliente = async (id) => {
  const response = await axios.delete(url + "cliente/" + id);
  return response.data;
};

const updateCliente = async (cliente) => {
  const {
    nombre,
    apellido,
    telefono,
    dni,
    email,
    direccion,
    numero,
    localidad,
    esCliente,
  } = cliente;
  console.log(cliente);
  const cliente_parsed = {
    nombre,
    apellido,
    telefono: telefono.toString(),
    dni,
    email,
    esCliente,
    direccion: {
      calle: direccion,
      numero: numero,
      localidad: {
        id: localidad,
      },
    },
  };
  console.log(cliente_parsed);
  const response = await axios.put(
    url + "cliente/" + cliente.id,
    cliente_parsed
  );
  return response.data;
};

export { getAllClientes, saveCliente, deleteCliente, updateCliente };
