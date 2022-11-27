import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import styles from "../../Styles/styles";
import { Box } from "@mui/system";
import DataTableGeneric from "./DataTableGeneric";
import ReportsForm from "./ReportsForm";
import { getAllEmpleados } from "../../Services";
import {
  columnsForReport,
  parseCurrency,
  parsePercentage,
} from "../../Utils/Utils";
import {
  getReporteUtilidades,
  getReporteAutosVendidos,
  getReporteVentasPorMes,
} from "../../Services";

const ReportsContainer = ({ loading, setLoading }) => {
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", flex: 0.5 },
  ]);
  const [rows, setRows] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [vendedoresParaReporte, setVendedoresParaReporte] = useState([]);

  // traemos los vendedores
  const getVendedores = async () => {
    setLoading(true);
    const empleados = await getAllEmpleados();
    const vend = empleados.filter(
      (vendedor) => vendedor.rol.nombre === "Vendedor"
    );
    setVendedores(vend);
    setVendedoresParaReporte(
      vend.map((vendedor) => vendedor.nombre + " " + vendedor.apellido)
    );
    setLoading(false);
  };

  const handleConsultarReporte = async (data) => {
    // I need to pick the vendedoresSeleccionados from the data, then I have to filter the vendedores array to get the id's
    // then I have to send the id's to the backend to get the report
    const vendedoresSeleccionados = data.vendedoresSeleccionados;
    const vendedoresSeleccionadosId = vendedores
      .filter((vendedor) =>
        vendedoresSeleccionados.includes(
          vendedor.nombre + " " + vendedor.apellido
        )
      )
      .map((vendedor) => vendedor.id);
    switch (data.reporteSeleccionado) {
      case 1:
        // if all vendedores are selected, then I have to send an empty array to the backend
        if (vendedoresSeleccionados.length === vendedores.length) {
          vendedoresSeleccionadosId.length = 0;
          const reporte = await getReporteUtilidades({
            fechaDesde: data.fechaDesde,
            fechaHasta: data.fechaHasta,
            vendedores: vendedoresSeleccionadosId,
          });
          generarReporte(reporte, 1);
        } else {
          const reporte = await getReporteUtilidades({
            fechaDesde: data.fechaDesde,
            fechaHasta: data.fechaHasta,
            vendedores: vendedoresSeleccionadosId,
          });
          generarReporte(reporte, 1);
        }
        break;
      case 2:
        // if all vendedores are selected, then I have to send an empty array to the backend
        if (vendedoresSeleccionados.length === vendedores.length) {
          vendedoresSeleccionadosId.length = 0;
          const reporte = await getReporteAutosVendidos({
            fechaDesde: data.fechaDesde,
            fechaHasta: data.fechaHasta,
            vendedores: vendedoresSeleccionadosId,
          });
          generarReporte(reporte, 2);
        } else {
          const reporte = await getReporteAutosVendidos({
            fechaDesde: data.fechaDesde,
            fechaHasta: data.fechaHasta,
            vendedores: vendedoresSeleccionadosId,
          });
          generarReporte(reporte, 2);
        }
        break;
      case 3:
<<<<<<< HEAD
         
          const reporte = await getReporteVentasPorMes({
            fechaDesde: data.fechaDesde,
            fechaHasta: data.fechaHasta,
          });
          generarReporte(reporte, 3);
       
         
        
=======
        // if all vendedores are selected, then I have to send an empty array to the backend

        const reporte = await getReporteVentasPorMes({
          fechaDesde: data.fechaDesde,
          fechaHasta: data.fechaHasta,
        });
        generarReporte(reporte, 3);

>>>>>>> desarrollo
        break;
      default:
        console.log("default");
        break;
    }
  };

  // funcion para obtener los modelos al renderizar el componente
  useEffect(() => {
    getVendedores();
  }, []);

  const generarReporte = (reporte, reporteSeleccionado) => {
    switch (reporteSeleccionado) {
      case 1:
        const rows = reporte.map((elemento, index) => ({
          id: index + 1,
          utilidades: parseCurrency(elemento[0]),
          promUtilidadAuto: parseCurrency(elemento[1]),
          porcentajeUtilidades: parsePercentage(elemento[2]),
          cantidadAutos: elemento[3],
          vendedor: elemento[4],
        }));

        setColumns(columnsForReport(1));
        setRows(rows);
        break;
      case 2:
        const rowsTwo = reporte.map((elemento, index) => ({
          id: index + 1,
          marca: elemento[0],
          vendedor: elemento[1],
          cantidadAutosVendidos: elemento[2],
        }));

        setColumns(columnsForReport(2));
        setRows(rowsTwo);
        break;
      case 3:
<<<<<<< HEAD
        const rowsThree = reporte.map((elemento, index)=> (
          {
            id: index + 1,
            anio: elemento[2],
            mes: elemento[1],
            cantidadAutosVendidos: elemento[0]
          }
        ))
      
=======
        const rowsThree = reporte.map((elemento, index) => ({
          id: index + 1,
          anio: elemento[2],
          mes: elemento[1],
          cantidadAutosVendidos: elemento[0],
        }));

>>>>>>> desarrollo
        setColumns(columnsForReport(3));
        setRows(rowsThree);
        break;
      default:
        console.log("default");
        break;
    }
  };

  const cleanTable = () => {
    setColumns([{ field: "id", headerName: "ID", flex: 0.5 }]);
    setRows([]);
  };
  // renderizamos el componente
  return (
    <>
      <div style={styles.divReportes}>
        {loading ? (
          <DotLoader color="#1D1D1D" />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <ReportsForm
                vendedores={vendedoresParaReporte}
                handleConsultarReporte={handleConsultarReporte}
                cleanTable={cleanTable}
              />
              <DataTableGeneric columns={columns} rows={rows} />
            </Box>
          </>
        )}
      </div>
    </>
  );
};

export default ReportsContainer;
