import axios from "axios";
import { url } from ".";

// abmc para venta, usamos axios para hacer las llamadas a la api
const getAllVentas = async () => {
  const response = await axios.get(url + "venta");
  return response.data;
};

const saveVenta = async (venta) => {

  const venta_parsed = {
    "cantidadVehiculos": venta.cantidad,
    "precioUnitario": venta.precioUnitario,
    "impuesto": {
      "id": venta.impuesto
    },
    "vehiculo": {
      "id": venta.vehiculo
    },
    "vendedor": {
      "id": venta.vendedor
    },
    "cliente": {
      "id": venta.cliente
    }
  
  }
  const response = await axios.post(url + "venta", venta_parsed);
  return response.data;
};


export { getAllVentas, saveVenta };
