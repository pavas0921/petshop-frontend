import { faCog } from "@fortawesome/free-solid-svg-icons"; // Icono de configuración
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import {
  getAllAnimal,
  selectAnimalState,
} from "../../features/animal/animalSlice";
import {
  getAllAnimalProduct,
  selectAnimalProductState,
} from "../../features/animalProduct/animalProductSlice";
import { selectLoginState } from "../../features/login/loginSlice";
import "./styles.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const animalData = useSelector(selectAnimalState);
  const animalProductData = useSelector(selectAnimalProductState);
  const { animalProduct } = animalProductData;
  const { data } = animalProduct;
  const [products, setProducts] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const dataLogin = useSelector(selectLoginState);
  const token = dataLogin?.user?.data?.token

  const handleAnimalClick = (animalId) => {
    const selectedProducts = data.filter((row) => animalId === row.id_animal);
    setProducts(selectedProducts.map((row) => row.product));
  };

  //const { animal } = data;
  //const { status, item } = animal;
  const dispatch = useDispatch();

  useEffect(() => {
    if(token){
      sessionStorage.setItem("token", token)
      dispatch(getAllAnimal());
    dispatch(getAllAnimalProduct());
    }else{
      navigate("/login");
    }
    
    
  }, [token]);

  useEffect(() => {});

  return (
    <Navbar expand="lg" className="navbar_main">
      <Container>
        <Navbar.Brand href="#home">
          <div className="div_img">
            <img
              alt=""
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top img_logo"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {animalData.animal.data &&
              animalData.animal.data.map((row, index) => (
                <NavDropdown
                  key={index}
                  title={row.name}
                  onClick={() => handleAnimalClick(row.id)}
                  id="basic-nav-dropdown"
                >
                  {products &&
                    products.length > 0 &&
                    products.map((row, index) => (
                      <NavDropdown.Item key={index} href={`#action/3.${index}`}>
                        {row}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              ))}
          </Nav>
        </Navbar.Collapse>


      
        <Navbar.Collapse className="justify-content-end">
        
        <Nav className="ml-auto">
            <Nav.Link eventKey={2} href="#memes">
            <FontAwesomeIcon icon={faCog} />            </Nav.Link>
          </Nav>
         
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Sidebar;
