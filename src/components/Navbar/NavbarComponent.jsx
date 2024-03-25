import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // o 'ArrowDropDown' para otra versión
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ModalComponent } from "../ModalComponent";

const NavbarComponent = () => {
  const [anchorPacientes, setAnchorPacientes] = React.useState(null);
  const [anchorVender, setAnchorVender] = React.useState(null);
  const [anchorAgenda, setAnchorAgenda] = React.useState(null);
  const [anchorFacturacion, setAnchorFacturacion] = React.useState(null);
  const [anchorCartera, setAnchorCartera] = React.useState(null);
  const [anchorRips, setAnchorRips] = React.useState(null);
  const [anchorInformes, setAnchorInformes] = React.useState(null);
  const [anchorAdministracion, setAnchorAdministracion] = React.useState(null);
  const [anchorPruebas, setAnchorPruebas] = React.useState(null);
  const [anchorProductos, setAnchorProductos] = React.useState(null);
  const [anchorUsuarios, setAnchorUsuarios] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleClickPacientes = (event) => {
    setAnchorPacientes(event.currentTarget);
  };

  const handleClickAgenda = (event) => {
    setAnchorAgenda(event.currentTarget);
  };

  const handleClickCartera = (event) => {
    setAnchorCartera(event.currentTarget);
  };

  const handleClickFacturacion = (event) => {
    setAnchorFacturacion(event.currentTarget);
  };

  const handleClickRips = (event) => {
    setAnchorRips(event.currentTarget);
  };

  const handleClickInformes = (event) => {
    setAnchorInformes(event.currentTarget);
  };

  const handleClickAdministracion = (event) => {
    setAnchorAdministracion(event.currentTarget);
  };

  const handleClickPruebas = (event) => {
    setAnchorPruebas(event.currentTarget);
  };

  const handleClickProductos = (event) => {
    setAnchorProductos(event.currentTarget);
  };

  const handleClickVender = (event) => {
    setAnchorVender(event.currentTarget);
  };

  const handleClickUsuarios = (event) => {
    setAnchorUsuarios(event.currentTarget);
  };

  const handleClosePacientes = () => {
    setAnchorPacientes(null);
  };

  const handleCloseAgenda = () => {
    setAnchorAgenda(null);
  };

  const handleCloseFacturacion = () => {
    setAnchorFacturacion(null);
  };

  const handleCloseCartera = () => {
    setAnchorCartera(null);
  };

  const handleCloseRips = () => {
    setAnchorRips(null);
  };

  const handleCloseInformes = () => {
    setAnchorInformes(null);
  };

  const handleCloseAdministracion = () => {
    setAnchorAdministracion(null);
  };

  const handleClosePruebas = () => {
    setAnchorPruebas(null);
  };

  const handleCloseProductos = () => {
    setAnchorProductos(null);
  };

  const handleCloseVender = () => {
    setAnchorVender(null);
  };

  const handleCloseUsuarios = () => {
    setAnchorUsuarios(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          {/* Resto del código del componente */}
          {isMobile ? (
            <Drawer
              anchor="left"
              open={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            >
              <Button
                color="inherit"
                onClick={handleClickPruebas}
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                Administración
              </Button>

              <Button
                color="inherit"
                onClick={handleClickProductos}
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                Productos
              </Button>

              <Menu
                anchorEl={anchorProductos}
                open={Boolean(anchorProductos)}
                onClose={handleCloseProductos}
              >
                <MenuItem onClick={() => navigate("/products")}>
                  Productos
                </MenuItem>
              </Menu>

              <Button
                color="inherit"
                onClick={handleClickVender}
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                Vender
              </Button>

              <Menu
                anchorEl={anchorVender}
                open={Boolean(anchorVender)}
                onClose={handleCloseVender}
              >
                <MenuItem onClick={() => navigate("/basic-sale")}>
                  Venta Básica
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={anchorPruebas}
                open={Boolean(anchorPruebas)}
                onClose={handleClosePruebas}
              >
                <MenuItem onClick={handleClickUsuarios}>
                  Usuarios
                  <ListItemIcon>
                    <ArrowDropDownIcon />
                  </ListItemIcon>
                </MenuItem>
              </Menu>
              <Menu
                anchorEl={anchorUsuarios} // Agregar este estado para el submenu de Usuarios
                open={Boolean(anchorUsuarios)}
                onClose={handleCloseUsuarios}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right", // Ajusta esto a 'left' si deseas que se abra hacia la izquierda
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => navigate("/user/register")}>
                  Registrar Usuario
                </MenuItem>
                <MenuItem onClick={() => navigate("/user-list")}>
                  Maestro de Usuarios
                </MenuItem>

                <MenuItem onClick={() => navigate("/products")}>
                  Productos
                </MenuItem>

                <MenuItem onClick={() => navigate("/customer")}>
                  Clientes
                </MenuItem>
              </Menu>
            </Drawer>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={handleClickPruebas}
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                Administración
              </Button>

              <Button
                color="inherit"
                onClick={handleClickProductos}
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                Productos
              </Button>

              <Menu
                anchorEl={anchorProductos}
                open={Boolean(anchorProductos)}
                onClose={handleCloseProductos}
              >
                <MenuItem onClick={() => navigate("/products")}>
                  Productos
                </MenuItem>
              </Menu>

              <Button
                color="inherit"
                onClick={handleClickVender}
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >
                Vender
              </Button>

              <Menu
                anchorEl={anchorVender}
                open={Boolean(anchorVender)}
                onClose={handleCloseVender}
              >
                <MenuItem onClick={() => navigate("/basic-sale")}>
                  Venta Básica
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={anchorPruebas}
                open={Boolean(anchorPruebas)}
                onClose={handleClosePruebas}
              >
                <MenuItem onClick={handleClickUsuarios}>
                  Usuarios
                  <ListItemIcon>
                    <ArrowDropDownIcon />
                  </ListItemIcon>
                </MenuItem>
              </Menu>
              <Menu
                anchorEl={anchorUsuarios} // Agregar este estado para el submenu de Usuarios
                open={Boolean(anchorUsuarios)}
                onClose={handleCloseUsuarios}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right", // Ajusta esto a 'left' si deseas que se abra hacia la izquierda
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => navigate("/user/register")}>
                  Registrar Usuario
                </MenuItem>
                <MenuItem onClick={() => navigate("/user-list")}>
                  Maestro de Usuarios
                </MenuItem>

                <MenuItem onClick={() => navigate("/products")}>
                  Productos
                </MenuItem>

                <MenuItem onClick={() => navigate("/customer")}>
                  Clientes
                </MenuItem>
              </Menu>
            </>
          )}
          {/* Resto del código del componente */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavbarComponent;
