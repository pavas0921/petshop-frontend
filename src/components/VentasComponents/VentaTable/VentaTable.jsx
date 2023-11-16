import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import styles from "./ventaTable.module.scss";

const VentaTable = (props) => {
  const { rows } = props;

  useEffect(() => {
    console.log(rows)
  }, [rows]);


  const columns = [
    { field: "id", headerName: "Item", width: 50 },

    {
      field: "producto",
      headerName: "Producto",
      width: 400,
      editable: false,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      type: "number",
      width: 100,
      editable: false,
    },

    {
      field: "precioUnitario",
      headerName: "Precio Unitario",
      width: 160,
      editable: false,
    },
    {
      field: "precioTotal",
      headerName: "Precio Total",
      width: 160,
      editable: false,
    },
  ];

  return (
    <Box className={styles.main_box}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default VentaTable;
