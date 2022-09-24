import {getAllRoles} from "./Rol.api";
import {getAllPaises} from "./Pais.api";
import {getAllLocalidades} from "./Localidad.api";
import {getAllProvincias} from "./Provincia.api";

const getAllDatosFormEmpleados = async () => {
    const paises = await getAllPaises();
    const roles = await getAllRoles();
    const provincias = await getAllProvincias();
    const localidades = await getAllLocalidades();

    const datos = {
        paises: paises,
        roles: roles,
        provincias: provincias,
        localidades: localidades
    }
    return datos;
};

export { getAllDatosFormEmpleados };