"use client";

import React from "react";
import Styles from "./Button.module.scss";

export default function Button({ variant, type, text, onClick }) {
  return (
    <button
      type={type}
      className={`${
        variant == 1 ? Styles.signInButton : variant == 2 ? Styles.button : ""
      }`}
      onSubmit={onClick}
    >
      {text}
    </button>
  );
}
