import React, { useEffect, useState } from "react";
import styles from "./formRegistro.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  selectCategoryState,
} from "../../../features/categoria/categoriaSlice";
import {
  getEspecies,
  selectEspecieState,
} from "../../../features/especie/especieSlice";
import {
  createProduct,
  selectProductoState,
} from "../../../features/producto/productoSlice";
import { Loader } from "../../LoaderComponent";
import ToastAlert from "../../Alerts";

const FormRegistroProuctos = () => {
  const [product, setProduct] = useState({
    name: "",
    idEspecie: "",
    idCategoria: "",
  });

  const dispatch = useDispatch();
  const categoriaData = useSelector(selectCategoryState);
  const { categorias } = categoriaData;
  const categoriaLoading = categoriaData.loading;
  const { status, categoriaItem } = categorias;

  const especieData = useSelector(selectEspecieState);
  const { especies } = especieData;
  const { especieItem } = especies;
  const especiesLoading = especieData.loading;

  const productResponse = useSelector(selectProductoState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const productRegister = (e) => {
    e.preventDefault();
    dispatch(createProduct(product));
  };

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getEspecies());
  }, []);

  useEffect(() => {
    console.log(productResponse.productos);
  }, [productResponse]);

  useEffect(() => {
    if (productResponse && productResponse.productos._id) {
      sessionStorage.setItem("productId", productResponse.productos._id);

      console.log("producto", sessionStorage.getItem("productId"));
    }
  }, [productResponse]);
  return (
    <div className={styles.div_main}>
      <div className={styles.div_card}>
        <div className={styles.div_title}>
          <h4>Registro de productos</h4>
        </div>
        <div className={styles.div_form}>
          <form className={styles.form} onSubmit={productRegister}>
            <Form.Control
              name="name"
              size="md"
              type="text"
              placeholder="Nombre del producto"
              className={styles.form_control}
              onBlur={handleInputChange}
            />
            {categoriaLoading && especiesLoading && <Loader />}
            {categoriaItem && categoriaItem.length > 0 && (
              <Form.Select
                className={styles.form_control}
                onBlur={handleInputChange}
                name="idCategoria"
              >
                <option>Seleccione una categoría</option>(
                {categoriaItem.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            )}

            {especieItem && especieItem.length > 0 && (
              <Form.Select
                className={styles.form_control}
                onBlur={handleInputChange}
                name="idEspecie"
              >
                <option>Seleccione una especie</option>(
                {especieItem.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            )}

            <div className={styles.div_buttons}>
              <div>
                <Button type="submit" className={styles.btn}>
                  Registrar Producto
                </Button>
              </div>
              <div>
                <Button className={styles.btn}>Menú Principal</Button>
              </div>
            </div>
            <div>
              {productResponse.loading && (
                <div>
                  <Loader />
                </div>
              )}
              {!productResponse.loading &&
                productResponse.productos.message ===
                  "Producto registrado con éxito" &&
                productResponse.productos.httpStatus === 200 &&
                productResponse.productos.status === "success" && (
                  <div>
                    <ToastAlert
                      message={productResponse.productos.message}
                      status={productResponse.productos.status}
                    />
                  </div>
                )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormRegistroProuctos;
