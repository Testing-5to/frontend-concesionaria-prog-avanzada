import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { FormControlLabel, Switch } from "@mui/material";

const DataTableVehiculoEnVenta = ({
  vehiculos,
  vehiculoSeleccionado,
  setVehiculoSeleccionado,
}) => {
  const generateSwitches = () => {
    const swGenerated = [];
    vehiculos.forEach((vehiculo) => {
      swGenerated.push({ id: vehiculo.id, checked: false });
    });
    return swGenerated;
  };

  // estados para la datatable
  const [vehiculosFiltered, setVehiculosFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // I have to do a switch to change the state of the switch one per vehiculo
  const [switches, setSwitches] = useState(() => generateSwitches());

  const handleChangeSwitch = (e, cellValues) => {
    const idRow = cellValues.row.id;
    const newState = switches.map((obj) => {
      // 👇️ if id equals 2, update country property
      if (obj.id === idRow) {
        if (!obj.checked) {
          const vSeleccionado = vehiculos.find((v) => v.id === idRow);
          setVehiculoSeleccionado(vSeleccionado);
        } else {
          setVehiculoSeleccionado({});
        }
        return { ...obj, checked: obj.checked ? false : true };
      } else {
        return { ...obj, checked: false };
      }
    });

    setSwitches(newState);
  };

  const getSwitchValue = (cellValues) => {
    const idRow = cellValues.row.id;
    try{
      const sw = switches.find((sw) => sw.id === idRow);
      return sw.checked;
    }catch(e){
      console.log(e)
      return false;
    }
    
  };

  // definimos las columnas de la tabla
  const columns = [
    { field: "id", headerName: "ID", flex: 0 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "modelo", headerName: "Modelo", flex: 1 },
    { field: "tipoVehiculo", headerName: "Tipo de Vehículo", flex: 1 },
    { field: "cantidad", headerName: "Cantidad", flex: 1 },
    { field: "anio", headerName: "Año", flex: 1 },
    { field: "pais", headerName: "País", flex: 1 },
    { field: "precioVenta", headerName: "P. Venta", flex: 1 },

    {
      field: "Print",
      headerName: "Acciones",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={getSwitchValue(cellValues)}
                  onChange={(e) => handleChangeSwitch(e, cellValues)}
                  name="switch"
                  color="primary"
                />
              }
            />
          </div>
        );
      },
    },
  ];

  // funcion para filtrar los vehiculos, recibe la busqueda y el array de vehiculos, y retorna un array filtrado
  const filtrarVehiculos = (vehiculos) => {
    const vehiculosAcondicionados = vehiculos.map((vehiculo) => ({
      id: vehiculo.id,
      marca: vehiculo.modelo.marca.nombre,
      modelo: vehiculo.modelo.nombre,
      tipoVehiculo: vehiculo.modelo.tipoVehiculo.nombre,
      cantidad: vehiculo.cantidad,
      anio: vehiculo.anio,
      pais: vehiculo.modelo.marca.pais.abreviatura,
      precioVenta: "$" + vehiculo.precioVenta,
    }));
    setVehiculosFiltered(vehiculosAcondicionados);
  };

  // funcion para obtener los vehiculos cuando renderiza el componente
  useEffect(() => {
    filtrarVehiculos(vehiculos);
    setLoading(false);
  }, []);

  // funcion para obtener los vehiculos cuando renderiza el componente
  useEffect(() => {
    filtrarVehiculos(vehiculos);
  }, [vehiculos]);

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
              sx={{
                "& .MuiDataGrid-virtualScroller": {
                  overflow: "hidden",
                },
                height: "267px"
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
