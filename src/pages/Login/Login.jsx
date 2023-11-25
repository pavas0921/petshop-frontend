import React from "react";
import { LoginForm } from "../../components/Login";
import styles from "./login.module.scss";

const Login = () => {
  return (
    <div className={styles.div_main}>
      <LoginForm />
    </div>
  );
};

export default Login;
