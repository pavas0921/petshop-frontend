import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import ProductForm from "../ProductsComponents/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";
import { verifyTokenExpiration } from "../../helpers/verifyToken";

const ModalComponent = (props) => {
  const { open, handleOpen, handleClose, setAlert, product, update } = props;
  const navigate = useNavigate();
  const isValidToken = verifyTokenExpiration();
  const { status } = isValidToken;

  useEffect(() => {
    if (!status) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalContainer}>
          <ProductForm setAlert={setAlert} product={product} update={update} />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
