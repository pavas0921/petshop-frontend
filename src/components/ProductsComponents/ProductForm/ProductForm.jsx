import React, { useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  disableProductById,
} from "../../../features/producto/productoSlice";

import {
  uploadImage,
  selectImageState,
  clearImage,
} from "../../../features/cloudinary/cloudinarySlice";
import { useForm } from "react-hook-form";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import { useNavigate } from "react-router-dom";
import ToastAlert from "../../Alerts/ToastAlert";
import Loader from "../../LoaderComponent/Loader";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const ProductForm = ({ setAlert, product, update }) => {
  const [productImg, setProductImg] = useState();
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
      //idEspecie: update ? product.idEspecie._id : null,
      //idCategoria: update ? product.idCategoria._id : null,
      idCompany: update ? product.idCompany : null,
      createdBy: update ? product.createdBy : null,
    },
  });
  const cloudName = "dinxdqo76";

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

  const ImageResponse = useSelector(selectImageState);
  const { flag, statusCode, images, photoLoading } = ImageResponse;

  useEffect(() => {
    dispatch(clearAlert());
    dispatch(clearImage());
    if (especies && especies.length === 0) {
      dispatch(getEspecies());
    }
    if (categories && categories.length === 0) {
      dispatch(getCategory());
    }
  }, []);

  useEffect(() => {
    setAlert({
      status: productStatus,
      message: productMessage,
    });
  }, [productMessage, productStatus]);

  useEffect(() => {
    if (images && !photoLoading) {
      setProductImg(images[0]);
      setValue("image", images[0]);
    }
  }, [images]);

  const messages = {
    req: "Este campo es obligatorio",
  };

  const onSubmit = (body) => {
    if (update) {
      body.image = productImg;
      console.log(body);
    } else {
      dispatch(clearAlert());
      console.log("body", body)
      dispatch(createProduct(body));
    }
  };

  const handleDisableProduct = () => {
    if (product.status) {
      const body = { status: false };
      dispatch(disableProductById({ body: body, _id: product._id }));
    } else {
      const body = { status: true };
      dispatch(disableProductById({ status: body, _id: product._id }));
    }
  };

  const handleImageChange = async (event) => {
    event.preventDefault();
    try {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "m4obnmhx");
      dispatch(uploadImage(formData));
    } catch (error) {
      console.error("Error en la solicitu de carga de imagen:", error);
      // Puedes manejar el error de otra manera, como mostrar un mensaje al usuario
    }
  };

  useEffect(() => {
    if (update && product && product.image) {
      setProductImg(product.image);
      setValue("image", productImg);
    }
    if (flag && statusCode === 200 && images) {
      console.log("img", images[0])
      setProductImg(images[0]);
      setValue("image", images[0]);
    }
  }, [images, update, products.image]);

  return (
    <Box className={globalStyles.box_main}>
      <Box className={styles.box_title}>
        <Typography variant="h5" color="initial">
          {update ? "Actualización de Producto" : "Registro de Productos"}
        </Typography>
        {productImg && (
          <div style={{ position: "relative" }}>
            <img
              src={productImg}
              alt="Product Image"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
      </Box>
      <Box className={styles.box_form}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              spaceAround: "center",
            }}
          >
            <Input
              sx={{}}
              {...register("image")}
              type="file"
              accept="image/*"
              id="image-upload"
              name="image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              htmlFor="image-upload"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="large"
                style={{ backgroundColor: "#2196f3" }} // Fondo azul
                sx={{ "& .MuiSvgIcon-root": { color: "#ffffff" } }} // Icono blanco
              >
                <PhotoCameraIcon />
              </IconButton>
              <FormHelperText error={Boolean(errors.image)}>
                {errors.image && errors.image.message}
              </FormHelperText>
            </label>
          </Box>
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

          {especies && especies.length > 0 && (
            <FormControl
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InputLabel
                sx={{ marginTop: "7px", marginLeft: "27px" }}
                id="demo-simple-select-label"
              >
                Especie
              </InputLabel>
              <Select
                {...register("idEspecie", { required: messages.req })}
                labelId="idEspecie"
                name="idEspecie"
                label="Especie"
                size="small"
                defaultValue={update && product.idEspecie._id}
                className={styles.textField}
              >
                {especies &&
                  especies.length > 0 &&
                  especies.map((item, index) => (
                    <MenuItem key={index} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText
                sx={{ justifyContent: "flex-start" }}
                error={Boolean(errors.image)}
              >
                {errors.idEspecie && errors.idEspecie.message}
              </FormHelperText>
            </FormControl>
          )}
          {categories && categories.length > 0 && (
            <FormControl
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InputLabel
                sx={{ marginTop: "7px", marginLeft: "27px" }}
                id="idCategoria"
              >
                Categoria
              </InputLabel>
              <Select
                className={styles.textField}
                {...register("idCategoria", { required: messages.req })}
                labelId="idCategoria"
                name="idCategoria"
                label="Categoria"
                size="small"
                defaultValue={update && product.idCategoria._id}
              >
                {categories &&
                  categories.length > 0 &&
                  categories.map((item, index) => (
                    <MenuItem key={index} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText error={Boolean(errors.image)}>
                {errors.idCategoria && errors.idCategoria.message}
              </FormHelperText>
            </FormControl>
          )}

          <Box className={styles.box_button}>
            <Button sx={{ marginTop: 3 }} variant="contained" type="submit">
              {update ? "Actualizar Producto" : "Agregar Producto"}
            </Button>
            {update && (
              <Button
                sx={{ marginTop: 1 }}
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleDisableProduct}
              >
                Desactivar Producto
              </Button>
            )}
          </Box>
        </form>
      </Box>
      {(categoryLoading || especiesLoading || photoLoading || productsLoading) && <Loader />}
    </Box>
  );
};

export default ProductForm;
