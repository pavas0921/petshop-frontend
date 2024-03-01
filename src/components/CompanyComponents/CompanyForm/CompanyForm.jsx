import React, {useEffect, useState} from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoIcon from "@mui/icons-material/Photo";
import {
  uploadImage,
  selectImageState,
  clearImage,
} from "../../../features/cloudinary/cloudinarySlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

function CompanyForm() {

  const dispatch = useDispatch();
  const [productImg, setProductImg] = useState();
  const imgResponse = useSelector(selectImageState);
  const { flag, statusCode, images, photoLoading } = imgResponse;

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
    dispatch(clearImage());
  }, []);

  useEffect(() => {
    if (images && !photoLoading) {
      setProductImg(images[0]);
      //setValue("image", images[0]);
    }
  }, [images]);

  useEffect(() => {
    if (flag && statusCode === 200 && images) {
      setProductImg(images[0]);
      //setValue("image", images[0]);
    }
  }, [images]);

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_title}>
        <Typography variant="h5" color="initial">
          Registro de Compañías
        </Typography>
      </Box>
      {productImg && (
          <div style={{ position: "relative" }}>
            <img
              src={productImg}
              alt="Product Image"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "20px"
              }}
            />
          </div>
        )}
      <Box className={styles.box_form}>
        <form className={styles.form}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              spaceAround: "center",
              marginBottom: 2,
            }}
          >
            <Input
              sx={{}}
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
                <PhotoIcon />
              </IconButton>
            </label>
          </Box>

          <TextField
            name="company"
            size="small"
            label="Nombre del Comercio"
            className={styles.textField_nombreComercio}
          />

          <FormControl className={styles.formControl}>
            <InputLabel id="idCategoria" sx={{ marginTop: -1 }}>
              Categoría del Comercio
            </InputLabel>
            <Select
              labelId="idCategoria"
              name="idCategoria"
              label="Categoria"
              size="small"
            ></Select>
          </FormControl>

          <TextField
            name="responsibleName"
            size="small"
            label="Nombre del Responsable"
            className={styles.textField_nombreComercio}
          />

          <TextField
            name="responsibleEmail"
            size="small"
            label="Email"
            className={styles.textField_nombreComercio}
          />

          <Box className={styles.box_inputs}>
            <TextField
              name="responsibleId"
              size="small"
              label="Id del Responsable"
              className={styles.textField}
            />

            <TextField
              name="city"
              size="small"
              label="Ciudad"
              className={styles.textField}
            />
          </Box>

          <Box className={styles.box_inputs}>
            <TextField
              name="responsiblePhone"
              size="small"
              label="Celular"
              className={styles.textField}
            />
            <TextField
              name="nit"
              size="small"
              label="Nit"
              className={styles.textField}
            />
          </Box>
          <Box className={styles.box_button}>
            <Button type="submit" variant="contained">
              Registrar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default CompanyForm;
