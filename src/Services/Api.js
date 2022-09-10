import axios from "axios";

const url = "http://localhost:9192/api/"

const getAllMarcas = async () => {
    const response = await axios.get(url + "marca");
    return response.data;
};

const saveMarca = async (marca) => {
    const marca_parsed = {nombre: marca.marca, pais: marca.pais};
    const response = await axios.post(url + "marca", marca_parsed);
    return response.data;
}

const deleteMarca = async (id) => {
    console.log(id);
    const response = await axios.delete(url + "marca/" + id);
    return response.data;
}

const updateMarca = async (marca) => {
    const marca_parsed = {nombre: marca.nombre, pais: marca.pais};
    const response = await axios.put(url + "marca/" + marca.id, marca_parsed);
    return response.data;
}
export { getAllMarcas, saveMarca, deleteMarca, updateMarca };
