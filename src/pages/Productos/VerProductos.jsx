import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { AllProducts } from "../../components/Productos/TablaProductos/AllProducts";
import styles from "./verProductos.module.scss";
import { Sidebar } from "../../components/Sidebar";

const VerProductos = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <Sidebar />
      </div>
      <div className={styles.div_table}>
        <div className={styles.div_title}>
          <h4>Maestro de Productos</h4>
        </div>
        <div className={styles.div_tableComponent}>
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default VerProductos;
