import React, { useEffect } from "react";
import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import { Table } from "../../Table";
import { useSalesByDate } from "../../../customHooks";

const SalesTable = () => {
  const ventasResponse = useSalesByDate();
  const { httpStatus, ventas, loading } = ventasResponse;

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
          rows={ventas}
          loading={loading}
          rowHeight={56}
          columnHeaderHeight={56}
          title={"Listado de Ventas"}
        />
      </Box>
    </Box>
  );
};

export default SalesTable;
