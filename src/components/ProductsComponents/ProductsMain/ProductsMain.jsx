import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CardComponent } from "../../CardComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductState,
  getProducts,
  clearAlert,
  getProductsByCompany,
} from "../../../features/producto/productoSlice";
import { AddComponent } from "../../AddComponent";
import styles from "./styles.module.scss";
import { ModalComponent } from "../../ModalComponent";
import ToastAlert from "../../Alerts";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import Loader from "../../LoaderComponent/Loader";
import { SelectCategories } from "../ProductFinder";

const ProductsMain = () => {
  const tokenData = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = tokenData;
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
    productFlag,
  } = productResponse;

  useEffect(() => {
    dispatch(clearAlert());
    if (status) {
      dispatch(getProductsByCompany(companyId));
    }
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

 

  return (
    <Box className={styles.box_main}>
      <Box className={styles.box_inputs}>
      <input
        type="text"
        placeholder="Buscar por nombre o código"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <SelectCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}  />
      </Box>
      
      {productsLoading && <Loader />}
      <Box className={styles.box_cards}>
      {productResponse && products && products.length > 0 ? (
          <CardComponent
            products={
              products
                .filter(
                  (product) =>
                    !selectedCategory ||
                    (product.idCategoria._id &&
                      String(product.idCategoria._id).toLowerCase() ===
                        selectedCategory.toLowerCase())
                )
                .filter(
                  (product) =>
                    searchTerm.trim() === "" ||
                    (product.productName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                      (product.barCode &&
                        product.barCode
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())))
                )
            }
          />
        ) : (
          <p>No se encontraron productos.</p>
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
      {productFlag &&
        productHttpStatus === 201 &&
        productStatus === "success" && (
          <ToastAlert message={productMessage} status={productStatus} />
        )}
    </Box>
  );
};

export default ProductsMain;
