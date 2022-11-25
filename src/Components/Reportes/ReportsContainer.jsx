import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { Box } from "@mui/system";
import DataTableGeneric from "./DataTableGeneric";
import ReportsForm from "./ReportsForm";


const ReportsContainer = ({ loading, setLoading }) => {
  
    const [columns, setColumns] = useState([{ field: "id", headerName: "ID", flex: 0.5 }]);
    const [rows, setRows] = useState([]);

  // funcion para obtener los modelos al renderizar el componente
  useEffect(() => {
  }, []);


  // renderizamos el componente
  return (
    <>
      <div style={styles.divReportes}>
        {loading ? (
          <DotLoader color="#1D1D1D" />
        ) : (
          <>
            <Box sx={{display: "flex", flexDirection: "column", height: "100%", width: "100%", justifyContent: "flex-start", alignItems: "flex-start"}}>
                <ReportsForm />
                <DataTableGeneric columns={columns} rows={rows}/>
            </Box>
          </>
        )}
      </div>
     
    </>
  );
};

export default ReportsContainer;
