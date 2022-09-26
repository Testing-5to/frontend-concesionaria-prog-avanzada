import axios from "axios";
import { url } from ".";

// abmc para empleados, usamos axios para hacer las llamadas a la api

const getAllEmpleados = async () => {
  const response = await axios.get(url + "empleado");
  const empleados = response.data;
  return empleados;
};

const saveEmpleado = async (empleado) => {
  const {
    nombre,
    apellido,
    telefono,
    dni,
    email,
    fechaIngreso,
    salario,
    rol,
    direccion,
    numero,
    localidad,
  } = empleado;
  const empleado_parsed = {
    nombre,
    apellido,
    telefono: telefono.toString(),
    dni,
    email,
    fechaIngreso,
    salario,
    rol: {
      id: rol,
    },
    direccion: {
      calle: direccion,
      numero: numero,
      localidad: {
        id: localidad,
      },
    },
  };
  const response = await axios.post(url + "empleado", empleado_parsed);
  return response.data;
};

const deleteEmpleado = async (id) => {
  const response = await axios.delete(url + "empleado/" + id);
  return response.data;
};

const updateEmpleado = async (empleado) => {
  const {
    nombre,
    apellido,
    telefono,
    dni,
    email,
    fechaIngreso,
    salario,
    rol,
    direccion,
    numero,
    localidad,
  } = empleado;
  const empleado_parsed = {
    nombre,
    apellido,
    telefono: telefono.toString(),
    dni,
    email,
    fechaIngreso,
    salario,
    rol: {
      id: rol,
    },
    direccion: {
      calle: direccion,
      numero: numero,
      localidad: {
        id: localidad,
      },
    },
  };
  console.log(empleado);
  console.log(empleado_parsed);
  const response = await axios.put(
    url + "empleado/" + empleado.id,
    empleado_parsed
  );
  return response.data;
};

export { getAllEmpleados, saveEmpleado, deleteEmpleado, updateEmpleado };
