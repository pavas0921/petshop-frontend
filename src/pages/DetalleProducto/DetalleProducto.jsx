import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { TablaDetalleProducto } from "../../components/DetalleProducto/TableDetalleProducto";
import styles from "./detalleProducto.module.scss";

const DetalleProducto = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <Sidebar />
      </div>
      <div className={styles.div_table}>
        <div className={styles.div_tableComponent}>
          <TablaDetalleProducto />
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
