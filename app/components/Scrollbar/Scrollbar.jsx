import React from "react";
import Styles from "./Scrollbar.module.scss";

export default function Scrollbar() {
  return (
    <div className={Styles.scrollBar}>
      <span>Scroll for more</span>
      <svg
        width="27"
        height="26"
        viewBox="0 0 27 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.3912 7.52809C4.6104 5.13526 6.59971 3.22258 9.03856 2.09826C11.4774 0.973931 14.2238 0.703437 16.8351 1.33036C19.4464 1.95729 21.7707 3.44512 23.4333 5.55412C25.0959 7.66312 26 10.2705 26 12.956C26 15.6415 25.0959 18.2489 23.4333 20.3579C21.7707 22.4668 19.4464 23.9547 16.8351 24.5816C14.2238 25.2085 11.4774 24.938 9.03855 23.8137C6.5997 22.6894 4.6104 20.7767 3.39119 18.3839M-5.22612e-07 12.956L16.6322 12.956M16.6322 12.956C16.6322 12.956 14.2032 10.527 12.6468 8.97067M16.6322 12.956C16.6322 12.956 14.2032 15.3849 12.6468 16.9413"
          stroke="#E4E4F0"
          strokeWidth="0.75"
        />
      </svg>
    </div>
  );
}
