import axios from "axios";
import { url } from ".";

const getAllEmpleados = async () => {
  const response = await axios.get(url + "empleado");
  const empleados = response.data
  return empleados;
   
};

const saveEmpleado = async (empleado) => {
  console.log(empleado);
};

const deleteEmpleado = async (id) => {
  console.log(id);
};

const updateEmpleado = async (empleado) => {
  console.log(empleado);
};

export { getAllEmpleados, saveEmpleado, deleteEmpleado, updateEmpleado };
