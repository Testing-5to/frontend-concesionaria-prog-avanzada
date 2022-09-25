import axios from "axios";
import { url } from ".";

const getAllVehiculos = async () => {
  return [
    {
      id: 1,
      nombre: "JM3TB2BA8D0149763",
      year: 2006,
      kilometros: 52870,
      importado: false,
      imagen: "http://dummyimage.com/112x100.png/ff4444/ffffff",
      precioCompra: 3865660,
      precioVenta: 4001630,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 2,
      nombre: "2C3CDXEJ3CH586161",
      year: 2005,
      kilometros: 56311,
      importado: false,
      imagen: "http://dummyimage.com/120x100.png/ff4444/ffffff",
      precioCompra: 3811751,
      precioVenta: 4037556,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 3,
      nombre: "1FMEU3DE6AU332738",
      year: 1988,
      kilometros: 48404,
      importado: false,
      imagen: "http://dummyimage.com/149x100.png/5fa2dd/ffffff",
      precioCompra: 3853879,
      precioVenta: 4008562,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 4,
      nombre: "1J4PN2GK5BW820328",
      year: 2009,
      kilometros: 37222,
      importado: true,
      imagen: "http://dummyimage.com/225x100.png/dddddd/000000",
      precioCompra: 3618037,
      precioVenta: 4109031,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 5,
      nombre: "5FRYD4H67FB576863",
      year: 2005,
      kilometros: 37636,
      importado: true,
      imagen: "http://dummyimage.com/184x100.png/5fa2dd/ffffff",
      precioCompra: 3702860,
      precioVenta: 4037772,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 6,
      nombre: "KMHTC6AD2EU112691",
      year: 1996,
      kilometros: 41749,
      importado: true,
      imagen: "http://dummyimage.com/207x100.png/5fa2dd/ffffff",
      precioCompra: 3886897,
      precioVenta: 4043365,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 7,
      nombre: "1GKS1FFJ4BR453713",
      year: 1991,
      kilometros: 45597,
      importado: false,
      imagen: "http://dummyimage.com/114x100.png/ff4444/ffffff",
      precioCompra: 3959955,
      precioVenta: 4009635,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 8,
      nombre: "WAUDH74F57N635937",
      year: 2004,
      kilometros: 29278,
      importado: true,
      imagen: "http://dummyimage.com/205x100.png/dddddd/000000",
      precioCompra: 3640391,
      precioVenta: 4149281,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 9,
      nombre: "1G6DS5EV5A0856038",
      year: 1997,
      kilometros: 48185,
      importado: true,
      imagen: "http://dummyimage.com/235x100.png/dddddd/000000",
      precioCompra: 3532608,
      precioVenta: 4190086,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 10,
      nombre: "2T2BK1BA7DC953973",
      year: 2002,
      kilometros: 30382,
      importado: false,
      imagen: "http://dummyimage.com/210x100.png/dddddd/000000",
      precioCompra: 3900818,
      precioVenta: 4031947,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 11,
      nombre: "1N6AD0CU3DN999937",
      year: 2006,
      kilometros: 37194,
      importado: true,
      imagen: "http://dummyimage.com/112x100.png/dddddd/000000",
      precioCompra: 3502556,
      precioVenta: 4090581,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 12,
      nombre: "WBABS334X1J200895",
      year: 2010,
      kilometros: 48587,
      importado: true,
      imagen: "http://dummyimage.com/112x100.png/cc0000/ffffff",
      precioCompra: 3850412,
      precioVenta: 4093153,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 13,
      nombre: "1GYFC33259R740307",
      year: 2011,
      kilometros: 24326,
      importado: true,
      imagen: "http://dummyimage.com/237x100.png/5fa2dd/ffffff",
      precioCompra: 3523761,
      precioVenta: 4042088,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 14,
      nombre: "4USDU53588L306653",
      year: 1989,
      kilometros: 48055,
      importado: false,
      imagen: "http://dummyimage.com/110x100.png/ff4444/ffffff",
      precioCompra: 3680727,
      precioVenta: 4159677,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 15,
      nombre: "WDDHF0EB5EA198030",
      year: 1998,
      kilometros: 50436,
      importado: false,
      imagen: "http://dummyimage.com/145x100.png/ff4444/ffffff",
      precioCompra: 3635900,
      precioVenta: 4074367,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 16,
      nombre: "JTDJTUD34ED159644",
      year: 1995,
      kilometros: 51999,
      importado: false,
      imagen: "http://dummyimage.com/220x100.png/ff4444/ffffff",
      precioCompra: 3748950,
      precioVenta: 4153869,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 17,
      nombre: "WBAYF4C50FG521474",
      year: 1998,
      kilometros: 53815,
      importado: false,
      imagen: "http://dummyimage.com/161x100.png/dddddd/000000",
      precioCompra: 3898227,
      precioVenta: 4172825,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 18,
      nombre: "3N1AB7AP0FL115182",
      year: 2012,
      kilometros: 22483,
      importado: true,
      imagen: "http://dummyimage.com/134x100.png/cc0000/ffffff",
      precioCompra: 3562456,
      precioVenta: 4031126,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 19,
      nombre: "5N1AT2MK2EC356020",
      year: 2007,
      kilometros: 30346,
      importado: true,
      imagen: "http://dummyimage.com/137x100.png/cc0000/ffffff",
      precioCompra: 3701292,
      precioVenta: 4100173,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
    {
      id: 20,
      nombre: "2C3CCAEG3FH095503",
      year: 1995,
      kilometros: 55679,
      importado: true,
      imagen: "http://dummyimage.com/206x100.png/ff4444/ffffff",
      precioCompra: 3897093,
      precioVenta: 4034493,
      modelo: {
        id: 9,
        nombre: "Ranger",
        marca: {
          id: 3,
          nombre: "Ford",
          pais: {
            id: 3,
            nombre: "Uruguay",
            abreviatura: "UR",
          },
        },
        tipoVehiculo: {
          id: 13,
          nombre: "Auto",
        },
      },
    },
  ];
  //   const response = await axios.get(url + "vehiculo");
  //   return response.data;
};

const saveVehiculo = async (vehiculo) => {
  console.log(vehiculo);
  //     const vehiculo_parsed = {
  //         nombre: vehiculo.nombre,
  //         marca: {
  //           id: vehiculo.marca,
  //         },
  //         tipoVehiculo: {
  //           id: vehiculo.tipoVehiculo,
  //         },
  //       };
  //   console.log(vehiculo_parsed);
  //   const response = await axios.post(url + "vehiculo", vehiculo_parsed);
  //   return response.data;
};
const deleteVehiculo = async (id) => {
  console.log(id);
  //   const response = await axios.delete(url + "vehiculo/" + id);
  //   return response.data;
};

const updateVehiculo = async (vehiculo) => {
  console.log(vehiculo.id);
  //   const vehiculo_parsed = {
  //     nombre: vehiculo.nombre,
  //     marca: {
  //       id: vehiculo.marca,
  //     },
  //     tipoVehiculo: {
  //       id: vehiculo.tipoVehiculo,
  //     },
  //   };
  //   console.log(vehiculo_parsed);
  //   const response = await axios.put(url + "vehiculo/" + vehiculo.id, vehiculo_parsed);
  //   return response.data;
};

export { getAllVehiculos, saveVehiculo, deleteVehiculo, updateVehiculo };
