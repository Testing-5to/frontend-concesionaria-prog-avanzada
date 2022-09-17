import axios from "axios";

const url = "https://concesionaria-prog-avanzada.herokuapp.com/api/v1/"

const getAllMarcas = async () => {
    const response = await axios.get(url + "marca");
    const marcas = response.data.map(marca => (
        {
            id: marca.id,
            nombre: marca.nombre,
            pais: marca.pais.nombre
        }
    ));
    return marcas;
};

const saveMarca = async (marca) => {
    const marca_parsed = {nombre: marca.marca, pais: {id: marca.pais}};
    const response = await axios.post(url + "marca", marca_parsed);
    return response.data;
}

const deleteMarca = async (id) => {
    console.log(id);
    const response = await axios.delete(url + "marca/" + id);
    return response.data;
}

const updateMarca = async (marca) => {
    const marca_parsed = {nombre: marca.nombre, pais: {id: marca.pais}};
    const response = await axios.put(url + "marca/" + marca.id, marca_parsed);
    return response.data;
}

const getAllPaises = async () => {
    const response = await axios.get(url + "pais");
    return response.data;
    
}
export { getAllMarcas, saveMarca, deleteMarca, updateMarca, getAllPaises };
