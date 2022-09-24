import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllModelos, deleteModelo } from "../../Services";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import FormularioModelo from "./FormularioModelo";

const DataTableModelo = ({ loading, setLoading, busqueda }) => {
  const [modelos, setModelos] = useState([]);
  const [modelosFiltered, setModelosFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [modelo, setModelo] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const editarUnaModelo = (modelo) => {
    const id = modelo.row.id;
    const nombre = modelo.row.nombre;
    const pais = modelo.row.pais;
    setModelo({ id, nombre, pais });
    handleOpen();
  };

  const eliminarModelo = async (cellValues) => {
    if (window.confirm("¿Estas seguro de eliminar esta modelo?")) {
      const { id } = cellValues;
      await deleteModelo(id);
      setLoading(true);
      await getModelos();
      setLoading(false);
    } else {
      return;
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "nombre", headerName: "Modelo", flex: 1 },
    { field: "pais", headerName: "País", flex: 1 },

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
                editarUnaModelo(cellValues);
              }}
            >
              <EditIcon />
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                eliminarModelo(cellValues);
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const getModelos = async () => {
    const response = await getAllModelos();
    setModelos(response);
    setModelosFiltered(response);
    setLoading(false);
  };

  useEffect(() => {
    const modelosFiltered = modelos.filter((modelo) => {
      return modelo.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    setModelosFiltered(modelosFiltered);
  }, [busqueda]);

  useEffect(() => {
    console.log("re-render");
    getModelos();
  }, []);

  return (
    <>
      <div style={styles.divDataTable}>
        {loading ? (
          <DotLoader color="#1D1D1D" />
        ) : (
          <>
            <DataGrid
              rows={modelosFiltered}
              columns={columns}
              autoPageSize={true}
              disableColumnFilter={true}
              disableColumnMenu={true}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'id', sort: 'asc' }],
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
          <FormularioModelo onClose={handleClose} isEdit={true} modelo={modelo} />
        </Box>
      </Modal>
    </>
  );
};

export default DataTableModelo;
