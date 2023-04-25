"use client";

import React from "react";
import styles from "./Sidebar.module.scss";
import { useState } from "react";

export default function Sidebar({ onclick, activeElement }) {
  const [activeTab, setActiveTab] = useState(activeElement);

  return (
    <div className={styles.sidebarMenu}>
      <button
        className={`${styles.tabButton} ${
          activeTab === "welcome" ? styles.active : ""
        }`}
        onClick={() => {
          onclick("welcome");
          setActiveTab("welcome");
        }}
      >
        Welcome
      </button>
      <button
        className={`${styles.tabButton} ${
          activeTab === "schedule" ? styles.active : ""
        }`}
        onClick={() => {
          onclick("schedule");
          setActiveTab("schedule");
        }}
      >
        Schedule
      </button>
      <button
        className={`${styles.tabButton} ${
          activeTab === "about" ? styles.active : ""
        }`}
        onClick={() => {
          onclick("about");
          setActiveTab("about");
        }}
      >
        About
      </button>
    </div>
  );
}
