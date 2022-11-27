// importamos los componentes necesarios
import React from "react";
import styles from "../../Styles/styles";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";



// este componente es el que se encarga de renderizar la datatable de clientes
const DataTableGeneric = ({ rows, columns }) => {
  // renderizamos la datatable y el modal se renderiza cuando se abre
  return (
    <div style={styles.divDataTableReporte}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize={true}
        disableColumnFilter={true}
        disableColumnMenu={true}
        empleadoFound
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
        components={{ Toolbar: GridToolbar }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  );
};

export default DataTableGeneric;
