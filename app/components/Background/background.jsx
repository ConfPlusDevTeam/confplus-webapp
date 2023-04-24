import React from "react";
import Image from "next/image";
import styles from "./background.module.scss";
export default function Background() {
  return (
    <div id="illustration" className={styles.illustration}>
      <div id="overlay" className={styles.overlay}>
        <div className={styles.shapeContainerTop}>
          <div className={styles.shape1}></div>
          <div className={styles.shape4}></div>
        </div>
        <div className={styles.shape3}></div>
        <div className={styles.shapeContainerBottom}>
          <div className={styles.shape2}></div>
          <div className={styles.shape5}></div>
        </div>
      </div>
    </div>
  );
}
