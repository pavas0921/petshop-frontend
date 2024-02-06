import React, { useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Table } from "../../Table";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductState,
  getProducts,
} from "../../../features/producto/productoSlice";
import Loader from "../../LoaderComponent/Loader";
import { CardForm } from "../../CardForm";

const columns = [
  { field: "productName", headerName: "Producto", width: 200 },
  { field: "unitPrice", headerName: "Precio Unitario", width: 130 },
  {
    field: "qty",
    headerName: "Cantidad",
    width: 180,
    align: "center",
    renderCell: (params) => (
      <Box>
        <IconButton>
          <AddIcon />
        </IconButton>
        {`${params.row.qty}`}
        <IconButton>
          <RemoveIcon />
        </IconButton>
      </Box>
    ),
  },
  {
    field: "totalPrice",
    headerName: "Precio Total",
    type: "number",
    width: 90,
  },
];

const BasicSale = () => {
  const dispatch = useDispatch();
  const productResponse = useSelector(selectProductState);
  const { products, productsLoading, productHttpStatus, productStatus } =
    productResponse;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleProductChange = (event, newValue) => {
    console.log(newValue); // Guardamos el valor seleccionado en el estado
  };

  return (
    <Box className={styles.box_main}>
      <CardForm>
        <Box className={styles.box_title}>
          <Typography variant="h4" component="h2">
            Formulario de Venta
          </Typography>
        </Box>
        <Box className={styles.box_saleHeader}>
          <TextField
            name="Cliente"
            label="Seleccione un Cliente"
            size="small"
            className={styles.textField}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            name="Cliente"
            label="Seleccione una Fecha"
            size="small"
            type="date"
            className={styles.textField}
          />
        </Box>
        <Box className={styles.box_saleHeader}>
          {products && products.length > 0 && (
            <FormControl className={styles.textField}>
              <Autocomplete
                disablePortal
                id="idProduct"
                options={products}
                sx={{ width: 300 }}
                size="small"
                getOptionLabel={(option) => option.productName}
                renderInput={(params) => (
                  <TextField {...params} label="Productos" />
                )}
                onChange={handleProductChange}
              />
            </FormControl>
          )}
        </Box>
      </CardForm>

      <Box className={styles.box_saleHeader}></Box>
      {productsLoading && <Loader />}
    </Box>
  );
};

export default BasicSale;
