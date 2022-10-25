import { saveCliente } from "./Services";
import axios from "axios";
import { url } from "./Services";
const json = require("./data.json");

const guardarDatos = async () => {
  for (let i = 0; i < json.length; i++) {
    const cliente = json[i];
    const response = await axios.post(url + "cliente", cliente);
    console.log(response.data);
  }
};

export default guardarDatos;
