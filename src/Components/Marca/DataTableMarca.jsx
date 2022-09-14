import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllMarcas, deleteMarca } from "../../Services/Api";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";

const DataTableMarca = ({ editarUnaMarca }) => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);

  const editMarca = (cellValues) => {
    editarUnaMarca(cellValues);
  };

  const eliminarMarca = async (cellValues) => {
    if (window.confirm("¿Estas seguro de eliminar esta marca?")) {
      const { id } = cellValues;
      await deleteMarca(id);
    } else {
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
              sx={styles.buttonTable}
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
    <div style={styles.divDataTableMarca}>
      {loading ? (
        <DotLoader color="#1D1D1D" />
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
};

export default DataTableMarca;
