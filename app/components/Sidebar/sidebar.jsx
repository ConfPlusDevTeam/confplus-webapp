import React from "react";
import styles from "./sidebar.module.scss";

export default function sidebar() {
  return (
    <div>
      <nav className={styles.sidebarLandingpage}>
        <ul className={styles.sidebaList}>
          <li>
            <button className={styles.buttonLandingpage} onclick="">
              WELCOME
            </button>
          </li>
          <li>
            <button className={styles.buttonLandingpage} onclick="">
              SCHEDULE
            </button>
          </li>
          <li>
            <button className={styles.buttonLandingpage} onclick="">
              ABOUT
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
