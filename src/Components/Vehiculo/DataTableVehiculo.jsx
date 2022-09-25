import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllVehiculos, deleteVehiculo } from "../../Services";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import FormularioVehiculo from "./FormularioVehiculo";

const DataTableVehiculo = ({ loading, setLoading, busqueda }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosFiltered, setVehiculosFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [vehiculo, setVehiculo] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const editarUnVehiculo = (vehiculo) => {
    const vehiculoFiltered = vehiculos.find((m) => m.id === vehiculo.row.id);
    setVehiculo(vehiculoFiltered);
    handleOpen();
  };

  const eliminarVehiculo = async (cellValues) => {
    if (window.confirm("¿Estas seguro de eliminar esta vehiculo?")) {
      const { id } = cellValues;
      await deleteVehiculo(id);
      setLoading(true);
      await getVehiculos();
      setLoading(false);
    } else {
      return;
    }
  };
  const columns = [

    { field: "id", headerName: "ID", flex: 1 },
    { field: "nombre", headerName: "Vehiculo", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "tipoVehiculo", headerName: "Tipo de Vehículo", flex: 1 },
    { field: "pais", headerName: "País", flex: 1 },
    { field: "year", headerName: "Año", flex: 1 },
    { field: "kilometros", headerName: "Kilometros", flex: 1 },
    { field: "importado", headerName: "Importado", flex: 1 },
    { field: "precioCompra", headerName: "Compra", flex: 1 },
    { field: "precioVenta", headerName: "Venta", flex: 1 },
    {
      field: "Print",
      headerName: "Actions",
      flex: 2,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              variant="contained"
              color="inherit"
              sx={styles.buttonTable}
              onClick={() => {
                editarUnVehiculo(cellValues);
              }}
            >
              <EditIcon />
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                eliminarVehiculo(cellValues);
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const getVehiculos = async () => {
    const response = await getAllVehiculos();
    setVehiculos(response);
    filtrarVehiculos(response, "");
    setLoading(false);
  };
  const filtrarVehiculos = (vehiculos, busqueda) => {
    const primerFiltro = vehiculos.filter((vehiculo) => {
      return vehiculo.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
 
    const segundoFiltro = primerFiltro.map((vehiculo) => ({
      id: vehiculo.id,
      nombre: vehiculo.nombre,
      marca: vehiculo.modelo.marca.nombre,
      tipoVehiculo: vehiculo.modelo.tipoVehiculo.nombre,
      pais: vehiculo.modelo.marca.pais.abreviatura,
      year: vehiculo.year,
      kilometros: vehiculo.kilometros+"km",
      importado: vehiculo.importado ? "Si" : "No",
      precioCompra: "$"+vehiculo.precioCompra,
      precioVenta: "$"+vehiculo.precioVenta,
    }));
    setVehiculosFiltered(segundoFiltro);
  }

  useEffect(() => {
    filtrarVehiculos(vehiculos, busqueda);
  }, [busqueda]);

  useEffect(() => {
    getVehiculos();
  }, []);

  return (
    <>
      <div style={styles.divDataTable}>
        {loading ? (
          <DotLoader color="#1D1D1D" />
        ) : (
          <>
            <DataGrid
              rows={vehiculosFiltered}
              columns={columns}
              autoPageSize={true}
              disableColumnFilter={true}
              disableColumnMenu={true}
              sx={{
                "& .MuiDataGrid-virtualScroller": {
                  overflow: "hidden"
                }
              }}
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
          <FormularioVehiculo
            onClose={handleClose}
            isEdit={true}
            vehiculo={vehiculo}
          />
        </Box>
      </Modal>
    </>
  );
};

export default DataTableVehiculo;
