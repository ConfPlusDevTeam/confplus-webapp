"use client";
import React from "react";
import Image from "next/image";
import styles from "./WelcomeMessage.module.scss";

export default function WelcomeMessage() {
  const user = localStorage.getItem("user");
  const name = JSON.parse(user).first_name;
  return (
    <div className={styles.messageContainer}>
      <Image
        src="../../../assets/man-pic.svg"
        alt="Logo"
        width={40}
        height={40}
      />
      <h2>Hi, {name}!</h2>
    </div>
  );
}
