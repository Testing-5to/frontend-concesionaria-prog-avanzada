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
import { parseCurrency } from "../../Utils/Utils";

const DataTableVehiculo = ({ loading, setLoading, busqueda, filtros }) => {
  // estados para la datatable
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosFiltered, setVehiculosFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [vehiculo, setVehiculo] = useState({});

  // funcion para abrir el modal
  const handleOpen = () => setOpen(true);
  // funcion para cerrar el modal
  const handleClose = () => setOpen(false);

  // funcion para abrir el modal del form y pasarle el vehiculo a editar
  const editarUnVehiculo = (vehiculo) => {
    const vehiculoFiltered = vehiculos.find((m) => m.id === vehiculo.row.id);
    setVehiculo(vehiculoFiltered);
    handleOpen();
  };

  // funcion para eliminar un vehiculo
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

  // definimos las columnas de la tabla
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "modelo", headerName: "Modelo", flex: 1 },
    { field: "tipoVehiculo", headerName: "Tipo de Vehículo", flex: 1 },
    { field: "pais", headerName: "País", flex: 1 },
    { field: "anio", headerName: "Año", flex: 1 },
    { field: "importado", headerName: "Importado", flex: 1 },
    { field: "precioCompra", headerName: "Compra", flex: 1 },
    { field: "precioVenta", headerName: "Venta", flex: 1 },
    { field: "cantidad", headerName: "Cantidad", flex: 1 },

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

  // funcion para obtener todos los vehiculos
  const getVehiculos = async () => {
    const response = await getAllVehiculos();
    setVehiculos(response);
    filtrarVehiculos(response, "");
    setLoading(false);
  };

  // funcion para filtrar los vehiculos, recibe la busqueda y el array de vehiculos, y retorna un array filtrado
  const filtrarVehiculos = (vehiculos, busqueda) => {
    const primerFiltro = vehiculos.filter((vehiculo) => {
      return vehiculo.modelo.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
    });

    const segundoFiltro = primerFiltro.map((vehiculo) => ({
      id: vehiculo.id,
      marca: vehiculo.modelo.marca.nombre,
      modelo: vehiculo.modelo.nombre,
      tipoVehiculo: vehiculo.modelo.tipoVehiculo.nombre,
      pais: vehiculo.modelo.marca.pais.abreviatura,
      anio: vehiculo.anio,
      importado: vehiculo.importado ? "Si" : "No",
      precioCompra: parseCurrency(vehiculo.precioCompra),
      precioVenta: parseCurrency(vehiculo.precioVenta),
      cantidad: vehiculo.cantidad,
    }));
    setVehiculosFiltered(segundoFiltro);
  };

  // funcion para filtrar los vehiculos cuando cambia la busqueda
  useEffect(() => {
    filtrarVehiculos(vehiculos, busqueda);
  }, [busqueda]);

  // funcion para obtener los vehiculos cuando renderiza el componente
  useEffect(() => {
    getVehiculos();
  }, []);

  useEffect(() => {
    const {
      marca,
      modelo,
      tipoVehiculo,
      pais,
      anio,
      importado,
      compraMin,
      compraMax,
      ventaMin,
      ventaMax,
      cantidad,
    } = filtros;
    let primerFiltro = vehiculos.filter((vehiculo) => {
      return (
        vehiculo.modelo.nombre.toLowerCase().includes(modelo.toLowerCase()) &&
        vehiculo.modelo.marca.nombre
          .toLowerCase()
          .includes(marca.toLowerCase()) &&
        vehiculo.modelo.tipoVehiculo.nombre
          .toLowerCase()
          .includes(tipoVehiculo.toLowerCase()) &&
        vehiculo.modelo.marca.pais.abreviatura
          .toLowerCase()
          .includes(pais.toLowerCase()) &&
        vehiculo.anio.toString().includes(anio) &&
        vehiculo.importado.toString().includes(importado) &&
        vehiculo.cantidad.toString().includes(cantidad.toString())
      );
    });

    if (compraMin > 0 && compraMax > 0) {
      primerFiltro = primerFiltro.filter((vehiculo) => {
        return (
          vehiculo.precioCompra >= compraMin &&
          vehiculo.precioCompra <= compraMax
        );
      });
    }

    if (ventaMin > 0 && ventaMax > 0) {
      primerFiltro = primerFiltro.filter((vehiculo) => {
        return (
          vehiculo.precioVenta >= ventaMin && vehiculo.precioVenta <= ventaMax
        );
      });
    }

    let segundoFiltro = primerFiltro.map((vehiculo) => {
      return {
        id: vehiculo.id,
        marca: vehiculo.modelo.marca.nombre,
        modelo: vehiculo.modelo.nombre,
        tipoVehiculo: vehiculo.modelo.tipoVehiculo.nombre,
        pais: vehiculo.modelo.marca.pais.abreviatura,
        anio: vehiculo.anio,
        importado: vehiculo.importado ? "Si" : "No",
        precioCompra: parseCurrency(vehiculo.precioCompra),
        precioVenta: parseCurrency(vehiculo.precioVenta),
        cantidad: vehiculo.cantidad,
      };
    });

    setVehiculosFiltered(segundoFiltro);
  }, [filtros]);

  // renderizamos el componente
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
                  overflow: "hidden",
                },
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
