import axios from "axios";
import { url } from ".";

// abmc para provincias, usamos axios para hacer las llamadas a la api
const getReporteUtilidades = async (data) => {
  if (data.vendedores.length > 0) {
    const vendedores = data.vendedores.join(",");
    const urlReporteUtilidades = url + "reportes/utilidades";
    const response = await axios.get(urlReporteUtilidades, {
      params: {
        fechaInicio: data.fechaDesde,
        fechaFin: data.fechaHasta,
        vendedores: vendedores,
      },
    });
    return response.data;
  } else {
    const urlReporteUtilidades = url + "reportes/utilidades";
    const response = await axios.get(urlReporteUtilidades, {
      params: {
        fechaInicio: data.fechaDesde,
        fechaFin: data.fechaHasta,
      },
    });
    return response.data;
  }
};

const getReporteAutosVendidos = async (data) => {
  if (data.vendedores.length > 0) {
    const vendedores = data.vendedores.join(",");
    const urlReporteAutosVendidos = url + "reportes/autosVendidos";
    const response = await axios.get(urlReporteAutosVendidos, {
      params: {
        fechaInicio: data.fechaDesde,
        fechaFin: data.fechaHasta,
        vendedores: vendedores,
      },
    });
    return response.data;
  } else {
    const urlReporteAutosVendidos = url + "reportes/autosVendidos";
    const response = await axios.get(urlReporteAutosVendidos, {
      params: {
        fechaInicio: data.fechaDesde,
        fechaFin: data.fechaHasta,
      },
    });
    return response.data;
  }
};

const getReporteVentasPorMes = async (data) => {
  const urlReporteVentasPorMes = url + "reportes/ventasPorMes";
  // we have tu cut only the year from string, the given format is dd-mm-yyyy
  const anioDesde = data.fechaDesde.substring(6, 10);
  const anioHasta = data.fechaHasta.substring(6, 10);
  const response = await axios.get(urlReporteVentasPorMes, {
    params: {
      fechaInicio: anioDesde,
      fechaFin: anioHasta,
    },
  });
  return response.data;
};

export {
  getReporteUtilidades,
  getReporteAutosVendidos,
  getReporteVentasPorMes,
};
