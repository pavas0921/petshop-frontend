import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CardComponent } from "../../CardComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductState,
  getProducts,
  getProductsByCompany,
} from "../../../features/producto/productoSlice";
import { AddComponent } from "../../AddComponent";
import styles from "./styles.module.scss";
import { ModalComponent } from "../../ModalComponent";
import ToastAlert from "../../Alerts";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import Loader from "../../LoaderComponent/Loader";

const ProductsMain = () => {
  const tokenData = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = tokenData;
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState({
    status: null,
    message: null,
  });
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const productResponse = useSelector(selectProductState);
  const {
    productHttpStatus,
    productMessage,
    productStatus,
    products,
    productsLoading,
  } = productResponse;

  useEffect(() => {
    if (status) {
      dispatch(getProductsByCompany(companyId));
    }
  }, []);

  useEffect(() => {
    console.log(productResponse);
  }, [productResponse]);
  return (
    <Box>
      {productsLoading && <Loader />}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {productResponse && products && products.length > 0 && (
          <CardComponent products={products} />
        )}
      </Box>
      <Box className={styles.boxAdd}>
        <AddComponent openModal={openModal} setOpenModal={setOpenModal} />
      </Box>
      {openModal && (
        <ModalComponent
          open={openModal}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setAlert={setAlert}
        />
      )}
      {alert && alert.message && alert.status === "success" && (
        <ToastAlert message={alert.message} status={alert.status} />
      )}
    </Box>
  );
};

export default ProductsMain;
