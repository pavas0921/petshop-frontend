import React from "react";
import { FormRegistroDetalleProducto } from "../../components/DetalleProducto/RegistroDetalleProducto";
import FormRegistroProuctos from "../../components/Productos/RegistroProductos/FormRegistroProuctos";
import { AdminNavbar } from "../../components/Sidebar";
import styles from "./registroProductos.module.scss";

const RegistroProductos = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <AdminNavbar />
      </div>
      <div className={styles.div_form}>
        <FormRegistroProuctos />
      </div>
    </div>
  );
};

export default RegistroProductos;
