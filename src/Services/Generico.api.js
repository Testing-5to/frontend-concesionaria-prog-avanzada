import { getAllRoles } from "./Rol.api";
import { getAllPaises } from "./Pais.api";
import { getAllLocalidades } from "./Localidad.api";
import { getAllProvincias } from "./Provincia.api";
import { getAllMarcas } from "./Marca.api";
import { getAllTiposVehiculo } from "./TipoVehiculo.api";
import { getAllModelos } from "./Modelo.api";
import { getAllImpuestos } from "./Impuesto.api";
import { getAllVehiculos } from "./Vehiculo.api";
import { getAllEmpleados } from "./Empleado.api";
import { getAllClientes } from "./Cliente.api";

// genericos para formularios
const getAllDatosFormEmpleados = async () => {

  const [paises, roles, provincias, localidades] = await Promise.all([
    getAllPaises(),
    getAllRoles(),
    getAllProvincias(),
    getAllLocalidades(),
  ]);

  const datos = {
    paises: paises,
    roles: roles,
    provincias: provincias,
    localidades: localidades,

  }

  return datos;

};

const getAllDatosFormModelo = async () => {

  const [marcas, tiposVehiculo] = await Promise.all([
    getAllMarcas(),
    getAllTiposVehiculo(),
  ]);

  const datos = {
    marcas,
    tiposVehiculo
  }

  return datos;

};

const getAllDatosFormVehiculo = async () => {

    const [marcas, modelos, tiposVehiculo] = await Promise.all([


        getAllMarcas(),
        getAllModelos(),
        getAllTiposVehiculo(),
    ]);

    const datos = {
        marcas,
        modelos,
        tiposVehiculo,
    };

    return datos;
}

const getAllDatosFormVentas = async () => {
  
  const [impuestos, vehiculos, vendedores, clientes] = await Promise.all([
    getAllImpuestos(),
    getAllVehiculos(),
    getAllEmpleados(),
    getAllClientes(),
  ]);

  const datos = {
    impuestos,
    vehiculos,
    vendedores,
    clientes,
  };

  return datos;
}

export { getAllDatosFormEmpleados, getAllDatosFormModelo, getAllDatosFormVehiculo, getAllDatosFormVentas };
