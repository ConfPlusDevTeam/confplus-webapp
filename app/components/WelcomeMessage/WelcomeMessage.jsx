import React from "react";
import Image from "next/image";
import styles from "./WelcomeMessage.module.scss";
export default function WelcomeMessage({ props }) {
  return (
    <div className={styles.messageContainer}>
      <Image
        src="../../../assets/man-pic.svg"
        alt="Logo"
        width={40}
        height={40}
      />
      <h2>Hi, {props}</h2>
    </div>
  );
}
