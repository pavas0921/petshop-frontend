import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styles from "./styles.module.scss";
import globalStyles from "../../../styles/global.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoryState,
  getCategory,
} from "../../../features/categoria/categoriaSlice";
import {
  selectEspecieState,
  getEspecies,
} from "../../../features/especie/especieSlice";
import {
  selectProductState,
  createProduct,
  clearAlert,
} from "../../../features/producto/productoSlice";
import { useForm } from "react-hook-form";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import { useNavigate } from "react-router-dom";
import ToastAlert from "../../Alerts/ToastAlert";
import Loader from "../../LoaderComponent/Loader";

const ProductForm = (props) => {
  const { setAlert, product, update } = props;
  const navigate = useNavigate();
  const isValidToken = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = isValidToken;
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: update ? product.productName : null,
      barCode: update ? product.barCode : null,
      image: update ? product.image : null,
      costPrice: update ? product.costPrice : null,
      salePrice: update ? product.salePrice : null,
      stock: update ? product.stock : null,
      idEspecie: update ? product.idEspecie : null,
      idCategoria: update ? product.idCategoria : null,
      idCompany: update ? product.idCompany : null,
      createdBy: update ? product.createdBy : null,
    },
  });

  useEffect(() => {
    console.log("*****", product);
  }, []);

  useEffect(() => {
    if (status) {
      setValue("idCompany", companyId);
      setValue("createdBy", userId);
    }
  }, [companyId, userId]);

  const dispatch = useDispatch();
  const categoryResponse = useSelector(selectCategoryState);
  const { categories, categoryLoading, httpStatus } = categoryResponse;

  const especiesResponse = useSelector(selectEspecieState);
  const { especies, especiesLoading } = especiesResponse;

  const productResponse = useSelector(selectProductState);
  const {
    productHttpStatus,
    productMessage,
    productStatus,
    products,
    productsLoading,
  } = productResponse;

  useEffect(() => {
    if (status) {
      dispatch(getCategory());
      dispatch(getEspecies());
    }
  }, []);

  useEffect(() => {
    setAlert({
      status: productStatus,
      message: productMessage,
    });
  }, [productMessage, productStatus]);

  const messages = {
    req: "Este campo es obligatorio",
  };

  const onSubmit = (body) => {
    dispatch(clearAlert());
    dispatch(createProduct(body));
  };

  return (
    <Box className={globalStyles.box_main}>
      <Box className={styles.box_title}>
        <Typography variant="h5" color="initial">
          {update ? "Actualización de Producto" : "Registro de Productos"}
        </Typography>
      </Box>
      <Box className={styles.box_form}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("productName", { required: messages.req })}
            label="Nombre del Producto"
            size="small"
            name="productName"
            className={styles.textField}
            helperText={errors.productName && errors.productName.message}
          />
          <TextField
            {...register("barCode", { required: messages.req })}
            label="SKU"
            size="small"
            name="barCode"
            className={styles.textField}
            helperText={errors.barCode && errors.barCode.message}
          />
          <TextField
            {...register("image", { required: messages.req })}
            label="Url Imagen"
            size="small"
            name="image"
            className={styles.textField}
            helperText={errors.image && errors.image.message}
          />
          <TextField
            {...register("costPrice", { required: messages.req })}
            label="Precio de Costo"
            size="small"
            name="costPrice"
            type="number"
            className={styles.textField}
            helperText={errors.costPrice && errors.costPrice.message}
          />
          <TextField
            {...register("salePrice", { required: messages.req })}
            label="Precio de Venta"
            size="small"
            name="salePrice"
            type="number"
            className={styles.textField}
            helperText={errors.salePrice && errors.salePrice.message}
          />
          <TextField
            {...register("stock", { required: messages.req })}
            label="Cantidad en Stock"
            size="small"
            type="number"
            name="stock"
            className={styles.textField}
            helperText={errors.stock && errors.stock.message}
          />
          <Autocomplete
            {...register("idCategoria", { required: messages.req })}
            size="small"
            name="idCategoria"
            options={categories}
            getOptionLabel={(option) => option.name} // Propiedad a mostrar en la lista desplegable
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(event, value) => {
              setValue("idCategoria", value?._id || null);

              // Utiliza setError para manejar el error de manera adecuada
              setError(
                "idCategoria",
                value
                  ? null
                  : {
                      type: "required",
                      message: "Este campo es obligatorio",
                    }
              );
            }}
            className={styles.textField}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categorias"
                helperText={errors.idCategoria && errors.idCategoria.message}
              />
            )}
            // Establecer el valor inicial en modo de actualización
            defaultValue={
              update
                ? categories.find(
                    (category) => category._id === product.idCategoria._id
                  ) || null
                : null
            }
          />

          <Autocomplete
            {...register("idEspecie", { required: messages.req })}
            size="small"
            idEspecie
            name="idEspecie"
            options={especies}
            getOptionLabel={(option) => option.name} // Propiedad a mostrar en la lista desplegable
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(event, value) => {
              setValue("idEspecie", value?._id || null);

              // Utiliza setError para manejar el error de manera adecuada
              setError(
                "idEspecie",
                value
                  ? null
                  : {
                      type: "required",
                      message: "Este campo es obligatorio",
                    }
              );
            }}
            className={styles.textField}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Especie"
                helperText={errors.idEspecie && errors.idEspecie.message}
              />
            )}
            // Establecer el valor inicial en modo de actualización
            defaultValue={
              update
                ? especies.find(
                    (especie) => especie._id === product.idEspecie._id
                  ) || null
                : null
            }
          />
          <Box className={styles.box_button}>
            <Button sx={{ marginTop: 3 }} variant="contained" type="submit">
              {update ? "Actualizar Producto" : "Agregar Producto"}
            </Button>
            {update && (
              <Button sx={{marginTop: 1}} variant="outlined" startIcon={<DeleteIcon />}>
                Eliminar Producto
              </Button>
            )}
          </Box>
        </form>
      </Box>
      {productsLoading && <Loader />}
    </Box>
  );
};

export default ProductForm;
