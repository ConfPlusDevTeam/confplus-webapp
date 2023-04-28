"use client";

import React from "react";
import Styles from "./Button.module.scss";

export default function Button({ children, variant, type, text, onClick }) {
  return (
    <button
      type={type}
      className={`${
        variant == 1
          ? Styles.signInButton
          : variant == 2
          ? Styles.button
          : Styles.link
      }`}
      onClick={onClick}
    >
      {variant == 3 && children}
      {text}
    </button>
  );
}
