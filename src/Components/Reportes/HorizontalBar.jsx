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

  const data = {
    // Get the name by number of the key in Meses
    labels: reporteVentasPorMes.data.map(
      (mes) => Object.keys(meses)[mes[1] - 1]
    ),
    datasets: reporteVentasPorMes.data.map((data) => {
      return {
        label: data[2],
        data: [data[0]],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      };
    }),
  };
  //
  return <Bar options={options} data={data} />;
}
