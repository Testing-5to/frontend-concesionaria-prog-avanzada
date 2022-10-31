import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllEmpleados, deleteEmpleado } from "../../Services/";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import FormularioEmpleado from "./FormularioEmpleados";
import { parseCurrency } from "../../Utils/Utils";

const DataTableEmpleados = ({ loading, setLoading, busqueda, filtros }) => {
  // estados para la datatable
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltered, setEmpleadosFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [empleado, setEmpleado] = useState({});

  // funcion para abrir el modal
  const handleOpen = () => setOpen(true);
  // funcion para cerrar el modal
  const handleClose = () => setOpen(false);

  // funcion para abrir el modal del form y pasarle el empleado a editar
  const editarUnEmpleado = (empleado) => {
    const empleadoFound = empleados.filter((e) => e.id === empleado.row.id)[0];
    setEmpleado(empleadoFound);
    handleOpen();
  };

  // funcion para eliminar un empleado
  const eliminarEmpleado = async (cellValues) => {
    if (window.confirm("¿Estas seguro de eliminar esta empleado?")) {
      const { id } = cellValues;
      await deleteEmpleado(id);
      setLoading(true);
      await getEmpleados();
      setLoading(false);
    } else {
      return;
    }
  };

  // funcion para obtener todos los empleados
  const getEmpleados = async () => {
    const response = await getAllEmpleados();
    setEmpleados(response);
    filtrarEmpleados(response, "");
    setLoading(false);
  };

  // funcion para filtrar los empleados, recibe la busqueda y los empleados y develve los empleados filtrados
  const filtrarEmpleados = (empleados, busqueda = "") => {
    const primerFiltro = empleados.filter((empleado) => {
      return empleado.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    const segundoFiltro = primerFiltro.map((empleado) => ({
      id: empleado.id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      salario: parseCurrency(empleado.salario),
      rol: empleado.rol.nombre,
      direccion: `${empleado.direccion.calle} ${empleado.direccion.numero}`,
      provincia: empleado.direccion.localidad.provincia.nombre,
      localidad: empleado.direccion.localidad.nombre,
    }));

    setEmpleadosFiltered(segundoFiltro);
  };

  // funcion para filtrar los empleados cuando cambia la busqueda
  useEffect(() => {
    filtrarEmpleados(empleados, busqueda);
  }, [busqueda]);

  // funcion para obtener los empleados cuando se renderiza el componente
  useEffect(() => {
    getEmpleados();
  }, []);

  // columnas de la datatable
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "nombre", headerName: "Nombre", flex: 0.6 },
    { field: "apellido", headerName: "Apellido", flex: 0.6 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "salario", headerName: "Salario", flex: 0.6 },
    { field: "rol", headerName: "Rol", flex: 0.8 },
    { field: "direccion", headerName: "Direccion", flex: 0.8 },
    { field: "provincia", headerName: "Provincia", flex: 0.8 },
    { field: "localidad", headerName: "Localidad", flex: 0.8 },

    {
      field: "Print",
      headerName: "Actions",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              variant="contained"
              color="inherit"
              sx={styles.buttonTable}
              onClick={() => {
                editarUnEmpleado(cellValues);
              }}
            >
              <EditIcon />
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                eliminarEmpleado(cellValues);
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    let {
      nombre,
      apellido,
      email,
      salarioMin,
      salarioMax,
      rol,
      direccion,
      provincia,
      localidad,
    } = filtros;
    let empleadosFiltrados = empleados.filter((empleado) => {
      return (
        empleado.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
        empleado.apellido.toLowerCase().includes(apellido.toLowerCase()) &&
        empleado.email.toLowerCase().includes(email.toLowerCase()) &&
        empleado.rol.nombre.toLowerCase().includes(rol.toLowerCase()) &&
        `${empleado.direccion.calle} ${empleado.direccion.numero}`
          .toLowerCase()
          .includes(direccion.toLowerCase()) &&
        empleado.direccion.localidad.provincia.nombre
          .toLowerCase()
          .includes(provincia.toLowerCase()) &&
        empleado.direccion.localidad.nombre
          .toLowerCase()
          .includes(localidad.toLowerCase())
      );
    });

    if (salarioMin > 0 && salarioMax > 0) {
      empleadosFiltrados = empleadosFiltrados.filter((empleado) => {
        return empleado.salario >= salarioMin && empleado.salario <= salarioMax;
      });
    }

    const empleadosFiltradosMapped = empleadosFiltrados.map((empleado) => ({
      id: empleado.id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      salario: parseCurrency(empleado.salario),
      rol: empleado.rol.nombre,
      direccion: `${empleado.direccion.calle} ${empleado.direccion.numero}`,
      provincia: empleado.direccion.localidad.provincia.nombre,
      localidad: empleado.direccion.localidad.nombre,
    }));

    setEmpleadosFiltered(empleadosFiltradosMapped);
  }, [filtros]);

  // renderizamos la datatable
  return (
    <>
      <div style={styles.divDataTable}>
        {loading ? (
          <DotLoader color="#1D1D1D" />
        ) : (
          <>
            <DataGrid
              rows={empleadosFiltered}
              columns={columns}
              autoPageSize={true}
              disableColumnFilter={true}
              disableColumnMenu={true}
              disableSelectionOnClick={true}
              initialState={{
                sorting: {
                  sortModel: [{ field: "id", sort: "asc" }],
                },
              }}
            />
          </>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.box}>
          <FormularioEmpleado
            onClose={handleClose}
            isEdit={true}
            empleado={empleado}
          />
        </Box>
      </Modal>
    </>
  );
};

export default DataTableEmpleados;
