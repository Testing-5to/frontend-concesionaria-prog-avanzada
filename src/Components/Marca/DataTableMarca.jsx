import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllMarcas, deleteMarca } from "../../Services/";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import FormularioMarca from "./FormularioMarca";

const DataTableMarca = ({ loading, setLoading, busqueda }) => {

  // estados para la datatable
  const [marcas, setMarcas] = useState([]);
  const [marcasFiltered, setMarcasFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [marca, setMarca] = useState({});

  // funcion para abrir el modal
  const handleOpen = () => setOpen(true);
  // funcion para cerrar el modal
  const handleClose = () => setOpen(false);

  // funcion para abrir el modal del form y pasarle la marca a editar
  const editarUnaMarca = (marca) => {
    const id = marca.row.id;
    const nombre = marca.row.nombre;
    const pais = marca.row.pais;
    setMarca({ id, nombre, pais });
    handleOpen();
  };

  // funcion para eliminar una marca
  const eliminarMarca = async (cellValues) => {
    if (window.confirm("¿Estas seguro de eliminar esta marca?")) {
      const { id } = cellValues;
      await deleteMarca(id);
      setLoading(true);
      await getMarcas();
      setLoading(false);
    } else {
      return;
    }
  };

  // se definen las columnas de la datatable
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "nombre", headerName: "Marca", flex: 1 },
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
                editarUnaMarca(cellValues);
              }}
            >
              <EditIcon />
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                eliminarMarca(cellValues);
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  // funcion para obtener todas las marcas
  const getMarcas = async () => {
    const response = await getAllMarcas();
    setMarcas(response);
    setMarcasFiltered(response);
    setLoading(false);
  };

  // funcion para filtrar las marcas cada vez que cambia la busqueda
  useEffect(() => {
    const marcasFiltered = marcas.filter((marca) => {
      return marca.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    setMarcasFiltered(marcasFiltered);
  }, [busqueda]);

  // funcion para obtener todas las marcas cada vez que se renderiza el componente
  useEffect(() => {
    getMarcas();
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
              rows={marcasFiltered}
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
          <FormularioMarca onClose={handleClose} isEdit={true} marca={marca} />
        </Box>
      </Modal>
    </>
  );
};

export default DataTableMarca;
