import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllVehiculos, deleteVehiculo } from "../../Services";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { FormControlLabel, Switch } from "@mui/material";

const DataTableVehiculoEnVenta = () => {
  // estados para la datatable
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosFiltered, setVehiculosFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // I have to do a switch to change the state of the switch one per vehiculo
  const [switches, setSwitches] = useState([]);



  const handleChangeSwitch = (e) =>{
    console.log(e);
  }

  const getSwitchValue = (id) => {
    const switchValue = switches.find((m) => m.id === id);
    console.log(switchValue);
    return switchValue.value;
  }

  // definimos las columnas de la tabla
  const columns = [
    { field: "id", headerName: "ID", flex: 0 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "modelo", headerName: "Modelo", flex: 1 },
    { field: "tipoVehiculo", headerName: "Tipo de Vehículo", flex: 1 },
    { field: "cantidad", headerName: "Cantidad", flex: 1 },
    { field: "anio", headerName: "Año", flex: 1 },
    { field: "pais", headerName: "País", flex: 1 },
    { field: "precioVenta", headerName: "Venta", flex: 1 },

    // {
    //   field: "Print",
    //   headerName: "Actions",
    //   flex: 2,
    //   renderCell: (cellValues) => {
    //     return (
    //       <div>
    //         <FormControlLabel
    //           sx={{
    //             display: "block",
    //           }}
    //           control={
    //             <Switch
    //               checked={false}
    //               onChange={(e) => handleChangeSwitch(e)}
    //               name="switch"
    //               color="primary"
    //             />
    //           }
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  // funcion para obtener todos los vehiculos
  const getVehiculos = async () => {
    const response = await getAllVehiculos();
    setVehiculos(response);
    filtrarVehiculos(response, "");

    const switchesValues = response.map((vehiculo) => {
      return {
        id: vehiculo.id,
        value: false,
      };
    });

    setSwitches(switchesValues);
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
      cantidad: vehiculo.cantidad,
      anio: vehiculo.anio,
      pais: vehiculo.modelo.marca.pais.abreviatura,
      precioVenta: "$" + vehiculo.precioVenta,
    }));
    setVehiculosFiltered(segundoFiltro);
  };


  // funcion para obtener los vehiculos cuando renderiza el componente
  useEffect(() => {
    getVehiculos();
  }, []);

  // renderizamos el componente
  return (
    <>
      <div style={styles.divDataTableVehiculo}>
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
              autoHeight={true}
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
    </>
  );
};

export default DataTableVehiculoEnVenta;
