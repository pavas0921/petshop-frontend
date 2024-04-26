import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import styles from './styles.module.scss'
import { ModalComponent } from '../ModalComponent'
import ProductForm from '../ProductsComponents/ProductForm/ProductForm'

const CardComponent = (props) => {
  const { products } = props
  const [openModal, setOpenModal] = useState(false)
  const [product, setProduct] = useState([])
  const [alert, setAlert] = useState({
    status: null,
    message: null,
  })
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const handleClick = (event, item) => {
    event.stopPropagation() // Evita que el clic llegue al contenedor padre
    setOpenModal(true)
    setProduct(item)
  }

  return (
    <Box className={styles.box_main}>
      {products.map((item, index) => (
        <Card
          key={index}
          className={styles.card}
          onClick={(event) => handleClick(event, item)}
        >
          <Box className={styles.box_img}>
            <img src={item.image} alt="" className={styles.img} />
          </Box>

          <CardContent
            sx={{
              minHeight: '25vh',
              maxHeight: '25vh',
              width: '75%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{ color: 'black', fontWeight: 'bold' }}
              gutterBottom
              variant="h6"
              component="div"
            >
              {item.productName}
            </Typography>
            <Typography
              sx={{ color: 'black' }}
              variant="body1"
              color="text.secondary"
            >
              $ {item.salePrice}
            </Typography>
            {item.stock >= 0 && (
              <Typography
                sx={{ color: 'black' }}
                variant="body1"
                color="text.secondary"
              >
                {item.stock} Disponibles
              </Typography>
            )}

            <Typography
              sx={{ color: 'black' }}
              variant="body1"
              color="text.secondary"
            >
              {item.status ? 'Producto Activo' : 'Producto Inactivo'}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {openModal && (
        <ModalComponent
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
        >
          <ProductForm
            setAlert={setAlert}
            handleClose={handleClose}
            product={product}
            update={true}
          />
        </ModalComponent>
      )}
    </Box>
  )
}

export default CardComponent
