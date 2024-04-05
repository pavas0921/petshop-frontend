import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { NavbarComponent } from "../../../components/Navbar";
import globalStyles from "../../../styles/global.module.scss";
import { SalesTable } from "../../../components/SalesComponents/SalesList";

const SalesList = () => {
  return (
    <Box className={globalStyles.box_main}>
      <Box sx={{ width: "100%" }}>
        <NavbarComponent />
      </Box>
      <Box>
        <SalesTable/>
      </Box>
    </Box>
  );
};

export default SalesList;