export const precioVenta = (precioCosto, porcentajeUtilidad) => {
  console.log("precioCosto: ", precioCosto);
  const precioVenta = (precioCosto * porcentajeUtilidad) / 100;
  return precioVenta;
};
