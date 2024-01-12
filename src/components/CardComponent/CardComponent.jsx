import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import { ModalComponent } from "../ModalComponent";

const CardComponent = (props) => {
  const { products } = props;
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState([]);
  const [alert, setAlert] = useState({
    status: null,
    message: null,
  });
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleClick = (event, item) => {
    event.stopPropagation(); // Evita que el clic llegue al contenedor padre
    setOpenModal(true);
    setProduct(item);
  };

  useEffect(() => {
    console.log("----", products);
  }, [product]);

  return (
    <Box className={styles.box_main}>
      {products.map((item, index) => (
        <Card
          key={index}
          className={styles.card}
          sx={{ maxWidth: 500 }}
          onClick={(event) => handleClick(event, item)}
        >
          <Box className={styles.box_img}>
            <img
              src={item.image}
              alt=""
              className={styles.img}
            />
          </Box>

          <CardContent
            sx={{
              maxHeight: "20vh",
              width: "75%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {item.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $ {item.salePrice}
            </Typography>
            {item.stock && (
              <Typography variant="body2" color="text.secondary">
                {item.stock} unidades
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary">
              {console.log("item", item.status)}
              {`${item.status}`}
            </Typography>
          </CardContent>
        </Card>
      ))}
      {openModal && (
        <ModalComponent
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setAlert={setAlert}
          product={product}
          update={true}
        />
      )}
    </Box>
  );
};

export default CardComponent;
