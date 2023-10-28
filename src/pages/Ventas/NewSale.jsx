import React from "react";
import { VentaForm } from "../../components/VentasComponents/VentaForm";
import styles from "./newSale.module.scss";
import { Sidebar } from "../../components/Sidebar";

const NewSale = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_sidebar}>
        <Sidebar />
      </div>
      <div className={styles.div_ventaForm}>
        <VentaForm />
      </div>
    </div>
  );
};

export default NewSale;
