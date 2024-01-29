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

const ProductForm = (props) => {
  const { setAlert, product, update } = props;
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
    console.log("images", images);
    dispatch(clearAlert());
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

  useEffect(() => {
    if (update && product) {
      if (categories && categories.length > 0 && product.idCategoria) {
        setValue("idCategoria", product.idCategoria._id);
      }
      if (especies && especies.length > 0 && product.idEspecie) {
        console.log("esp", categories);
        setValue("idEspecie", product.idEspecie._id);
      }
      if (product.image) {
        setProductImg(product.image);
      }
    }
  }, [categories, especies, product, update]);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("hola", e);
    if (update) {
      console.log(body);
      if (body.image) {
        body.image = images;
        console.log("****", body.image);
      } else {
        body.image = images;
        console.log("body", body);
      }
    } else {
      body.image = images;
      console.log(body);
      dispatch(clearAlert());
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
      console.log("img", file);
      dispatch(uploadImage(formData));
    } catch (error) {
      console.error("Error en la solicitud de carga de imagen:", error);
      // Puedes manejar el error de otra manera, como mostrar un mensaje al usuario
    }
  };

  useEffect(() => {
    if (update && products && products.length > 0) {
      setProductImg(products.image);
    }
    if (flag && statusCode === 200 && images) {
      setProductImg(images);
    }
  }, [images, update, products.image]);

  return (
    <Box className={globalStyles.box_main}>
      <Box className={styles.box_title}>
        <Typography variant="h5" color="initial">
          {update ? "Actualización de Producto" : "Registro de Productos"}
        </Typography>
        <Box>
          {productImg ? (
            // Mostrar la imagen si ya está presente en modo de actualización
            <div style={{ position: "relative" }}>
              <img
                src={productImg}
                alt="Product Image"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
              {/* Botón de editar sobre la imagen */}

              <IconButton
                onClick={() => {
                  console.log("Clic en el botón de la cámara");
                  document.getElementById("image-upload").click();
                }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#2196f3",
                  fontSize: "0.8rem", // Ajusta el tamaño de la fuente
                  padding: "4px", // Ajusta el relleno del botón
                }}
              >
                <PhotoCameraIcon
                  style={{
                    fontSize: "1rem",
                    color: "#ffffff",
                  }}
                />
              </IconButton>
              <Input
                sx={{}}
                {...register("image", {
                  validate: (value) => {
                    if (update) {
                      // En modo de actualización, el campo de archivos no es obligatorio
                      return true;
                    } else {
                      // En modo de creación, el campo de archivos es obligatorio
                      return value ? true : "Este campo es obligatorio";
                    }
                  },
                })}
                type="file"
                accept="image/*"
                id="image-upload"
                name="image"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          ) : (
            // Mostrar el botón de carga de imagen si no hay imagen en modo de actualización
            <>
              <Input
                sx={{}}
                {...register("image", {
                  validate: (value) => {
                    if (update) {
                      // En modo de actualización, el campo de archivos no es obligatorio
                      return true;
                    } else {
                      // En modo de creación, el campo de archivos es obligatorio
                      return value ? true : "Este campo es obligatorio";
                    }
                  },
                })}
                type="file"
                accept="image/*"
                id="image-upload"
                name="image"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
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
              </label>
            </>
          )}
        </Box>
      </Box>
      <Box className={styles.box_form}>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
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

          <FormControl className={styles.textField}>
            <InputLabel id="demo-simple-select-label">Especie</InputLabel>
            <Select
              {...register("idEspecie", { required: messages.req })}
              labelId="idEspecie"
              name="idEspecie"
              label="Especie"
              size="small"
              defaultValue={update ? product.idEspecie._id : ""}
            >
              {especies &&
                especies.length > 0 &&
                especies.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl className={styles.textField}>
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              {...register("idCategoria", { required: messages.req })}
              labelId="idCategoria"
              name="idCategoria"
              label="Especie"
              size="small"
              defaultValue={update ? product.idCategoria._id : ""}
            >
              {categories &&
                categories.length > 0 &&
                categories.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

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
      {productsLoading || (photoLoading && <Loader />)}
    </Box>
  );
};

export default ProductForm;
