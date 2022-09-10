import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllMarcas, deleteMarca } from "../../Services/Api";
import { yellow } from "@mui/material/colors";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';


const DataTableMarca = ({editarUnaMarca}) => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);


  const editMarca = (cellValues) => {
    editarUnaMarca(cellValues);
  };

  const eliminarMarca = async (cellValues) => {
    if(window.confirm("¿Estas seguro de eliminar esta marca?")){
      const {id} = cellValues;
      await deleteMarca(id);
    }else {
      return;
    }
    
  };
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
              sx={{ backgroundColor: yellow[700], color: "white", '&:hover': { backgroundColor: yellow[800] } }}
              onClick={() => {
                editMarca(cellValues);
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

  const getMarcas = async () => {
    const response = await getAllMarcas();
    setMarcas(response);
    setLoading(false);
  };

  useEffect(() => {
    getMarcas();
  });
  return (
    <div
      style={{
        margin: "auto",
        height: 660,
        width: "95%",
        backgroundColor: "white",
      }}
    >
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <>
        <DataGrid
          rows={marcas}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
       
          
        </>
      )}
      
    </div>
  );
}

export default DataTableMarca;