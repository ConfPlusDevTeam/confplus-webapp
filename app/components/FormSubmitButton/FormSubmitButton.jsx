import React from 'react';
import Styles from'./FormSubmitButton.module.scss';

export default function FormSubmitButton({text}) {
  return (
    <button type="submit" className={Styles.button}>{text}</button>
  );
}
