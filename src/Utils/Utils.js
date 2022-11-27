const parseCurrency = (value) => {
  const dollarUS = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    useGrouping: true,
  });
  return dollarUS.format(value);
};

const parsePercentage = (value) => {
    const parsed = value.toFixed(2).toString() + "%";
    return parsed;
};

const dateFormatter = (_date) => {
  // Create a date object from a date string
  const date = new Date(_date);

  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const formattedDate =
    day + "-" + month + "-" + year + " " + hours + ":" + minutes;
  return formattedDate;
};

const columnsForReport = (reportNumber) => {
  switch (reportNumber) {
    case 1:
      return [
        { field: "id", headerName: "ID", flex: 0 },
        { field: "utilidades", headerName: "Utilidades", flex: 1 },
        {
          field: "promUtilidadAuto",
          headerName: "Promedio utilidad por auto",
          flex: 1.2,
        },
        {
          field: "porcentajeUtilidades",
          headerName: "Porcentaje utilidades",
          flex: 1.2,
        },
        { field: "cantidadAutos", headerName: "Cantidad de autos", flex: 1.2 },
        { field: "vendedor", headerName: "Vendedor", flex: 1.2 },
      ];
    case 2:
      return [
        { field: "id", headerName: "ID", flex: 0 },
        { field: "marca", headerName: "Marca", flex: 1 },
        { field: "vendedor", headerName: "Vendedor", flex: 1 },
        {
          field: "cantidadAutosVendidos",
          headerName: "Cantidad de autos vendidos",
          flex: 1.2,
        },
      ];
    case 3:
      return [
        { field: "id", headerName: "ID", flex: 0 },
        { field: "anio", headerName: "Año", flex: 1 },
        { field: "mes", headerName: "Mes", flex: 1 },
        {
          field: "cantidadAutosVendidos",
          headerName: "Cantidad de autos vendidos",
          flex: 1.2,
        },
      ];
    default:
      return [{ field: "id", headerName: "ID", flex: 0 }];
  }
};
export { parseCurrency, dateFormatter, columnsForReport, parsePercentage };
