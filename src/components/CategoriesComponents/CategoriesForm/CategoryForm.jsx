import React, {useEffect} from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryState, createCategory, clearState } from "../../../features/categoria/categoriaSlice";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import styles from "./styles.module.scss";
import { Loader } from "../../LoaderComponent";
import ToastAlert from "../../Alerts";

const CategoryForm = ({handleClose}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categoryResponse = useSelector(selectCategoryState);
    const {categories, categoryLoading, httpStatus, message, categoryFlag} = categoryResponse;

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    dispatch(clearState())
    const isValidToken = verifyTokenExpiration();
    const { status, companyId } = isValidToken;
    if(!status){
        sessionStorage.clear();
        localStorage.clear();
        navigate("/")
    }else{
        setValue("idCompany", companyId)
    }
  }, [])

  useEffect(() => {
    if(categoryFlag){
        handleClose();
    }
  }, [categoryFlag])
  
  

  const onSubmit = (body) => {
    const isValidToken = verifyTokenExpiration();
    const { status } = isValidToken;
    if(status){
        dispatch(createCategory(body));
    }else{
        sessionStorage.clear();
        localStorage.clear();
        navigate("/")
    }
  };

  return (
    <Box className={styles.box_main}>
      <Box>
        <Typography variant="h5" color="initial">
          Registro de Categorías
        </Typography>
      </Box>
      <Box className={styles.box_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name", {required: true})}
            name="name"
            size="small"
            label="Nombre Categoría"
            className={styles.textField}
            helperText={errors.name ? "Este campo es requerido" : ""}
          />

          <Button type="submit" variant="contained">
            Registrar
          </Button>
        </form>
      </Box>

      {categoryLoading && (
        <Loader/>
      )}

     
    </Box>
  );
};

export default CategoryForm;
