import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  selectProductoState,
} from "../../../../features/producto/productoSlice";
import { Loader } from "../../../LoaderComponent";
import styles from "./AllProducts.module.scss";

const AllProducts = () => {
  const dispatch = useDispatch();
  const productsResponse = useSelector(selectProductoState);
  const { productos, loading } = productsResponse;
  const { computedData, status } = productos;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loading)
  }, [loading]);

  const columns = [
    {
      field: "nombreProducto",
      headerName: "Producto",
      width: 350,
      editable: false,
    },
    {
      field: "nombreEspecie",
      headerName: "Especie",
      width: 220,
      editable: false,
    },
    {
      field: "nombreCategoria",
      headerName: "Categoria",
      width: 220,
      editable: false,
    },

    {
      field: "presentaciones",
      headerName: "Presentaciones",
      width: 150,

      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() =>
              handleDetalleProducto(`/productos/${params.row.idProducto}`)
            }
          >
            <VisibilityIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDetalleProducto = (path) => {
    console.log("path", path);
    navigate(path);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    console.log("response", computedData);
  }, [computedData]);

  return (
    <Box className={styles.box_main}>
      {loading && (
        <Loader />
      )}
      {computedData && computedData.length && (
        <DataGrid
          rows={computedData}
          columns={columns}
          getRowId={(computedData) => computedData.idProducto}
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
      )}
    </Box>
  );
};

export default AllProducts;
