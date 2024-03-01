import React, { useEffect } from "react";
import { NavbarComponent } from "../../components/Navbar/";
import globalStyles from "../../styles/global.module.scss";
import { Box } from "@mui/material";
import styles from "./styles.module.scss"
import { CompanyTable } from "../../components/CompanyComponents/CompanyTable";

function CompanyDashboard() {
    return (
        <Box className={globalStyles.box_main}>
            <Box sx={{width: "100%"}}>
                <NavbarComponent/>
            </Box>
            <Box className={styles.box_customer}>
               <CompanyTable/>
            </Box>
        </Box>
      );
}

export default CompanyDashboard