import * as React from "react";
import { AllProducts } from "../../components/Productos/TablaProductos/AllProducts";
import { Sidebar } from "../../components/Sidebar";
import styles from "./verProductos.module.scss";

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
