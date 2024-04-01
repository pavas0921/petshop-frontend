import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
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
import { agregarProducto } from "../../../helpers/agregarProducto";
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
    originalDate: null,
    cliente: null,
    detalleVenta: [],
    totalVenta: null,
  });
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [totalVenta, setTotalVenta] = useState("");
  const [msgError, setMsgError] = useState({ status: false, error: "" });
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
    if (
      httpStatus === 200 &&
      message === "Venta registrada con éxito e inventario actualizado." &&
      status === "success"
    ) {
      setRows([]);
      setHeaderVenta({
        date: "", // date ISO format
        originalDate: "", // date "YYYY-MM-DD" format
        cliente: "",
        detalleVenta: [],
        totalVenta: null,
      });
    }
  }, [ventaResponse]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "originalDate") {
      const formattedDate = new Date(value).toISOString();
      setHeaderVenta((prevState) => ({ ...prevState, [name]: value }));
      setHeaderVenta((prevState) => ({ ...prevState, date: formattedDate }));
    } else {
      setHeaderVenta((prevHeaderVenta) => ({
        ...prevHeaderVenta,
        [name]: value,
      }));
    }
  };

  const handleClick = () => {
    //Valida que se haya elegido un producto y una cantidad
    //Cuando se hace click en el boton registrar
    if (producto && cantidad) {
      //Valida que haya uno o mas registros en el listado de productos a vender (rows)
      if (rows.length > 0) {
        const updatedRows = buscarProducto(rows, producto, cantidad);

        //si updated rows es menor que cero se cargan nuevamente todos los productos
        if (updatedRows < 0) {
          dispatch(getAllDetalleProducto());
          const productDetail = agregarProducto(item, producto, cantidad, rows);
          if (productDetail.rows === null) {
            setMsgError({ status: true, error: productDetail.error });
            setProducto(""); // Restablecer a un valor vacío
            setCantidad(""); // Restablecer a un valor vacío*/
          } else {
            setRows([...rows, productDetail.rows]);
            setMsgError({ status: true, error: productDetail.error });
            setProducto(""); // Restablecer a un valor vacío
            setCantidad(""); // Restablecer a un valor vacío*/
          }
        }

        // Si updatedrows es mayor o igual a cero carga todos los productos
        else {
          dispatch(getAllDetalleProducto());
          const productDetail = adicionarCantidad(
            rows,
            producto,
            cantidad,
            item
          );
          //Si hay un error se agrega a la lista lo que retorne adicionar cantidad
          if (productDetail.error) {
            setRows(productDetail.rows);
            setMsgError({ status: true, error: productDetail.error });
            setProducto(""); // Restablecer a un valor vacío
            setCantidad(""); // Restablecer a un valor vacío*/
          }
          //Sino hay errores se adiciona al producto la cantidad ingresada
          else {
            setRows(productDetail.rows);
            setMsgError({
              status: true,
              error: "¡Se adiciono cantidad con éxito!",
            });
            setProducto(""); // Restablecer a un valor vacío
            setCantidad(""); // Restablecer a un valor vacío*/
          }
        }
      }

      //Se agrega el primer producto cuando la lista está vacía
      else {
        dispatch(getAllDetalleProducto());
        const productDetail = agregarProducto(item, producto, cantidad);
        //si productDetail.rows es null se muestra notificacion
        if (productDetail.rows === null) {
          setMsgError({ status: true, error: productDetail.error });
          setProducto(""); // Restablecer a un valor vacío
          setCantidad(""); // Restablecer a un valor vacío*/
        }
        //si productDetail.rows es diferente de null se agrega producto a la lista
        //y se muestra notificacion
        else {
          setRows([...rows, productDetail.rows]);
          setMsgError({ status: true, error: productDetail.error });
          setProducto(""); // Restablecer a un valor vacío
          setCantidad(""); // Restablecer a un valor vacío*/
        }
      }
    }
    //Imprime mensaje de error cuando no se ingresa cantidad y producti
    else {
      setMsgError({
        status: true,
        error:
          "Debe seleccionar un producto y la cantidad antes de agregarlo a la lista.",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVenta(headerVenta));
  };

  const isOptionEqualToValue = (option, value) =>
    option.idDetalle === value.idDetalle;

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
            <TextField
              name="originalDate"
              margin="normal"
              className={styles.dateInput}
              required
              fullWidth
              type="date"
              autoComplete="date"
              autoFocus
              onChange={handleInputChange}
              value={headerVenta.originalDate || ""}
            />

            <TextField
              name="cliente"
              margin="normal"
              className={styles.clientNameInput}
              required
              fullWidth
              label="Cliente"
              type="text"
              autoComplete="cliente"
              autoFocus
              onChange={handleInputChange}
              value={headerVenta.cliente || ""}
            />
          </div>

          <div className={styles.div_input}>
            {item && item.length > 0 && (
              <Autocomplete
                className={styles.productInput}
                onChange={(event, newValue) => {
                  setProducto(newValue ? newValue.idDetalle : "");
                }}
                disablePortal
                name="producto"
                options={item}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.nombreProducto}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={producto || "Seleccione un producto"}
                  />
                )}
                key={(option) => option.idDetalle}
                isOptionEqualToValue={isOptionEqualToValue}
              />
            )}

            <TextField
              name="cantidad"
              margin="normal"
              className={styles.qtyInput}
              required
              fullWidth
              label="Cantidad"
              type="text"
              autoComplete="Cantidad"
              autoFocus
              onChange={(e) => setCantidad(e.target.value)}
              value={cantidad || ""}
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
            <div className={styles.ventaTable}>
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
        message === "Venta registrada con éxito e inventario actualizado." &&
        httpStatus === 200 &&
        status === "success" && (
          <div>
            <ToastAlert message={message} status={status} />
          </div>
        )}
      {msgError.status && cantidad === "" && producto === "" && (
        <div>
          <ToastAlert message={msgError.error} status="error" />
        </div>
      )}
    </div>
  );
};

export default VentaForm;
