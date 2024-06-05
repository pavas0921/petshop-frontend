import MenuIcon from '@mui/icons-material/Menu'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore' // o 'ArrowDropDown' para otra versión
import ListItemIcon from '@mui/material/ListItemIcon'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ModalComponent } from '../ModalComponent'
import Avatar from '@mui/material/Avatar'
import { verifyTokenExpiration } from '../../helpers/verifyToken'

const NavbarComponent = () => {
  const [anchorVender, setAnchorVender] = React.useState(null)
  const [anchorPruebas, setAnchorPruebas] = React.useState(null)
  const [anchorClientes, setAnchorClientes] = React.useState(null)
  const [anchorUsuarios, setAnchorUsuarios] = React.useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const isValidToken = verifyTokenExpiration()
  const { status, companyId, rolId, userId, logo } = isValidToken
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const handleClickPruebas = (event) => {
    setAnchorPruebas(event.currentTarget)
  }

  const handleClickProductos = (event) => {
    setAnchorProductos(event.currentTarget)
  }

  const handleClickVender = (event) => {
    setAnchorVender(event.currentTarget)
  }

  const handleClickUsuarios = (event) => {
    setAnchorUsuarios(event.currentTarget)
  }

  const handleClickClientes = (event) => {
    setAnchorClientes(event.currentTarget)
  }

  const handleClosePruebas = () => {
    setAnchorPruebas(null)
  }

  const handleCloseClientes = () => {
    setAnchorClientes(null)
  }

  const handleCloseProductos = () => {
    setAnchorProductos(null)
  }

  const handleCloseVender = () => {
    setAnchorVender(null)
  }

  const handleCloseUsuarios = () => {
    setAnchorUsuarios(null)
  }

  useEffect(() => {
    if (!status) {
      navigate('/')
    }
  }, [])

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
                onClick={() => navigate('/dashboard')}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                }}
              >
                <p>Inicio</p>
              </Button>

              <Button
                color="inherit"
                onClick={handleClickPruebas}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                }}
              >
                <p>Administración</p>
              </Button>

              <Button
                color="inherit"
                onClick={() => navigate('/products')}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                }}
              >
                Productos
              </Button>

              <Button
                color="inherit"
                onClick={handleClickVender}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                }}
              >
                Ventas
              </Button>

              <Menu
                anchorEl={anchorVender}
                open={Boolean(anchorVender)}
                onClose={handleCloseVender}
              >
                <MenuItem onClick={() => navigate('/basic-sale')}>
                  Venta Básica
                </MenuItem>
                <MenuItem onClick={() => navigate('/sales')}>
                  Listado de Ventas
                </MenuItem>
              </Menu>

              <Button
                color="inherit"
                onClick={() => navigate('/customer')}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                }}
              >
                Clientes
              </Button>

              <Button
                color="inherit"
                onClick={() => navigate('/supplier')}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                }}
              >
                Proveedores
              </Button>

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
                  vertical: 'top',
                  horizontal: 'right', // Ajusta esto a 'left' si deseas que se abra hacia la izquierda
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={() => navigate('/user/register')}>
                  Registrar Usuario
                </MenuItem>
                <MenuItem onClick={() => navigate('/user-list')}>
                  Maestro de Usuarios
                </MenuItem>

                <MenuItem onClick={() => navigate('/customer')}>
                  Clientes
                </MenuItem>
              </Menu>
            </Drawer>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/dashboard')}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={logo}
                  sx={{
                    width: 60, // Ajusta el ancho del Avatar según tus necesidades
                    height: 60, // Ajusta el alto del Avatar según tus necesidades
                    marginRight: 1, // Espacio entre el Avatar y el texto
                  }}
                />
              </Button>

              <Button
                color="inherit"
                onClick={handleClickPruebas}
                sx={{
                  fontWeight: 'ligth',
                  textTransform: 'capitalize',
                  fontSize: '1.2rem',
                }}
              >
                <p>Administración</p>
              </Button>

              <Menu
                anchorEl={anchorPruebas}
                open={Boolean(anchorPruebas)}
                onClose={handleClosePruebas}
              >
                <MenuItem onClick={handleClickUsuarios}>
                  <p>Usuarios</p>

                  <ListItemIcon>
                    <ArrowDropDownIcon />
                  </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={handleClickClientes}>
                  <p>Clientes</p>

                  <ListItemIcon>
                    <ArrowDropDownIcon />
                  </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={() => navigate('/categories')}>
                  <p>Categorias</p>
                </MenuItem>
                <MenuItem onClick={() => navigate('/species')}>
                  <p>Especies</p>
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={anchorUsuarios} // Agregar este estado para el submenu de Usuarios
                open={Boolean(anchorUsuarios)}
                onClose={handleCloseUsuarios}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right', // Ajusta esto a 'left' si deseas que se abra hacia la izquierda
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={() => navigate('/user/register')}>
                  Registrar Usuario
                </MenuItem>
                <MenuItem onClick={() => navigate('/user-list')}>
                  Maestro de Usuarios
                </MenuItem>
              </Menu>

              <Menu
                anchorEl={anchorClientes} // Agregar este estado para el submenu de Usuarios
                open={Boolean(anchorClientes)}
                onClose={handleCloseClientes}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right', // Ajusta esto a 'left' si deseas que se abra hacia la izquierda
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={() => navigate('/user/register')}>
                  Registrar Cliente
                </MenuItem>
                <MenuItem onClick={() => navigate('/user-list')}>
                  Maestro de Clientes
                </MenuItem>
              </Menu>

              <Button
                color="inherit"
                onClick={() => navigate('/products')}
                sx={{
                  fontWeight: 'ligth',
                  textTransform: 'capitalize',
                  fontSize: '1.2rem',
                }}
              >
                <p>Productos</p>
              </Button>

              <Button
                color="inherit"
                onClick={handleClickVender}
                sx={{
                  fontWeight: 'ligth',
                  textTransform: 'capitalize',
                  fontSize: '1.2rem',
                }}
              >
                <p>Ventas</p>
              </Button>

              <Menu
                anchorEl={anchorVender}
                open={Boolean(anchorVender)}
                onClose={handleCloseVender}
              >
                <MenuItem onClick={() => navigate('/basic-sale')}>
                  <p>Venta Básica</p>
                </MenuItem>
                <MenuItem onClick={() => navigate('/sales')}>
                  <p>Listado de Ventas</p>
                </MenuItem>
              </Menu>

              <Button
                color="inherit"
                onClick={() => navigate('/customer')}
                sx={{
                  fontWeight: 'ligth',
                  textTransform: 'capitalize',
                  fontSize: '1.2rem',
                }}
              >
                <p>Clientes</p>
              </Button>

              <Button
                color="inherit"
                onClick={() => navigate('/supplier')}
                sx={{
                  fontWeight: 'ligth',
                  textTransform: 'capitalize',
                  fontSize: '1.2rem',
                }}
              >
                <p>Proveedores</p>
              </Button>
            </>
          )}
          {/* Resto del código del componente */}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavbarComponent
