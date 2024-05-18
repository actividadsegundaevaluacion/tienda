const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });
  
  export const toCurrency = (value: number) => formatter.format(value);
