import React from "react";
import styles from "./SubmitPaperForm.module.scss";
export default function SubmitPaperForm() {
  return (
    <form className={styles.form}>
      <h3 className={styles.submitForm}> SUBMIT FORM</h3>
      <h4 className={styles.paperDetails}>PAPER DETAILS:</h4>
      <label className={styles.label}>TITLE:</label>
      <input className={styles.input} type="text" placeholder="Enter Title" />
    </form>
  );
}
