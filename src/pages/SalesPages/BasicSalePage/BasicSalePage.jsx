import React, { useEffect } from "react";
import { NavbarComponent } from "../../../components/Navbar";
import globalStyles from "../../../styles/global.module.scss";
import { Box } from "@mui/material";
import { BasicSale } from '../../../components/SalesComponents/BasicSale';

const BasicSalePage = () => {
    return (
        <Box className={globalStyles.box_main}>
            <Box sx={{width: "100%"}}>
                <NavbarComponent/>
            </Box>
            <Box sx={{width: "100%", height: "80vh"}}>
                <BasicSale/>
            </Box>
        </Box>
      );
}

export default BasicSalePage