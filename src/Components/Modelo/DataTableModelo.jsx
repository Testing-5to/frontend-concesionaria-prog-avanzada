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

  // estados para la datatable
  const [modelos, setModelos] = useState([]);
  const [modelosFiltered, setModelosFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [modelo, setModelo] = useState({});

  // funcion para abrir el modal
  const handleOpen = () => setOpen(true);
  // funcion para cerrar el modal
  const handleClose = () => setOpen(false);

  // funcion para abrir el modal del form y pasarle el modelo a editar
  const editarUnModelo = (modelo) => {
    const modeloFiltered = modelos.find((m) => m.id === modelo.row.id);
    setModelo(modeloFiltered);
    handleOpen();
  };

  // funcion para eliminar un modelo
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

  // definimos las columnas de la datatable
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "nombre", headerName: "Modelo", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "tipoVehiculo", headerName: "Tipo de Vehículo", flex: 1 },
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
                editarUnModelo(cellValues);
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

  // funcion para obtener los modelos
  const getModelos = async () => {
    const response = await getAllModelos();
    setModelos(response);
    filtrarModelos(response, "");
    setLoading(false);
  };

  // funcion para filtrar los modelos segun la busqueda
  const filtrarModelos = (modelos, busqueda) => {
    const primerFiltro = modelos.filter((modelo) => {
      return modelo.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });

    const segundoFiltro = primerFiltro.map((modelo) => ({
      id: modelo.id,
      nombre: modelo.nombre,
      marca: modelo.marca.nombre,
      tipoVehiculo: modelo.tipoVehiculo.nombre,
      pais: modelo.marca.pais.nombre,
    }));
    setModelosFiltered(segundoFiltro);
  }

  // funcion para actualizar la busqueda
  useEffect(() => {
    filtrarModelos(modelos, busqueda);
  }, [busqueda]);

  // funcion para obtener los modelos al renderizar el componente
  useEffect(() => {
    getModelos();
  }, []);


  // renderizamos el componente
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
          <FormularioModelo
            onClose={handleClose}
            isEdit={true}
            modelo={modelo}
          />
        </Box>
      </Modal>
    </>
  );
};

export default DataTableModelo;
