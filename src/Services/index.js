const url = "https://concesionaria-prog-avanzada.herokuapp.com/api/v1/";
export { url };

//Marcas
export { getAllMarcas } from "./Marca.api";
export { saveMarca } from "./Marca.api";
export { deleteMarca } from "./Marca.api";
export { updateMarca } from "./Marca.api";

//Empleados
//export { getEmpleado } from "./Empleado.api";
export { getAllEmpleados } from "./Empleado.api";
export { saveEmpleado } from "./Empleado.api";
export { deleteEmpleado } from "./Empleado.api";
export { updateEmpleado } from "./Empleado.api";

// Pais
export { getAllPaises } from "./Pais.api";

// Provincias
export { getAllProvincias } from "./Provincia.api";

// Localidades
export { getAllLocalidades } from "./Localidad.api";

// Roles
export { getAllRoles } from "./Rol.api"

// Genericos para formularios
export { getAllDatosFormEmpleados } from "./Generico.api";
