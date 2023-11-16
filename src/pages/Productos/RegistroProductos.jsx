import React from "react";
import { FormRegistroDetalleProducto } from "../../components/DetalleProducto/RegistroDetalleProducto";
import FormRegistroProuctos from "../../components/Productos/RegistroProductos/FormRegistroProuctos";
import { Sidebar } from "../../components/Sidebar";
import styles from "./registroProductos.module.scss";

const RegistroProductos = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_navbar}>
        <Sidebar />
      </div>
      <div className={styles.div_form}>
        <FormRegistroProuctos />
        <FormRegistroDetalleProducto />
      </div>

    </div >
  );
};

export default RegistroProductos;
