import React, { useEffect, useState } from "react";
import FormRegistroProuctos from "../../components/Productos/RegistroProductos/FormRegistroProuctos";
import { FormRegistroDetalleProducto } from "../../components/DetalleProducto/RegistroDetalleProducto";
import styles from "./registroProductos.module.scss";

const RegistroProductos = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.div_registroProductos}>
        <FormRegistroProuctos />
      </div>
      <div className={styles.div_registroDetalleProducto}>
        <FormRegistroDetalleProducto />
      </div>
    </div>
  );
};

export default RegistroProductos;
