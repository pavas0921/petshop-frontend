import React, { useEffect, useState } from "react";
import styles from "./formRegistroDetalleProducto.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { precioVenta } from "../../../helpers/calcularPrecioVenta";
import { useDispatch, useSelector } from "react-redux";
import {
  createDetalleProducto,
  selectDetalleProductoState,
} from "../../../features/detalleProducto/detalleProductoSlice";

const FormRegistroDetalleProducto = () => {
  const dispatch = useDispatch();
  const detalleProductoResponse = useSelector(selectDetalleProductoState);

  const [detalleProducto, setDetalleProducto] = useState({
    presentacion: "",
    porcentajeUtilidad: 0,
    precioCosto: 0,
    stock: 0,
    precioVenta: 0,
    idProducto: "",
  });

  const [idProducto, setIdProducto] = useState(null);
  const [registerProductDetail, setRegisterProductDetail] = useState(false);

  useEffect(() => {
    if (!detalleProducto.idProducto) {
      setDetalleProducto((prevDetalleProducto) => ({
        ...prevDetalleProducto,
        idProducto: sessionStorage.getItem("productId"),
      }));
    }
  }, []);

  useEffect(() => {
    const precio_costo = +detalleProducto.precioCosto;
    const porcentaje_utilidad = +detalleProducto.porcentajeUtilidad;
    if (precio_costo && porcentaje_utilidad) {
      const margenGanancia = 1 - porcentaje_utilidad / 100;
      const precio_venta = Math.ceil(precio_costo / margenGanancia);

      setDetalleProducto((prevDetalleProducto) => ({
        ...prevDetalleProducto,
        precioVenta: precio_venta,
      }));
    }
  }, [detalleProducto.precioCosto, detalleProducto.porcentajeUtilidad]);

  useEffect(() => {
    console.log("respuesta", detalleProductoResponse);
  }, [detalleProductoResponse]);

  useEffect(() => {
    if (registerProductDetail && detalleProducto.idProducto) {
      console.log(registerProductDetail);
      //dispatch(createDetalleProducto(detalleProducto));
    }
  }, [registerProductDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetalleProducto((prevDetalleProducto) => ({
      ...prevDetalleProducto,
      [name]: value,
    }));
  };

  const registrarDetalle = (e) => {
    e.preventDefault();
    const product_id = sessionStorage.getItem("productId");
    setDetalleProducto((prevDetalleProducto) => ({
      ...prevDetalleProducto,
      idProducto: product_id,
    }));
    if (detalleProducto.idProducto) {
      console.log("idProducto***", detalleProducto.idProducto);
      dispatch(createDetalleProducto(detalleProducto));
    }
  };

  return (
    <div className={styles.div_main}>
      <div className={styles.div_card}>
        <div className={styles.div_title}>
          <h4>Detalles del Producto</h4>
        </div>
        <div className={styles.div_form}>
          <form className={styles.form} onSubmit={registrarDetalle}>
            <Form.Control
              size="md"
              type="text"
              placeholder="Presentación del Producto"
              className={styles.form_control}
              onChange={handleInputChange}
              name="presentacion"
            />
            <Form.Control
              size="md"
              type="number"
              placeholder="Porcentaje de utilidad %"
              className={styles.form_control}
              onChange={handleInputChange}
              name="porcentajeUtilidad"
            />
            <Form.Control
              size="md"
              type="number"
              placeholder="Precio compra"
              className={styles.form_control}
              onChange={handleInputChange}
              name="precioCosto"
            />
            <Form.Control
              size="md"
              type="number"
              placeholder="Precio venta"
              disabled
              readOnly
              className={styles.form_control}
              name="precioVenta"
              value={detalleProducto.precioVenta}
            />
            <Form.Control
              size="md"
              type="number"
              placeholder="Cantidad en stock"
              className={styles.form_control}
              onChange={handleInputChange}
              name="stock"
            />

            <div className={styles.div_buttons}>
              <div>
                <Button className={styles.btn} type="submit">
                  Registrar Detalle
                </Button>
              </div>
              <div>
                <Button className={styles.btn}>Menú Principal</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegistroDetalleProducto;
