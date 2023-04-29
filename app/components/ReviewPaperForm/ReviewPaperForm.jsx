import React from "react";
import styles from "./ReviewPaperForm.module.scss";
import ContentContainer from "../ContentContainer/ContentContainer";
import Link from "next/link";
import Image from "next/image";
export default function ReviewPaperForm() {
  return (
    <form className={styles.form}>
      <h3 className={styles.reviewPaper}>REVIEW PAPER</h3>
      <h4 className={styles.paperDetails}>PAPER DETAILS:</h4>
      <div className={styles.labelContainer}>
        <label className={styles.label}>Paper Title:</label>
        <p className={styles.paperTitle}>Paper Title</p>
      </div>
      <Link href={"#"} className={styles.downloadFileContainer}>
        <Image
          className={styles.loadImg}
          src="/assets/downloadPaper.png"
          width={40}
          height={40}
        />
        <h4 className={styles.downloadFile}>DOWNLOAD PAPER FILE</h4>
      </Link>
    </form>
  );
}
