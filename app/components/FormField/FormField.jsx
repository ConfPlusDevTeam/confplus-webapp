import React from "react";
import Styles from "./FormField.module.scss";

export default function FormField({ label, type, placeholder, variant }) {
  return (
    <div
      className={`${
        variant == 1 ? Styles.signInForm : variant == 2 ? Styles.formField : ""
      }`}
    >
      <label htmlFor={label}>{label}</label>
      <input required type={type} id={label} placeholder={placeholder} />
    </div>
  );
}
