import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllVentas, deleteVenta } from "../../Services";
import Button from "@mui/material/Button";
import PreviewIcon from "@mui/icons-material/Preview";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { parseCurrency, dateFormatter } from "../../Utils/Utils";
import ModalDetalleVenta from "./ModalDetalleVenta";

const DataTableVentas = ({ loading, setLoading, busqueda }) => {
  // estados para el modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // estados para la datatable
  const [ventas, setVentas] = useState([]);
  const [ventasFiltered, setVentasFiltered] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState({});


  // funcion para obtener todos los ventas
  const getVentas = async () => {
    const response = await getAllVentas();
    setVentas(response);
    filtrarVentas(response, "");
    setLoading(false);
  };

  const getTotal = (venta) => {
    const total = parseCurrency(
      venta.precioUnitario * venta.cantidadVehiculos +
        venta.precioUnitario *
          venta.cantidadVehiculos *
          (venta.impuestoPorcentaje / 100)
    );
    return total;
  };

  // funcion para filtrar los ventas, recibe la busqueda y los ventas y develve los ventas filtrados
  const filtrarVentas = (ventas, busqueda = "") => {
    const primerFiltro = ventas.filter((venta) => {
      return venta.vehiculo.modelo.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
    });
    const segundoFiltro = primerFiltro.map((venta) => ({
      id: venta.id,
      fecha: dateFormatter(venta.fecha),
      modelo: venta.vehiculo.modelo.nombre,
      marca: venta.vehiculo.modelo.marca.nombre,
      pais: venta.vehiculo.modelo.marca.pais.nombre,
      cantidad: venta.cantidadVehiculos,
      precioUnitario: parseCurrency(venta.precioUnitario),
      impuesto: venta.impuestoPorcentaje + "%",
      total: getTotal(venta),
      vendedor: venta.vendedor.nombre + " " + venta.vendedor.apellido,
      cliente: venta.cliente.nombre + " " + venta.cliente.apellido,
    }));

    setVentasFiltered(segundoFiltro);
  };

  // pasamos data al modal y lo abrimos
  const passDataToModal = (cellValues) => {
    console.log(cellValues);
    const idRow = cellValues.row.id;
    const venta = ventas.find((venta) => venta.id === idRow);
    setVentaSeleccionada(venta);
    handleOpen();
  };


  // funcion para filtrar los ventas cuando cambia la busqueda
  useEffect(() => {
    filtrarVentas(ventas, busqueda);
  }, [busqueda]);

  // funcion para obtener los ventas cuando se renderiza el componente
  useEffect(() => {
    getVentas();
  }, []);

  // columnas de la datatable
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "fecha", headerName: "Fecha", flex: 0.6 },
    { field: "modelo", headerName: "Modelo", flex: 0.6 },
    { field: "marca", headerName: "Marca", flex: 0.4 },
    { field: "pais", headerName: "Pais", flex: 0.6 },
    { field: "cantidad", headerName: "Cantidad", flex: 0.4 },
    { field: "precioUnitario", headerName: "P. Unitario", flex: 0.6 },
    { field: "impuesto", headerName: "Impuesto", flex: 0.4 },
    { field: "total", headerName: "Total", flex: 0.6 },
    { field: "vendedor", headerName: "Vendedor", flex: 0.6 },
    { field: "cliente", headerName: "Cliente", flex: 0.6 },

    {
      field: "Print",
      headerName: "Acciones",
      flex: 0.5,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button variant="contained" color="primary" onClick={()=>passDataToModal(cellValues)}>
              <PreviewIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  // renderizamos la datatable
  return (
    <>
      <div style={styles.divDataTable}>
        {loading ? (
          <DotLoader color="#1D1D1D" />
        ) : (
          <>
            <DataGrid
              rows={ventasFiltered}
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
            <ModalDetalleVenta venta={ventaSeleccionada} open={open} handleClose={handleClose}/>
          </>
        )}
      </div>
    </>
  );
};

export default DataTableVentas;
