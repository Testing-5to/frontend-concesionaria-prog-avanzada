import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Reporte de ventas por mes",
    },
  },
};

export function HorizontalBar(reporteVentasPorMes) {
  const meses = {
    Enero: 1,
    Febrero: 2,
    Marzo: 3,
    Abril: 4,
    Mayo: 5,
    Junio: 6,
    Julio: 7,
    Agosto: 8,
    Septiembre: 9,
    Octubre: 10,
    Noviembre: 11,
    Diciembre: 12,
  };

  const colors = [
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
  ];

  console.log(reporteVentasPorMes);

  // get the months from the report

  // get the total years from the report, in reporteVentasPorMes.data[2], count the non repeated years
  const totalYears = [
    ...new Set(reporteVentasPorMes.data.map((mes) => mes[2])),
  ];

  const month = [
    ...new Set(
      reporteVentasPorMes.data.map((mes) => Object.keys(meses)[mes[1] - 1])
    ),
  ];

  // Create a dataset for each year
  const datasets = reporteVentasPorMes.data.reduce((acc, mes) => {
    const year = mes[2];
    const index = totalYears.indexOf(year);
    const color = colors[index];
    const label = `Año ${year}`;
    const data = acc[index] ? acc[index].data : [];
    data.push(mes[0]);
    acc[index] = {
      label,
      data,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
    };
    return acc;
  }, []);

  const data = {
    // Get the name by number of the key in Meses
    labels: month,
    datasets: datasets,
  };
  //
  return <Bar options={options} data={data} />;
}
