import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./styles.css";
import logo from "../../assets/logo.jpg";

const Sidebar = () => {
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
            <NavDropdown title="Perros" id="perros">
              <NavDropdown.Item>Concentrados</NavDropdown.Item>
              <NavDropdown.Item>Snacks</NavDropdown.Item>
              <NavDropdown.Item>Accesorios</NavDropdown.Item>
              <NavDropdown.Item>Cuidado e Higiene</NavDropdown.Item>
              <NavDropdown.Item>MediPets</NavDropdown.Item>
              <NavDropdown.Item>Desparasitantes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Gatos" id="perros">
              <NavDropdown.Item>Concentrados</NavDropdown.Item>
              <NavDropdown.Item>Arenas</NavDropdown.Item>
              <NavDropdown.Item>Snacks</NavDropdown.Item>
              <NavDropdown.Item>Accesorios</NavDropdown.Item>
              <NavDropdown.Item>Cuidado e Higiene</NavDropdown.Item>
              <NavDropdown.Item>MediPets</NavDropdown.Item>
              <NavDropdown.Item>Desparasitantes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Otras Especies" id="perros">
              <NavDropdown.Item>Concentrados</NavDropdown.Item>
              <NavDropdown.Item>Snacks</NavDropdown.Item>
              <NavDropdown.Item>Accesorios</NavDropdown.Item>
              <NavDropdown.Item>Aseo</NavDropdown.Item>
              <NavDropdown.Item>Medicamentos</NavDropdown.Item>
              <NavDropdown.Item>Desparasitantes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Servicios" id="perros">
              <NavDropdown.Item>Consulta Veterinaria</NavDropdown.Item>
              <NavDropdown.Item>Desparasitación</NavDropdown.Item>
              <NavDropdown.Item>Vacunación</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
