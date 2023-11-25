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
import styles from "./loginForm.module.scss";

//Todo: Implementar el formulario de login - https://github.com/pavas0921/favs-frontend/blob/main/src/components/LoginForm/LoginForm.jsx

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector(selectLoginState);
  const { user } = loginData;
  const { data } = user;
  const { token } = data || "";
  const loading = loginData.loading;

  useEffect(() => {
    console.log(loading);
    if (token && !loading) {
      sessionStorage.setItem("token");
      goToFavs();
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Login(credentials));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const goToFavs = () => {
    navigate("/new-sale");
  };

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_form}>
        <Box className={styles.box_title}>
          <Typography variant="h4" color="initial">
            Inicio de Sesión
          </Typography>
        </Box>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Box className={styles.box_input}>
            <MailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              className={styles.textField}
              label="Correo Electrónico"
              variant="standard"
              type="email"
              onChange={handleInputChange}
              name="email"
            />
          </Box>
          <Box className={styles.box_input}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              className={styles.textField}
              label="Contraseña"
              variant="standard"
              type="password"
              onChange={handleInputChange}
              name="password"
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
