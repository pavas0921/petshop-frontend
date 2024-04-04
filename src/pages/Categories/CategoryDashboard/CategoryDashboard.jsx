import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { NavbarComponent } from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import styles from "./styles.module.scss"
import CategoriesTable from "../../../components/CategoriesComponents/CategoriesTable/CategoriesTable";

function CategoryDashboard() {
    const navigate = useNavigate();
    const isValidToken = verifyTokenExpiration();
    const { status, companyId, rolId, userId } = isValidToken;

    useEffect(() => {
        if (!status) {
          navigate("/");
        }
      }, [status]);
  
      return (
        <Box className={styles.div_main}>
          <Box className={styles.div_navbar}>
            <NavbarComponent />
          </Box>
          <Box>
            <CategoriesTable/>
          </Box>
        </Box>
      );
}

export default CategoryDashboard