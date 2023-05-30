import React from "react";
import Image from "next/image";
import styles from "./background.module.scss";

import { motion } from "framer-motion";

export default function Background() {
  const bounceTransition = {
    y: {
      duration: 3.5,
      repeatType: "reverse",
      repeat: Infinity,
      ease: "easeOut",
    },
  };
  return (
    <div id="illustration" className={styles.illustration}>
      <div id="overlay" className={styles.overlay}>
        <div className={styles.shapeContainerTop}>
          <motion.div
            animate={{ y: ["10%", "-10%"] }}
            transition={bounceTransition}
            className={styles.shape1}
          ></motion.div>
          <motion.div
            animate={{ y: ["10%", "-10%"] }}
            transition={bounceTransition}
            className={styles.shape4}
          ></motion.div>
        </div>
        <motion.div
          animate={{ y: ["10%", "-10%"] }}
          transition={bounceTransition}
          className={styles.shape3}
        ></motion.div>
        <div className={styles.shapeContainerBottom}>
          <motion.div
            animate={{ y: ["10%", "-10%"] }}
            transition={bounceTransition}
            className={styles.shape2}
          ></motion.div>
          <motion.div
            animate={{ y: ["10%", "-10%"] }}
            transition={bounceTransition}
            className={styles.shape5}
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
