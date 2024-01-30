import React, { useEffect } from "react";
import { NavbarComponent } from "../../components/Navbar";
import globalStyles from "../../styles/global.module.scss";
import { Box } from "@mui/material";
import { ProductsMain } from "../../components/ProductsComponents/ProductsMain";
import styles from "./styles.module.scss"
const ProductsDashboard = () => {


  return (
    <Box className={globalStyles.box_main}>
        <Box sx={{width: "100%"}}>
            <NavbarComponent/>
        </Box>
        <Box className={styles.productsMain}>
            <ProductsMain/>
        </Box>
    </Box>
  );
};

export default ProductsDashboard;
