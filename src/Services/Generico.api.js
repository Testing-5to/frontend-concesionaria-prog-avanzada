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
  const paises = await getAllPaises();
  const roles = await getAllRoles();
  const provincias = await getAllProvincias();
  const localidades = await getAllLocalidades();

  const datos = {
    paises: paises,
    roles: roles,
    provincias: provincias,
    localidades: localidades,
  };
  return datos;
};

const getAllDatosFormModelo = async () => {
  const marcas = await getAllMarcas();
  const tiposVehiculo = await getAllTiposVehiculo();
  const datos = {
    marcas: marcas,
    tiposVehiculo: tiposVehiculo,
  };
  return datos;
};

const getAllDatosFormVehiculo = async () => {
    const marcas = await getAllMarcas();
    const modelos = await getAllModelos();
    const tiposVehiculo = await getAllTiposVehiculo();
    const datos = {
        marcas,
        modelos,
        tiposVehiculo,
    };
    return datos;
}

const getAllDatosFormVentas = async () => {
  const impuestos = await getAllImpuestos();
  const vehiculos = await getAllVehiculos();
  const vendedores = await getAllEmpleados();
  const clientes = await getAllClientes();

  const datos = {
    impuestos,
    vehiculos,
    vendedores,
    clientes
  }

  return datos;
}

export { getAllDatosFormEmpleados, getAllDatosFormModelo, getAllDatosFormVehiculo, getAllDatosFormVentas };
