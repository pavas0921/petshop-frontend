import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDetalleProducto,
  selectDetalleProductoState,
} from "../../../features/detalleProducto/detalleProductoSlice";
import {
  createVenta,
  selectVentasState,
} from "../../../features/venta/ventaSlice";
import { adicionarCantidad } from "../../../helpers/adicionarCantidad";
import { buscarProducto } from "../../../helpers/buscarProducto";
import { calcularTotal } from "../../../helpers/calcularTotal";
import ToastAlert from "../../Alerts";
import { Loader } from "../../LoaderComponent";
import { VentaTable } from "../VentaTable";
import styles from "./ventaForm.module.scss";

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
  const detalleProductoLoading = detalleProductoResponse.loading;
  const { item } = detalleProductos;
  const ventaResponse = useSelector(selectVentasState);
  const ventaLoading = ventaResponse.loading;
  const { ventas } = ventaResponse || {};
  const { httpStatus, message, status } = ventas;

  useEffect(() => {
    dispatch(getAllDetalleProducto());
  }, []);

  useEffect(() => {
    console.log("***", detalleProductoLoading);
  }, [detalleProductoLoading]);

  useEffect(() => {
    console.log(headerVenta);
  }, [headerVenta]);

  useEffect(() => {
    const total = calcularTotal(rows);
    setHeaderVenta((prevHeaderVenta) => ({
      ...prevHeaderVenta,
      totalVenta: total,
    }));
    setHeaderVenta((prevHeaderVenta) => ({
      ...prevHeaderVenta,
      detalleVenta: rows,
    }));
  }, [rows]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const formattedDate = new Date(value).toISOString();
      setHeaderVenta((prevState) => ({ ...prevState, [name]: formattedDate }));
    } else {
      setHeaderVenta((prevHeaderVenta) => ({
        ...prevHeaderVenta,
        [name]: value,
      }));
    }
  };

  const handleClick = () => {
    if (producto && cantidad) {
      if (rows.length > 0) {
        const updatedRows = adicionarCantidad(rows, producto, cantidad);
        if (updatedRows) {
          setRows(updatedRows);
        } else {
          const productDetail = buscarProducto(item, producto, cantidad);
          setRows([...rows, productDetail]);
          setProducto(""); // Restablecer a un valor vacío
          setCantidad(""); // Restablecer a un valor vacío*/
        }
      } else {
        const productDetail = buscarProducto(item, producto, cantidad);
        setRows([...rows, productDetail]);
        setProducto(""); // Restablecer a un valor vacío
        setCantidad(""); // Restablecer a un valor vacío*/
      }
    } else {
      console.log(
        "Debe seleccionar un producto antes de agregarlo a la lista."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVenta(headerVenta));
  };

  return (
    <div className={styles.div_main}>
      {ventaLoading && (
        <div>
          <Loader />
        </div>
      )}

      {detalleProductoLoading && (
        <div>
          <Loader />
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.div_form}>
          <div className={styles.div_title}>
            <h4>Formulario de Venta</h4>
          </div>
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
        </div>

        <div className={styles.card_table}>
          {rows && rows.length > 0 ? (
            <div>
              <VentaTable rows={rows} />
            </div>
          ) : (
            <div>
              <h6>Aún no ha seleccionado ningún producto</h6>
            </div>
          )}
          <div className={styles.div_footer}>
            <div className={styles.div_totalVenta}>
              <p>Total Venta: {headerVenta.totalVenta}</p>
            </div>
            <div className={styles.div_finalizarVentaBtn}>
              {rows.length > 0 && !ventaLoading && (
                <Button className={styles.btn} type="submit">
                  Finalizar Venta
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>

      {!ventaLoading &&
        message === "Venta registrada con éxito" &&
        httpStatus === 200 &&
        status === "success" && (
          <div>
            <ToastAlert message={message} status={status} />
          </div>
        )}
    </div>
  );
};

export default VentaForm;
