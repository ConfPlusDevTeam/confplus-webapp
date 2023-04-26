import React from "react";
import styles from "./SubmitPaperForm.module.scss";
export default function SubmitPaperForm() {
  return (
    <form>
      <h3> SUBMIT FORM</h3>
      <h4 className={styles.paperDetails}>PAPER DETAILS:</h4>
      <label htmlFor="">TITLE</label>
    </form>
  );
}
