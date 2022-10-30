const parseCurrency = (value) => {
    const dollarUS = Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        useGrouping: true,
    });
    return dollarUS.format(value);
};


const dateFormatter = (_date) => {
    // Create a date object from a date string
    const date = new Date(_date);

    // Get year, month, and day part from the date
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    const formattedDate = day + "-" + month + "-" + year;
    return formattedDate;
};

export { parseCurrency, dateFormatter };