// importamos los componentes necesarios
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../Styles/styles";


// este componente es el que se encarga de renderizar la datatable de clientes
const DataTableGeneric = ({ rows, columns }) => {
  // renderizamos la datatable y el modal se renderiza cuando se abre
  return (
    <div style={styles.divDataTable}>
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
      />
    </div>
  );
};

export default DataTableGeneric;
