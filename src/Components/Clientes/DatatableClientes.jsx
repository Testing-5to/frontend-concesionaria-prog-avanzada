// importamos los componentes necesarios

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllClientes, deleteCliente } from "../../Services/";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import FormularioClientes from "./FormularioClientes";
import CheckIcon from "@mui/icons-material/Check";


// este componente es el que se encarga de renderizar la datatable de clientes
const DataTableClientes = ({ loading, setLoading, busqueda }) => {

  // estados para la datatable
  const [clientes, setClientes] = useState([]);
  const [clientesFiltered, setClientesFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [cliente, setCliente] = useState({});

  // funcion para abrir el modal
  const handleOpen = () => setOpen(true);
  // funcion para cerrar el modal
  const handleClose = () => setOpen(false);

  // funcion para abrir el modal del form y pasarle el cliente a editar
  const editarUnCliente = (cliente) => {
    const clienteFound = clientes.filter((e) => e.id === cliente.row.id)[0];
    setCliente(clienteFound);
    handleOpen();
  };

  // funcion para eliminar un cliente
  const eliminarCliente = async (cellValues) => {
    if (window.confirm("¿Estas seguro de eliminar esta empleado?")) {
      const { id } = cellValues;
      await deleteCliente(id);
      setLoading(true);
      await getClientes();
      setLoading(false);
    } else {
      return;
    }
  };


  // funcion para obtener todos los clientes
  const getClientes = async () => {
    const response = await getAllClientes();
    setClientes(response);
    filtrarClientes(response, busqueda);
    setLoading(false);
  };

  // funcion para filtrar los clientes, recibe la busqueda y los clientes y develve los clientes filtrados
  const filtrarClientes = (clientes, busqueda = "") => {
    const primerFiltro = clientes.filter((cliente) => {
      return cliente.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    const segundoFiltro = primerFiltro.map((cliente) => ({
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      telefono: cliente.telefono,
      dni: cliente.dni,
      provincia: cliente.direccion.localidad.provincia.nombre,
      localidad: cliente.direccion.localidad.nombre,
      esCliente: cliente.esCliente,
      direccion: `${cliente.direccion.calle} ${cliente.direccion.numero}`,
    }));

    setClientesFiltered(segundoFiltro);
  };


  // funcion para filtrar los clientes cuando cambia la busqueda
  useEffect(() => {
    filtrarClientes(clientes, busqueda);
  }, [busqueda]);

  // funcion para obtener los clientes cuando se renderiza el componente
  useEffect(() => {
    getClientes();
  }, []);


  // columnas de la datatable
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "nombre", headerName: "Nombre", flex: 0.6 },
    { field: "apellido", headerName: "Apellido", flex: 0.6 },
    { field: "telefono", headerName: "Telefono", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "direccion", headerName: "Direccion", flex: 1.1 },
    { field: "dni", headerName: "DNI", flex: 0.7 },
    { field: "provincia", headerName: "Provincia", flex: 0.7 },
    { field: "localidad", headerName: "Localidad", flex: 0.7 },
    {
      field: "esCliente",
      headerName: "Cliente",
      flex: 0.5,
      renderCell: (cliente) => {
        return <div>{cliente.row.esCliente ? <CheckIcon /> : ""}</div>;
      },
    },
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
                editarUnCliente(cellValues);
              }}
            >
              <EditIcon />
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                eliminarCliente(cellValues);
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];


  // renderizamos la datatable y el modal se renderiza cuando se abre
  return (
    <>
      <div style={styles.divDataTable}>
        {loading ? (
          <DotLoader color="#1D1D1D" />
        ) : (
          <>
            <DataGrid
              rows={clientesFiltered}
              columns={columns}
              autoPageSize={true}
              disableColumnFilter={true}
              disableColumnMenu={true}
              empleadoFound
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
          <FormularioClientes
            onClose={handleClose}
            isEdit={true}
            cliente={cliente}
          />
        </Box>
      </Modal>
    </>
  );
};

export default DataTableClientes;