import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/login.jfif";
import Logo from "../../assets/logo.jpg";
import { Login, selectLoginState } from "../../features/login/loginSlice";
import { AlertMessage } from "../Alert";
import { Loader } from "../Loader";
import { useForm } from "react-hook-form";
import styles from "./loginForm.module.scss";

//Todo: Implementar el formulario de login - https://github.com/pavas0921/favs-frontend/blob/main/src/components/LoginForm/LoginForm.jsx

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginResponse = useSelector(selectLoginState);
  const {user} = loginResponse;
  const {status, data} = user
  const {companyId, rolId, token} = data || {}

  useEffect(() => {
    console.log("token", loginResponse)
    if(user && data && token && companyId && rolId){
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("companyId", rolId);
      sessionStorage.setItem("rolId", rolId);
      navigate("/dashboard");
    }
  }, [loginResponse]);

  const onSubmit = (credentials) => {
    dispatch(Login(credentials))
  }
    

  const goToFavs = () => {
    navigate("/new-sale");
  };

  const messages = {
    req: "Este campo es obligatorio",
   };

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_form}>
        <Box className={styles.box_title}>
          <Typography variant="h4" color="initial">
            Inicio de Sesión
          </Typography>
        </Box>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.box_input}>
            <TextField
              {...register("id", {required: messages.req})}
              className={styles.textField}
              label="Correo Electrónico"
              variant="standard"
              type="text"
              name="id"
              helperText={errors.id && errors.id.message}
            />
          </Box>
          <Box className={styles.box_input}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
            {...register("password", {required: messages.req})}
              className={styles.textField}
              label="Contraseña"
              variant="standard"
              type="password"
              name="password"
              helperText={errors.password && errors.password.message}
            />
          </Box>
          <Box className={styles.box_button}>
            <Button sx={{ width: "30%" }} variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
