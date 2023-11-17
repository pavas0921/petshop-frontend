export const calcularTotal = (rows) => {
    const total = rows.reduce(
        (acumulador, rows) => acumulador + rows.precioTotal,
        0
      );
      return total;
}

