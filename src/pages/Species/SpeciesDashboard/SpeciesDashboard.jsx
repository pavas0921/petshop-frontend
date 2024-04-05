import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { NavbarComponent } from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { verifyTokenExpiration } from "../../../helpers/verifyToken";
import styles from "./styles.module.scss";
import SpeciesTable from "../../../components/SpeciesComponent/SpeciesTable/SpeciesTable";

const SpeciesDashboard = () => {
  const navigate = useNavigate();
  const isValidToken = verifyTokenExpiration();
  const { status, companyId, rolId, userId } = isValidToken;

  useEffect(() => {
    const isValidToken = verifyTokenExpiration();
    const { status } = isValidToken;
    if (!status) {
      navigate("/");
    }
  }, []);
  return (
    <Box className={styles.div_main}>
      <Box className={styles.div_navbar}>
        <NavbarComponent />
      </Box>
      <Box>
        <SpeciesTable />
      </Box>
    </Box>
  );
};

export default SpeciesDashboard;
