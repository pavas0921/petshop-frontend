import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./AllProducts.module.scss";
import {
  getProducts,
  selectProductoState,
} from "../../../../features/producto/productoSlice";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const productsResponse = useSelector(selectProductoState);
  const { productos, loading } = productsResponse;
  const { computedData, status } = productos;
  const navigate = useNavigate();

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
      {computedData && computedData.length && (
        <DataGrid
          rows={computedData}
          columns={columns}
          getRowId={(computedData) => computedData.idProducto}
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
      )}
    </Box>
  );
};

export default AllProducts;
