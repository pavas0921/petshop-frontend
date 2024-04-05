import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectEspecieState, createEspecie, clearState } from "../../../features/especie/especieSlice";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import styles from "./styles.module.scss";
import { Loader } from "../../LoaderComponent";

const SpeciesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const especiesResponse = useSelector(selectEspecieState);
  const {especiesLoading} = especiesResponse;

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    dispatch(clearState());
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

  const onSubmit = (body) => {
    const isValidToken = verifyTokenExpiration();
    const { status } = isValidToken;
    if (status) {
      dispatch(createEspecie(body));
    } else {
      sessionStorage.clear();
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <Box className={styles.box_main}>
      <Box>
        <Typography variant="h5" color="initial">
          Registro de Especies
        </Typography>
      </Box>
      <Box className={styles.box_form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name", { required: true })}
            name="name"
            size="small"
            label="Nombre Especie"
            className={styles.textField}
            helperText={errors.name ? "Este campo es requerido" : ""}
          />

          <Button type="submit" variant="contained">
            Registrar
          </Button>
        </form>
      </Box>
      {especiesLoading && (
        <Loader/>
      )}
    </Box>
  );
};

export default SpeciesForm;
