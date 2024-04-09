import { startOfWeek, endOfWeek } from 'date-fns';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const formatVentasDates = (ventas) => {
  return ventas.map((venta) => ({
    ...venta,
    date: formatDate(venta.date),
  }));
};

//Esta funcion obtiene el numero del primer día de una semana y el numero del ultimo día de una semana. 
export const getDatesRange = () => {
  // Obtener la fecha de hoy
  const today = new Date();

  // Obtener el primer día de la semana
  const firstDayOfWeek = startOfWeek(today);

  // Obtener el último día de la semana
  const lastDayOfWeek = endOfWeek(today);

  const firstDayFormated = formatDateIsoToString(firstDayOfWeek);
  const lastDayFormated = formatDateIsoToString(lastDayOfWeek);

  return {
    firstDay: firstDayFormated,
    lastDay: lastDayFormated,
  };
};

export const formatDateIsoToString = (dateToFormat) => {
  const formatedDate = new Date(dateToFormat).toISOString().split("T")[0];
  return formatedDate;
};
