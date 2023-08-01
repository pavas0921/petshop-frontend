import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/login.jfif";
import { Login, selectLoginState } from "../../features/login/loginSlice";
import "./styles.css";

//Todo: Implementar el formulario de login - https://github.com/pavas0921/favs-frontend/blob/main/src/components/LoginForm/LoginForm.jsx

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const loginData = useSelector(selectLoginState);
  const navigate = useNavigate();
  const {user} = loginData;
  const {data} = user;
  const token = data?.token;    

  useEffect(() => {
   if(token){
    console.log(token)
    goToFavs();
   }
  }, [token]);

 const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Login(credentials));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const goToFavs = () => {
    navigate("/");
  }



  return (
    <div className="login-form">
      <div className="login-form-left">
        <Image className="img-form" src={Img} />
      </div>
      <div className="login-form-right">
        <div className="form-container">
          <Form onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Form.Group
              controlId="loginForm.email"
              style={{
                width: "65%",
                marginBottom: "20px",
              }}
            >
              <Form.Control type="email" placeholder="Correo Electrónico" name="email"
              value={credentials.email}
              onChange={handleInputChange} />
            </Form.Group>
            <Form.Group
              controlId="loginForm.password"
              style={{
                width: "65%",
                marginBottom: "20px",
              }}
            >
              <Form.Control type="password" placeholder="Contraseña" name="password" value={credentials.password}
              onChange={handleInputChange} />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlInput1"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button variant="primary" type="submit">Ingresar</Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
