import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllVentas, deleteVenta } from "../../Services";
import Button from "@mui/material/Button";
import PreviewIcon from '@mui/icons-material/Preview';
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";


const DataTableVentas = ({ loading, setLoading, busqueda }) => {

  // estados para la datatable
  const [ventas, setVentas] = useState([]);
  const [ventasFiltered, setVentasFiltered] = useState([]);


  const dateFormatter = (_date) => {
    // Create a date object from a date string
    const date = new Date(_date);

    // Get year, month, and day part from the date
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    let hour;
    if(date.getMinutes()< 10){
      hour = date.getHours()+":0"+date.getMinutes();
    }else{
      hour = date.getHours()+":"+date.getMinutes();
    }
    

    // Generate yyyy-mm-dd date string
    const formattedDate = day + "-" + month + "-" + year + " " + hour;
    return formattedDate
  }


  // funcion para obtener todos los ventas
  const getVentas = async () => {
    const response = await getAllVentas();
    setVentas(response);
    filtrarVentas(response, "");
    setLoading(false);
  };

  // funcion para filtrar los ventas, recibe la busqueda y los ventas y develve los ventas filtrados
  const filtrarVentas = (ventas, busqueda = "") => {

    const primerFiltro = ventas.filter((venta) => {
      return venta.vehiculo.modelo.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    const segundoFiltro = primerFiltro.map((venta) => ({
      id: venta.id,
      fecha: dateFormatter(venta.fecha),
      modelo: venta.vehiculo.modelo.nombre,
      marca: venta.vehiculo.modelo.marca.nombre,
      pais: venta.vehiculo.modelo.marca.pais.nombre,
      cantidad: venta.cantidadVehiculos,
      precioUnitario: "$"+venta.precioUnitario,
      impuesto: venta.impuesto.porcentaje+"%",
      total: "$"+parseFloat(((venta.precioUnitario)*(venta.cantidadVehiculos)+(venta.precioUnitario)*(venta.cantidadVehiculos)*(venta.impuesto.porcentaje/100)).toFixed(2)),
      vendedor: venta.vendedor.nombre + " " + venta.vendedor.apellido,
      cliente: venta.cliente.nombre + " " + venta.cliente.apellido
    }));

    setVentasFiltered(segundoFiltro);
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
    { field: "marca", headerName: "Marca", flex: 0.4},
    { field: "pais", headerName: "Pais", flex: 0.6 },
    { field: "cantidad", headerName: "Cantidad", flex: 0.4 },
    { field: "precioUnitario", headerName: "P. Unitario", flex: 0.6 },
    { field: "impuesto", headerName: "Impuesto", flex: 0.4 },
    { field: "total", headerName: "Total", flex: 0.6 },
    { field: "vendedor", headerName: "Vendedor", flex: 0.6 },
    { field: "cliente", headerName: "Cliente", flex: 0.6 },

    
    {
      field: "Print",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
             
            >
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
          </>
        )}
      </div>
    </>
  );
};

export default DataTableVentas;
