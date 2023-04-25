"use client";

import React from "react";
import styles from "./Sidebar.module.scss";
import { useState } from "react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("welcome");

  return (
    <div className={styles.sidebarMenu}>
      <button
        className={`${styles.tabButton} ${
          activeTab === "welcome" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("welcome")}
      >
        Welcome
      </button>
      <button
        className={`${styles.tabButton} ${
          activeTab === "schedule" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("schedule")}
      >
        Schedule
      </button>
      <button
        className={`${styles.tabButton} ${
          activeTab === "about" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("about")}
      >
        About
      </button>
    </div>
  );
}
