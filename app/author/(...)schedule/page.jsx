import React from "react";
import styles from "./page.module.scss";
import FullSchedule from "../../components/FullSchedule/FullSchedule";
import Authors from "../page";

export default function Schdeule() {
  return (
    <>
      <Authors />
      <div className={styles.container}>
        <FullSchedule />
      </div>
    </>
  );
}
