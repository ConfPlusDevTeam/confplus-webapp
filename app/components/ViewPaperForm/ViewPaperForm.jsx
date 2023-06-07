import React from "react";
import styles from "./ViewPaperForm.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function ViewPaperForm(props) {
  return (
    <form className={styles.form}>
      <h3 className={styles.reviewPaper}>PAPER REVIEW</h3>
      <h4 className={styles.paperDetails}>PAPER DETAILS:</h4>
      <label className={styles.label}>Overall Evaluation:</label>
      <input
        className={styles.inputRange}
        type="range"
        min={-2}
        max={2}
        step={1}
        value={props.evaluation}
        list={"evaluation-labels"}
      />

      <datalist id="evaluation-labels">
        <option value={-2} label="Strong Reject" />
        <option value={-1} label="Reject" />
        <option value={0} label="Borderline" />
        <option value={1} label="Accept" />
        <option value={2} label="Strong Accept" />
      </datalist>

      <label className={styles.label}>Paper Contribution: </label>
      <input
        className={styles.inputRange}
        type="range"
        min={1}
        max={5}
        step={1}
        value={props.contribution}
        list={"contribution-labels"}
      />

      <datalist id="contribution-labels">
        <option value={1} label="No obvious contribution" />
        <option value={2} label="No obvious contribution" />
        <option value={3} label="Minor contribution" />
        <option value={4} label="A clear contribution" />
        <option value={5} label="A major and significant contribution" />
      </datalist>

      <label className={styles.label}>Paper Strengths:</label>
      <textarea
        className={styles.textArea}
        type="text"
        placeholder="Enter Paper Strengths"
        value={props.strengths}
      />

      <label className={styles.label}>Paper Weaknesses:</label>
      <textarea
        className={styles.textArea}
        type="text"
        placeholder="Enter Paper Weaknesses"
        value={props.weaknesses}
      />
    </form>
  );
}
