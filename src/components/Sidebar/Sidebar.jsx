import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAnimal,
  selectAnimalState,
} from "../../features/animal/animalSlice";
import {
  getAllAnimalProduct,
  selectAnimalProductState,
} from "../../features/animalProduct/animalProductSlice";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./styles.css";
import logo from "../../assets/logo.jpg";

const Sidebar = () => {
  const animalData = useSelector(selectAnimalState);
  const animalProductData = useSelector(selectAnimalProductState);
  const { animalProduct } = animalProductData;
  const { data } = animalProduct;

  //const { animal } = data;
  //const { status, item } = animal;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAnimal());
    dispatch(getAllAnimalProduct());
  }, []);

  useEffect(() => {
    if (data) {
      console.log(",,,,,", data);
    }
  }, [animalProductData]);

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
            {data &&
              data.map((row, index) => (
                <NavDropdown
                  key={index}
                  title={row.name}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
