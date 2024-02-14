import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Table } from "../../Table";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductState,
  getProducts,
} from "../../../features/producto/productoSlice";
import {
  selectCustomerState,
  getCustomersByCompany,
} from "../../../features/customer/customerSlice";
import Loader from "../../LoaderComponent/Loader";
import { CardForm } from "../../CardForm";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import {
  verifyStock,
  calculateProductDetails,
  AddProductQty
} from "../../../helpers/salesUtils";



const BasicSale = () => {
  const [selectedProduct, setSelectedProduct] = useState();
  const [qty, setQty] = useState(0);
  const [errorStatus, setErrorStatus] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const tokenData = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = tokenData;
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: null,
      customerId: null,
      productsDetails: null,
    },
  });
  const dispatch = useDispatch();
  const productResponse = useSelector(selectProductState);
  const { products, productsLoading, productHttpStatus, productStatus } =
    productResponse;

  const customerResponse = useSelector(selectCustomerState);
  const { customers } = customerResponse;
  const columns = [
    {
      field: "productImage",
      headerName: "Imagen",
      width: 140,
      align: "center",
      renderCell: (params) => (
        <Box>
          <img style={{ width: '115.px', height: '115px',padding:'10px' }} src={params.row.productImage} alt="" />
        </Box>
      ),
    },
    { field: "productName", headerName: "Producto", width: 200 },
    { field: "unitPrice", headerName: "Precio Unitario", width: 130 },
    {
      field: "qty",
      headerName: "Cantidad",
      width: 180,
      align: "center",
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleAdd(params.row)}>
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

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCustomersByCompany(companyId));
  }, []);

  const onSubmit = (body) => {
    console.log("body:", body);
  };

  const handleAdd = (row) =>{
    const updatedProductDetail = AddProductQty(productDetails, products, row)
    const index = productDetails.findIndex(item => item._id === row._id)
    console.log(updatedProductDetail)
    if(updatedProductDetail.error && !updatedProductDetail.stock){
      setErrorStatus({
        error: updatedProductDetail.error,
        message: updatedProductDetail.message
      });
    }
    setProductDetails(updatedProductDetail.updatedProduct)
    
  }

  const handleClick = () => {
    const validateStock = verifyStock(qty, selectedProduct);
    const { error, message, stock } = validateStock;
    console.log(validateStock);
    if (validateStock.error && !validateStock.stock) {
      setErrorStatus(validateStock);
    } else {
      setProductDetails([...productDetails, calculateProductDetails(qty, selectedProduct)]);
    }
  };

  return (
    <Box className={styles.box_main}>
      <CardForm>
        <Box className={styles.box_title}>
          <Typography variant="h4" component="h2">
            Formulario de Venta
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.box_saleHeader}>
            {customers && customers.length > 0 && (
              <FormControl className={styles.textField}>
                <Autocomplete
                  disablePortal
                  name="customerId"
                  options={customers}
                  sx={{ width: 300 }}
                  size="small"
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName} ${option.cedula}`
                  }
                  renderInput={({ InputLabelProps, ...params }) => (
                    <TextField
                      {...params}
                      label="Seleccione un cliente"
                      id="customerId"
                      InputLabelProps={{
                        ...InputLabelProps,
                        htmlFor: "customerId",
                      }}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(event, value) => {
                    setValue("customerId", value ? value._id : null);
                  }}
                />
              </FormControl>
            )}

            <TextField
              InputLabelProps={{ shrink: true }}
              name="date"
              {...register("date")}
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
                  name="product"
                  options={products}
                  sx={{ width: 300 }}
                  size="small"
                  getOptionLabel={(option) => option.productName}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Productos" />
                  )}
                  onChange={(event, value) => {
                    setSelectedProduct(value);
                  }}
                />
              </FormControl>
            )}
            <TextField
              InputLabelProps={{ shrink: true }}
              name="qty"
              label="Cantidad"
              size="small"
              type="number"
              className={styles.textField}
              onChange={(event) => {
                setQty(event.target.value);
              }}
            />
          </Box>
          <Button type="submit" variant="contained">
            Enviar
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Agregar
          </Button>
        </form>
      </CardForm>

      <CardForm>
        <Table
          columns={columns}
          rows={productDetails}
          rowHeigth={100}
          columnHeaderHeight={56}
          title={"Canasta"}
        />
      </CardForm>

      <Box className={styles.box_saleHeader}></Box>
      {productsLoading && <Loader />}
    </Box>
  );
};

export default BasicSale;
