import axios from "axios";
import { url } from ".";

const getAllEmpleados = async () => {
  const response = await axios.get(url + "empleado");
  const empleados = response.data
  return empleados;
   
};

const saveEmpleado = async (empleado) => {
  const empleado_parsed = {
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    telefono: empleado.telefono,
    dni: empleado.dni,
    email: empleado.email,
    fechaIngreso: empleado.fechaIngreso,
    salario: empleado.salario,
    rol: {
        id: empleado.rol
    },
    direccion: {
        calle: empleado.direccion,
        numero: empleado.numero,
        localidad: {
            id: empleado.localidad
        }
    }
  }
  const response = await axios.post(url + "empleado", empleado_parsed);
  return response.data;
};

const deleteEmpleado = async (id) => {
  const response = await axios.delete(url + "empleado/" + id);
  return response.data;
};

const updateEmpleado = async (empleado) => {
  const empleado_parsed = {
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    telefono: empleado.telefono.toString(),
    dni: empleado.dni,
    email: empleado.email,
    fechaIngreso: empleado.fechaIngreso,
    salario: empleado.salario,
    rol: {
        id: empleado.rol
    },
    direccion: {
        calle: empleado.direccion,
        numero: empleado.numero,
        localidad: {
            id: empleado.localidad
        }
    }
  }
  console.log(empleado)
  console.log(empleado_parsed);
  const response = await axios.put(url + "empleado/" + empleado.id, empleado_parsed);
  return response.data;
  
};

export { getAllEmpleados, saveEmpleado, deleteEmpleado, updateEmpleado };
