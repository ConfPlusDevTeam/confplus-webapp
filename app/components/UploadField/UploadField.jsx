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
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path d="M10 9h-6l8-9 8 9h-6v11h-4v-11zm11 11v2h-18v-2h-2v4h22v-4h-2z" />
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
