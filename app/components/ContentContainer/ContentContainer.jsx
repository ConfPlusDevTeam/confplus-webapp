import React from "react";
import styles from "./ContentContainer.module.scss";

export default function ContentContainer({ children, variant, title }) {
  return (
    <div className={styles.container}>
      {variant == 1 && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
