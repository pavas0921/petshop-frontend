import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetalleByProductId,
  selectDetalleProductoState,
} from "../../../features/detalleProducto/detalleProductoSlice";
import { Loader } from "../../LoaderComponent";
import styles from "./tablaDetalleProducto.module.scss";

const TablaDetalleProducto = () => {
  const dispatch = useDispatch();
  const productDetailsResponse = useSelector(selectDetalleProductoState);
  const { detalleProductos, loading } = productDetailsResponse;
  const { computedData } = detalleProductos;
  const { idProducto } = useParams();

  useEffect(() => {
    if (idProducto) {
      dispatch(getDetalleByProductId(idProducto));
    }
  }, []);

  useEffect(() => {
    console.log("***", productDetailsResponse);
  }, [productDetailsResponse]);

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
      {loading && (<Loader />)}
      {computedData && computedData.length > 0 && (
        <div className={styles.div_title}>
          <h4>{computedData[0].nombreProducto}</h4>
        </div>
      )}
      {computedData && computedData.length > 0 && (
        <div className={styles.div_datagrid}>
          <DataGrid
            rows={computedData}
            columns={columns}
            getRowId={(computedData) => computedData.idDetalle}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      )}
    </Box>
  );
};

export default TablaDetalleProducto;
