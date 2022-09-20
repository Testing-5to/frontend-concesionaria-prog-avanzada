import {getAllRoles} from "./Rol.api";
import {getAllPaises} from "./Pais.api";

const getAllDatosFormEmpleados = async () => {
    const paises = await getAllPaises();
    const roles = await getAllRoles();
    const datos = {
        paises: paises,
        roles: roles
    }
    return datos;
};

export { getAllDatosFormEmpleados };