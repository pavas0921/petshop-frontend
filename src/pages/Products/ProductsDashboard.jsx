import React, { useEffect } from "react";
import { NavbarComponent } from "../../components/Navbar";
import globalStyles from "../../styles/global.module.scss";
import { Box } from "@mui/material";
import { ProductsMain } from "../../components/ProductsComponents/ProductsMain";
const ProductsDashboard = () => {


  return (
    <Box className={globalStyles.box_main}>
        <Box sx={{width: "100%"}}>
            <NavbarComponent/>
        </Box>
        <Box>
            <ProductsMain/>
        </Box>
    </Box>
  );
};

export default ProductsDashboard;
