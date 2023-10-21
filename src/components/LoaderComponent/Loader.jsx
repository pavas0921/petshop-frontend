import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className="styles.loader_container">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
