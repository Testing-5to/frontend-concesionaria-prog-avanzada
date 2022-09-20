const getAllEmpleados = async () => {
  return [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Gomez",
      telefono: "3534456762",
      documento: "4032239",
      cuit: "2040322390",
      email: "juanGomez@gmail.com",
      fechaIngreso: "2020-05-17",
      fechaEgreso: "",
      salario: "85000",
      rol: 1,
      direccion: "Malvinas Argentinas",
      numero: "123",
      localidad: 1,
      provincia: 1,
      pais: 1,
    },
    {
      id: 2,
      nombre: "Ivan",
      apellido: "Perez",
      dni: "39523423",
      cuit: "20395234234",
      email: "IPerez@gmail.com",
      fechaIngreso: "2018-02-24",
      fechaEgreso: "",
      salario: "90000",
      rol: 1,
      direccion: "Pedro Goyena",
      numero: "234",
      localidad: 1,
      provincia: 1,
      pais: 1,
    },
    {
      id: 3,
      nombre: "Franco",
      apellido: "Pereyra",
      dni: "42135984",
      cuit: "20421359842",
      email: "PereyraF@gmail.com",
      fechaIngreso: "2021-08-04",
      fechaEgreso: "",
      salario: "83000",
      rol: 1,
      direccion: "Ramon Carrillo",
      calle: "532",
      localidad: 1,
      provincia: 1,
      pais: 1,
    },
    {
      id: 4,
      nombre: "Esteban",
      apellido: "Gonzales",
      dni: "40112944",
      cuit: "20401129447",
      email: "EstebanGonzales10@gmail.com",
      fechaIngreso: "2017-10-14",
      fechaEgreso: "",
      salario: "93000",
      rol: 1,
      direccion: "Militar Argentino",
      calle: "2432",
      localidad: 1,
      provincia: 1,
      pais: 1,
    },
    {
      id: 5,
      nombre: "Micaela",
      apellido: "Rodriguez",
      dni: "36938931",
      cuit: "27379389315",
      email: "micaR321@gmail.com",
      fechaIngreso: "2016-02-21",
      fechaEgreso: "",
      salario: "93000",
      rol: 1,
      direccion: "G. Moreno",
      numero: "433",
      localidad: 1,
      provincia: 1,
      pais: 1,
    },
  ];
};

const saveEmpleado = async (empleado) => {
  console.log(empleado);
};

const deleteEmpleado = async (id) => {
  console.log(id);
};

const updateEmpleado = async (empleado) => {
  console.log(empleado);
};

export { getAllEmpleados, saveEmpleado, deleteEmpleado, updateEmpleado };
