import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/login.jfif";
import Logo from "../../assets/logo.jpg";
import { Login, selectLoginState } from "../../features/login/loginSlice";
import { AlertMessage } from "../Alert";
import { Loader } from "../Loader";
import "./styles.css";

//Todo: Implementar el formulario de login - https://github.com/pavas0921/favs-frontend/blob/main/src/components/LoginForm/LoginForm.jsx

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector(selectLoginState);
  const {user} = loginData;
  const {data} = user;
  const token = data?.token;   
  const loading = loginData.loading;


  useEffect(() => {
   if(token){
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
        <div>
        <Image style={{width: "200px", height: "200px", marginBottom: "20px"}} src={Logo} roundedCircle/>
        </div>
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
              controlId="loginForm.button"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                
              }}
            >
              <Button variant="primary" style={{backgroundColor: "#f19fad", border: "none", width:"25%", color: "black", marginBottom: "20px" }} type="submit">INGRESAR</Button>
              {user && user.error && user.message && (
      <AlertMessage variant="warning" message={user.message} />
      
     )
     }

     {loading && <Loader/>}
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
