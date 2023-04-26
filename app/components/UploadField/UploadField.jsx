"use client";

import React, { useState } from "react";
import styles from "./UploadField.module.scss";

export default function UploadField() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    setFileName(event.target.files[0].name);
  };

  return (
    <div className={styles["file-input"]}>
      <label htmlFor="file-upload">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={styles["file-input-icon"]}
        >
          <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
        </svg>
        <span className={styles["file-input-label"]}>
          {fileName || "Select a File to Upload"}
        </span>
      </label>
      <input
        type="file"
        id="file-upload"
        className="file-input-upload"
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}