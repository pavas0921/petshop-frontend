import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.jpg";
import styles from "./sidebar.module.scss";

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path)
    }
    return (
        <Navbar expand="lg" className={styles.navbar_main}>
            <Container>
                <Navbar.Brand href="#home">
                    <div className={styles.div_img}>
                        <img
                            alt=""
                            src={logo}
                            width="80"
                            height="80"
                            className={styles.img_logo}
                        />
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Productos" id="perros">
                            <NavDropdown.Item onClick={() => handleClick("/products-add")}>Agregar Productos</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleClick("/products")}>Ver Productos</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Ventas" id="ventas">
                            <NavDropdown.Item onClick={() => handleClick("/new-sale")}>Nueva Venta</NavDropdown.Item>
                            <NavDropdown.Item>Maestro de Ventas</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Clientes" id="perros">
                            <NavDropdown.Item>Agregar Clientes</NavDropdown.Item>
                            <NavDropdown.Item>Listado de Clientes</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;
