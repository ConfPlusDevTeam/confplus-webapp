"use client";
import React from "react";
import styles from "./PaperCards.module.scss";
import ContentContainer from "../ContentContainer/ContentContainer";
import Link from "next/link";
import Button from "../Button/Button";
import { useState } from "react";

import "./PaperCards.module.scss";

export default function PaperCards(
  paperTitle,
  paperAuthor,
  paperAbstract,
  paperStatus,
  paperId
) {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className={styles.cards}>
      <ContentContainer variant={2} className={styles}>
        <div className={styles.paperDetails}>
          <h3>paperTitle</h3>
          <p>Authors: Aly Soliman, coAuthors</p>

          <div className={styles.showAbstract}>
            {toggle && (
              <p>
                Abstract: Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Ea molestias excepturi necessitatibus cupiditate quod
                iusto, veritatis dicta animi tempore praesentium vitae veniam at
                iste quidem esse voluptas dolor nesciunt tenetur.
              </p>
            )}
            {!toggle && (
              <label for="arrow" className={styles.label}>
                Abstract:
              </label>
            )}
            <button
              className={toggle ? styles.button : styles.upButton}
              onClick={toggleHandler}
              id="arrow"
            >
              ^
            </button>
          </div>
        </div>
        <Link className={styles.revButton} href="/reviewer/reviewpaper">
          Review Paper
        </Link>
      </ContentContainer>
    </div>
  );
}
