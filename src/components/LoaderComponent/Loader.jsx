import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.div_main}>
      <div className={styles.loader}>
        <div className={styles.track}>
          <div className={styles.mouse}></div>
        </div>
        <div className={styles.face}>
          <div className={styles.ears_container}></div>
          <div className={styles.eyes_container}>
            <div className={styles.eye}></div>
            <div className={styles.eye}></div>
          </div>
          <div className={styles.phiz}>
            <div className={styles.nose}></div>
            <div className={styles.lip}></div>
            <div className={styles.mouth}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
