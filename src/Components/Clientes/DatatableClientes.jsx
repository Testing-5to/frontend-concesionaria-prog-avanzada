import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllClientes } from "../../Services";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import FormularioClientes from "./FormularioClientes";
import { deleteCliente } from "../../Services/Cliente.api";

const DataTableClientes = ({ loading, setLoading, busqueda }) => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltered, setClientesFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [empleado, setCliente] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const editarUnEmpleado = (cliente) => {
    setClientes(clientes.row);
    handleOpen();
  };

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

  const getClientes = async () => {
    const response = await getAllClientes();
    setClientes(response);
    filtrarClientes(response, busqueda);
    setLoading(false);
  };

  const filtrarClientes = (Clientes, busqueda = "") => {
    const primerFiltro = Clientes.filter((cliente) => {
      return cliente.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    const segundoFiltro = primerFiltro.map((cliente) => ({
      id: empleado.id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      email: empleado.email,
      direccion: empleado.direccion,
    }));

    setClientesFiltered(segundoFiltro);
  };

  useEffect(() => {
    filtrarClientes(clientes, busqueda);
  }, [busqueda]);

  useEffect(() => {
    console.log("re-render");
    getClientes();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "apellido", headerName: "Apellido", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "salario", headerName: "Salario", flex: 1 },
    { field: "rol", headerName: "Rol", flex: 1 },
    { field: "direccion", headerName: "Direccion", flex: 1 },
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

  return (
    <>  
      <div style={styles.divDataTable}>
        {loading ? (
          <DotLoader color="#1D1D1D" />
        ) : (
          <>
            <DataGrid
              ro  ws={clientesFiltered}
              columns={columns}
              autoPageSize={true}
              disableColumnFilter={true}
              disableColumnMenu={true}
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
            empleado={empleado}
          />
        </Box>
      </Modal>
    </>
  );
};

export default DataTableClientes;
