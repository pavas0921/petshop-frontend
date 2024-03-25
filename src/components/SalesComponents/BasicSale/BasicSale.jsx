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
import { useForm, Controller } from "react-hook-form";
import { Table } from "../../Table";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductState,
  getProductsByCompany,
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
  AddProductQty,
  reduceProductQty,
  validateProductExists,
} from "../../../helpers/salesUtils";
import {
  selectVentasState,
  createVenta,
} from "../../../features/venta/ventaSlice";
import ToastAlert from "../../Alerts/";

const BasicSale = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalSaleValue, setTotalSaleValue] = useState(0);
  const [qty, setQty] = useState(0);
  const [statusButton, setStatusButton] = useState(true);
  const [errorStatus, setErrorStatus] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const tokenData = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = tokenData;
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idCliente: "",
      date: null,
      detalleVenta: null,
      payMethod: "",
      saleType: "",
      totalVenta: 0,
    },
  });
  const paymentMethods = [
    { label: "Efectivo", code: "Efectivo" },
    { label: "Bancolombia", code: "Bancolombia" },
    { label: "Nequi", code: "Nequi" },
    { label: "Datafono", code: "Datafono" },
  ];

  const saleTypes = [
    { label: "Contado", code: "contado" },
    { label: "Crédito", code: "credito" },
  ];
  const dispatch = useDispatch();
  const productResponse = useSelector(selectProductState);
  const { products, productsLoading, productHttpStatus, productStatus } =
    productResponse;

  const customerResponse = useSelector(selectCustomerState);
  const { customers } = customerResponse;

  const ventaResponse = useSelector(selectVentasState);
  const { message, httpStatus, loading, flag } = ventaResponse;

  const columns = [
    {
      field: "productImage",
      headerName: "Imagen",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box>
          <img
            style={{ width: "115px", height: "115px", padding: "15px" }}
            src={params.row.productImage}
            alt=""
          />
        </Box>
      ),
    },
    {
      field: "productName",
      headerName: "Producto",
      width: 230,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "unitPrice",
      headerName: "Precio Unitario",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "qty",
      headerName: "Cantidad",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleAdd(params.row)}>
            <AddIcon />
          </IconButton>
          {`${params.row.qty}`}
          <IconButton onClick={() => handleReduce(params.row)}>
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
      align: "center",
      headerAlign: "center",
    },
  ];

  useEffect(() => {
    dispatch(getProductsByCompany(companyId));
    dispatch(getCustomersByCompany(companyId));
  }, []);

  useEffect(() => {
    setTotalSaleValue(
      productDetails.reduce((counter, item) => {
        return counter + item.totalPrice;
      }, 0)
    );
  }, [productDetails]);

  const onSubmit = (body) => {
    body.detalleVenta = productDetails;
    body.totalVenta = totalSaleValue;
    body.companyId = companyId;
    dispatch(createVenta(body)).then(() => {
      // Llamar a resetForm después de que la venta sea exitosa
      resetForm();
    });
  };

  const resetForm = () => {
    reset({
      idCliente: "",
      date: null,
      detalleVenta: null,
      payMethod: "",
      saleType: "",
      totalVenta: 0,
    });
    setProductDetails([]);
    setTotalSaleValue(0);
    setErrorStatus(null);
    setQty(0);
    setSelectedProduct(null);
  };

  const handleAdd = (row) => {
    const updatedProductDetail = AddProductQty(productDetails, products, row);
    //const index = productDetails.findIndex((item) => item._id === row._id);
    if (updatedProductDetail.error && !updatedProductDetail.stock) {
      setErrorStatus({
        error: updatedProductDetail.error,
        message: updatedProductDetail.message,
      });
    }
    setProductDetails(updatedProductDetail.updatedProduct);
  };

  const handleReduce = (row) => {
    const updatedProductDetail = reduceProductQty(
      productDetails,
      products,
      row
    );
    if (updatedProductDetail.error && !updatedProductDetail.stock) {
      setErrorStatus({
        error: updatedProductDetail.error,
        message: updatedProductDetail.message,
      });
    }
    setProductDetails(updatedProductDetail.updatedProduct);
  };

  const handleClick = () => {
    if (!qty || !selectedProduct) {
      const error = {
        error: true,
        message: "Debe seleccionar un producto y cantidad",
      };
      setErrorStatus(error);
    } else {
      if (productDetails.length > 0) {
        const existProduct = validateProductExists(
          productDetails,
          selectedProduct,
          qty
        );
        if (existProduct.stock && existProduct.exist) {
          setProductDetails(existProduct.productDetails);
        } else {
          const validateStock = verifyStock(qty, selectedProduct);
          const { error, message, stock } = validateStock;
          if (validateStock.error && !validateStock.stock) {
            setErrorStatus(validateStock);
          } else {
            setProductDetails([
              ...productDetails,
              calculateProductDetails(qty, selectedProduct),
            ]);
          }
        }
      } else {
        const validateStock = verifyStock(qty, selectedProduct);
        const { error, message, stock } = validateStock;
        if (validateStock.error && !validateStock.stock) {
          setErrorStatus(validateStock);
        } else {
          setProductDetails([
            ...productDetails,
            calculateProductDetails(qty, selectedProduct),
          ]);
        }
      }
    }
    setSelectedProduct(null);
    setQty(0);
  };

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_container}>
        <Box className={styles.box_table}>
          {productDetails.length === 0 ? (
            <Box className={styles.table_title}>
              <Typography variant="h6" color="initial">
                <p>Aún no has agregado productos a esta venta</p>
              </Typography>
            </Box>
          ) : (
            <>
              <Box className={styles.table_title}>
                <Typography variant="h4" color="initial">
                  Detalle de la Venta
                </Typography>
              </Box>
              <Table
                columns={columns}
                rows={productDetails}
                rowHeigth={100}
                columnHeaderHeight={56}
              />

              <Typography variant="h6" color="initial" sx={{ marginTop: 2 }}>
                <p>Total Venta: ${totalSaleValue}</p>
              </Typography>
            </>
          )}
        </Box>

        <Box className={styles.box_form}>
          <Box className={styles.box_title}>
            <Typography variant="h4" component="h2">
              Formulario de Venta
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {customers && customers.length > 0 && (
              <FormControl className={styles.textField}>
                <Autocomplete
                  name="idCliente"
                  {...register("idCliente", {
                    required: "Debe seleccionar un metodo de pago",
                  })}
                  disablePortal
                  options={customers}
                  className={styles.select}
                  size="small"
                  onChange={(event, newValue) => {
                    setValue("idCliente", newValue?._id);
                  }}
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName} ${option.cedula}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Clientes"
                      id="idCliente"
                      InputLabelProps={{
                        htmlFor: "idCliente",
                      }}
                      helperText={errors.IdCliente && errors.IdCliente.message}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  } // Aseguramos la comparación correcta de valores // Aseguramos la comparación correcta de valores
                />
              </FormControl>
            )}

            <Box className={styles.textField}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="date"
                {...register("date", {
                  required: "Debe seleccionar una fecha para continuar",
                })}
                label="Seleccione una Fecha"
                size="small"
                type="date"
                className={styles.select}
                helperText={errors.date && errors.date.message}
              />
            </Box>

            {paymentMethods && paymentMethods.length > 0 && (
              <FormControl className={styles.textField}>
                <Autocomplete
                  name="payMethod"
                  {...register("payMethod", {
                    required: "Debe seleccionar un metodo de pago",
                  })}
                  disablePortal
                  options={paymentMethods}
                  className={styles.select}
                  size="small"
                  onChange={(event, newValue) => {
                    setValue("payMethod", newValue?.code || ""); // Establecer el valor del campo con setValue
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option?.code === value?.code
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Método de pago"
                      variant="outlined"
                      helperText={
                        errors.payMethod ? errors.payMethod.message : ""
                      }
                    />
                  )}
                />
              </FormControl>
            )}

            {saleTypes && saleTypes.length > 0 && (
              <FormControl className={styles.textField}>
                <Autocomplete
                  name="saleType"
                  {...register("saleType", {
                    required: "Debe seleccionar un tipo de venta",
                  })}
                  disablePortal
                  options={saleTypes}
                  size="small"
                  onChange={(event, newValue) => {
                    setValue("saleType", newValue?.code || ""); // Establecer el valor del campo con setValue
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option?.code === value?.code
                  }
                  renderInput={(params) => (
                    <TextField
                      className={styles.select}
                      {...params}
                      label="Tipo de Venta"
                      variant="outlined"
                      helperText={
                        errors.saleType ? errors.saleType.message : ""
                      }
                    />
                  )}
                />
              </FormControl>
            )}

            {products && products.length > 0 && (
              <FormControl className={styles.textField}>
                <Autocomplete
                  disablePortal
                  name="product"
                  value={selectedProduct}
                  options={products}
                  size="small"
                  getOptionLabel={(option) => option.productName}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  renderInput={(params) => (
                    <TextField
                      className={styles.select}
                      {...params}
                      label="Productos"
                    />
                  )}
                  onChange={(event, value) => {
                    setSelectedProduct(value);
                    setErrorStatus({});
                  }}
                />
              </FormControl>
            )}
            <Box className={styles.textField}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="qty"
                value={qty}
                label="Cantidad"
                size="small"
                type="number"
                className={styles.select}
                onChange={(event) => {
                  setQty(event.target.value);
                  setErrorStatus({});
                }}
              />
            </Box>

            <Box className={styles.box_buttons}>
              <Button variant="contained" onClick={handleClick}>
                Agregar
              </Button>
              <Button type="submit" variant="contained">
                Finalizar
              </Button>
            </Box>
            {errorStatus && errorStatus.message && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="p" color="initial">
                  {errorStatus.message}
                </Typography>
              </Box>
            )}
          </form>
        </Box>
      </Box>

      <Box className={styles.box_saleHeader}></Box>
      {(productsLoading || loading) && <Loader />}

      {!loading && httpStatus === 200 && flag && message && (
        <ToastAlert message={message} status="success" />
      )}
    </Box>
  );
};

export default BasicSale;
