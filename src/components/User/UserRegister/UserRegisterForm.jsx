import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectUserState } from "../../../features/user/userSlice";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./userRegister.module.scss";
import { validatePassword } from "../../../helpers/validatePassword";
import { Loader } from "../../Loader";
import ToastAlert from "../../Alerts";

const UserRegisterForm = () => {
  const dispatch = useDispatch();
  const userResponse = useSelector(selectUserState);
  const { users, loading } = userResponse;
  const { httpStatus, message, user, status } = users;

  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
  });

  //const [isValidUser, setIsValidUser] = useState(null);

  const [showPassError, setShowPassError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidUser = validatePassword(userData.password);
    //setIsValidUser(validatePassword(userData.password));
    if (!isValidUser) {
      setShowPassError(true);
    } else {
      setShowPassError(false);
      dispatch(createUser(userData));
    }
  };

  useEffect(() => {
    if (status === "success") {
      // Cuando status sea igual a "success", borra los campos del formulario
      document.querySelector('[name="name"]').value = "";
      document.querySelector('[name="lastname"]').value = "";
      document.querySelector('[name="username"]').value = "";
      document.querySelector('[name="password"]').value = "";
    }
  }, [httpStatus, message, user, status]);

  return (
    <div className={styles.div_main}>
      <div className={styles.div_card}>
        <div className={styles.div_title}>
          <h4>Registro de Usuarios</h4>
        </div>
        <div className={styles.div_form}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.div_inputs}>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombres"
                className={styles.input}
                onChange={handleInputChange}
                value={userData.name}
              />
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Apellidos"
                className={styles.input}
                onChange={handleInputChange}
                value={userData.lastname}
              />
              <Form.Control
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                className={styles.input}
                onChange={handleInputChange}
                value={userData.username}
              />

              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                className={styles.inputPassword}
                onChange={handleInputChange}
                value={userData.password}
              />
              {showPassError && (
                <Form.Text className="text-muted">
                  La contraseña no cumple con los requisitos de complejidad.
                </Form.Text>
              )}
            </div>
            <div className={styles.div_btn}>
              <Button type="submit" className={styles.btn}>
                {loading ? <Loader /> : "Registrar Usuario"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {httpStatus === 200 &&
        message === "Usuario registrado con éxito" &&
        status === "success" && (
          <div>
            <ToastAlert status={status} message={message} />
          </div>
        )}
    </div>
  );
};

export default UserRegisterForm;
