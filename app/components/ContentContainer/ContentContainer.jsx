import React from "react";
import styles from "./ContentContainer.module.scss";

export default function ContentContainer({
  children,
  variant,
  title,
  className,
}) {
  return (
    <div className={className.container}>
      {variant == 1 && <h2 className={styles.title}>{title}</h2>}
      <div className={className.content}>{children}</div>
    </div>
  );
}
