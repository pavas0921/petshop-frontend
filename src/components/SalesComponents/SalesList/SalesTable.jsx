import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVentasState,
  getVentasByDateRange,
} from "../../../features/venta/ventaSlice";
import styles from "./styles.module.scss";
import { Table } from "../../Table";

const SalesTable = () => {
  const dispatch = useDispatch();
  const ventasResponse = useSelector(selectVentasState);
  const { httpStatus, ventas, loading } = ventasResponse;

  useEffect(() => {
    dispatch(
      getVentasByDateRange({
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        idCompany: "65f5ee60ce0ee41a81558837",
      })
    );
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

   // Convertir las fechas en el array ventas al formato deseado
   const ventasFormateadas = ventas.map((venta) => ({
    ...venta,
    date: formatDate(venta.date),
  }));

  const columns = [
    { field: "date", headerName: "Fecha", width: 300 },
    { field: "payMethod", headerName: "Metodo de pago", width: 300 },
    { field: "saleType", headerName: "Estado del pago", width: 300 },
    { field: "totalVenta", headerName: "Total Venta", width: 300 },

    // {
    //   field: "actions",
    //   headerName: "Acciones",
    //   width: 80,
    //   renderCell: (params) => (
    //     <Box>
    //       <IconButton>
    //         <VisibilityIcon />
    //       </IconButton>
    //       <IconButton>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Box>
    //   ),
    // },
  ];

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_table}>
        <Table
          columns={columns}
          rows={ventasFormateadas}
          loading={loading}
          rowHeigth={56}
          columnHeaderHeight={56}
          title={"Listado de Ventas"}
        />
      </Box>
    </Box>
  );
};

export default SalesTable;
