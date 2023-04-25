import React from 'react';
import Styles from'./FormField.module.scss';

export default function FormField({ label, type, placeholder }) {
  return (
    <div className={Styles.formField}>
      <label htmlFor="formInputField">{label}</label>
      <input type={type} id="formInputField" placeholder={placeholder} />
    </div>
  );
}
