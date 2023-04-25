import React from 'react';
import './FormField.scss';

export default function FormField({ label, type, placeholder }) {
  return (
    <div className="form-field">
      <label htmlFor="formInputField">{label}</label>
      <input type={type} id="formInputField" placeholder={placeholder} />
    </div>
  );
}
