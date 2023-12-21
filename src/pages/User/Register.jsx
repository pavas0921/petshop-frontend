import React from "react";
import { Box } from "@mui/material";
import { UserRegisterForm } from "../../components/User/UserRegister";
import { NavbarComponent } from "../../components/Navbar";
import styles from "./styles.module.scss";

const Register = () => {
  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_navbar}>
        <NavbarComponent />
      </Box>
      <Box className={styles.box_content}>
        <UserRegisterForm />
      </Box>
    </Box>
  );
};

export default Register;
