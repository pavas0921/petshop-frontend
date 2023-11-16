import React, { useState, useEffect } from "react";
import styles from "./ventaForm.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { VentaTable } from "../VentaTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDetalleProducto,
  selectDetalleProductoState,
} from "../../../features/detalleProducto/detalleProductoSlice";
import { buscarProducto } from "../../../helpers/buscarProducto";

const VentaForm = () => {
  const [rows, setRows] = useState([]);
  const [headerVenta, setHeaderVenta] = useState({
    date: null,
    cliente: null,
    detalleVenta: [],
    totalVenta: null,
  });
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [totalVenta, setTotalVenta] = useState("");
  const dispatch = useDispatch();
  const detalleProductoResponse = useSelector(selectDetalleProductoState);
  const { detalleProductos } = detalleProductoResponse;
  const { item } = detalleProductos;

  useEffect(() => {
    dispatch(getAllDetalleProducto());
  }, []);

  useEffect(() => {
    console.log(rows);
    console.log(calcularTotal());
  }, [rows]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHeaderVenta((prevHeaderVenta) => ({
      ...prevHeaderVenta,
      [name]: value,
    }));
  };

  const handleProducto = (e) => {
    const { name, value } = e.target;
    setProducto((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCantidad = (e) => {
    const { name, value } = e.target;
    setCantidad((prevCantidad) => ({
      ...prevCantidad,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (producto && cantidad) {
      const productDetail = buscarProducto(item, producto, cantidad);
      console.log("****", productDetail);
      setRows([...rows, productDetail]);
      setProducto(""); // Restablecer a un valor vacío
      setCantidad(""); // Restablecer a un valor vacío
    } else {
      console.log(
        "Debe seleccionar un producto antes de agregarlo a la lista."
      );
    }
  };

  const calcularTotal = () => {
    const total = rows.reduce(
      (acumulador, rows) => acumulador + rows.precioTotal,
      0
    );
    setTotalVenta(total);
  };

  return (
    <div className={styles.div_main}>
      <div>
        <h4>Formulario de Venta</h4>
      </div>
      <div className={styles.div_form}>
        <form className={styles.form}>
          <div className={styles.div_input}>
            <Form.Control
              name="date"
              size="md"
              type="date"
              placeholder="Fecha"
              className={styles.dateInput}
              onBlur={handleInputChange}
            />
            <Form.Control
              name="cliente"
              size="md"
              type="text"
              placeholder="Nombre del Cliente"
              className={styles.clientNameInput}
              onBlur={handleInputChange}
            />
          </div>

          <div className={styles.div_input}>
            {item && item.length > 0 && (
              <Form.Select
                className={styles.productInput}
                onChange={(e) => setProducto(e.target.value)}
                name="producto"
                value={producto}
              >
                <option>Seleccione un producto</option>(
                {item.map((row, index) => (
                  <option key={index} value={row._id}>
                    {row.idProducto.name +
                      " " +
                      row.presentacion +
                      " Precio: " +
                      row.precioVenta}
                  </option>
                ))}
              </Form.Select>
            )}

            <Form.Control
              name="cantidad"
              size="md"
              type="text"
              placeholder="Cantidad"
              className={styles.qtyInput}
              onChange={(e) => setCantidad(e.target.value)}
              value={cantidad}
            />
          </div>
          <div className={styles.div_input}>
            <div className={styles.div_button}>
              <Button className={styles.btn} onClick={handleClick}>
                Agregar Producto
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.div_table}>
        {rows && rows.length > 0 ? (
          <VentaTable rows={rows} />
        ) : (
          <h6>Aún no ha seleccionado ningún producto</h6>
        )}

        <div className={styles.div_totalVenta}>
          <p>Total Venta: {totalVenta}</p>
        </div>
      </div>
    </div>
  );
};

export default VentaForm;
