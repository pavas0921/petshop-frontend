import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetalleByProductId,
  selectDetalleProductoState,
} from "../../../features/detalleProducto/detalleProductoSlice";
import { useParams } from "react-router-dom";
import styles from "./tablaDetalleProducto.module.scss";

const TablaDetalleProducto = () => {
  const dispatch = useDispatch();
  const productDetailsResponse = useSelector(selectDetalleProductoState);
  const { detalleProductos } = productDetailsResponse;
  const { computedData } = detalleProductos;
  const { idProducto } = useParams();

  useEffect(() => {
    if (idProducto) {
      dispatch(getDetalleByProductId(idProducto));
    }
  }, []);

  useEffect(() => {
    console.log("***", computedData);
  }, [productDetailsResponse, idProducto]);

  const columns = [
    {
      field: "nombreProducto",
      headerName: "Producto",
      width: 200,
      editable: false,
    },
    {
      field: "presentacion",
      headerName: "Presentacion",
      width: 200,
      editable: false,
    },
    {
      field: "margenGanancia",
      headerName: "Margen Ganancia",
      width: 200,
      editable: false,
    },
    {
      field: "precioCosto",
      headerName: "Precio Costo",
      width: 100,
      editable: false,
    },
    {
      field: "precioVenta",
      headerName: "Precio Venta",
      width: 100,
      editable: false,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      editable: false,
    },

    {
      renderCell: (params) => (
        <Box>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box className={styles.box_main}>
      {computedData && computedData.length > 0 && (
        <div className={styles.div_title}>
          <h4>{computedData[0].nombreProducto}</h4>
        </div>
      )}
      {computedData && computedData.length > 0 && (
        <DataGrid
          rows={computedData}
          columns={columns}
          getRowId={(computedData) => computedData.idDetalle}
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
          className={styles.datagrid}
        />
      )}
    </Box>
  );
};

export default TablaDetalleProducto;
