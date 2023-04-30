"use client";
import React from "react";
import styles from "./ReviewPaperForm.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPaperForm() {
  return (
    <form className={styles.form}>
      <h3 className={styles.reviewPaper}>REVIEW PAPER</h3>
      <h4 className={styles.paperDetails}>PAPER DETAILS:</h4>
      <div className={styles.labelContainer}>
        <label className={styles.label}>Paper Title:</label>
        <p className={styles.paperTitle}></p>
      </div>
      <Link href="#" className={styles.downloadFileContainer}>
        <Image
          className={styles.loadImg}
          src="/assets/downloadPaper.png"
          width={40}
          height={40}
        />
        <h4 className={styles.downloadFile}>DOWNLOAD PAPER FILE</h4>
      </Link>
      <label className={styles.label}>Overall Evaluation:</label>
      <input
        className={styles.inputRange}
        type="range"
        min={-2}
        max={2}
        step={1}
        defaultValue={0}
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
        defaultValue={3}
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
        value={""}
      />

      <label className={styles.label}>Paper Weaknesses:</label>
      <textarea
        className={styles.textArea}
        type="text"
        placeholder="Enter Paper Weaknesses"
        value={""}
      />
      <div className={styles.submitBtn}>
        <Button variant={1} type="submit" text="Submit Review"></Button>
      </div>
    </form>
  );
}
