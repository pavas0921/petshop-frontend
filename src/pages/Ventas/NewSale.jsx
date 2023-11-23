import React from "react";
import { AdminNavbar } from "../../components/Sidebar";
import { VentaForm } from "../../components/VentasComponents/VentaForm";
import styles from "./newSale.module.scss";

const NewSale = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_sidebar}>
        <AdminNavbar />
      </div>
      <div className={styles.div_ventaForm}>
        <VentaForm />
      </div>
    </div>
  );
};

export default NewSale;
