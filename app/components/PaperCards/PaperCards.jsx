"use client";
import React from "react";
import styles from "./PaperCards.module.scss";
import ContentContainer from "../ContentContainer/ContentContainer";
import Link from "next/link";
import Button from "../Button/Button";
import { useState } from "react";
import "./PaperCards.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function PaperCards() {
  const router = useRouter();
  const user = localStorage.getItem("user");
  const userRole = JSON.parse(user).role;
  const [papers, setPapers] = useState([]);
  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    } else {
      if (userRole == "author") {
        const getAuthorPapers = async () => {
          const response = await fetch(
            `/api/papers?author=${JSON.parse(user).email}`
          ).then((response) => response.json());
          setPapers(await response);
        };
        getAuthorPapers();
        return;
      }

      if (userRole == "reviewer") {
        const getAssignedPapers = async () => {
          const response = await fetch(
            `/api/papers?reviewer=${JSON.parse(user).email}`
          ).then((response) => response.json());
          setPapers(await response);
        };
        getAssignedPapers();
        return;
      }
    }
  }, []);

  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  if (!papers) {
    return <div>No papers available</div>;
  }

  function handleClick(paper) {
    return (event) => {
      event.preventDefault();
      {
        router.push("/reviewer/reviewpaper");
        localStorage.setItem("paperTitle", JSON.stringify(paper.paperTitle));
        localStorage.setItem("fileLink", JSON.stringify(paper.fileLink));
      }
    };
  }

  return (
    <div className={styles.paperCards}>
      {papers.map((paper) => (
        <div className="card card-compact w-80 h-96 bg-base-100 shadow-xl">
          <figure>
            <img src="https://picsum.photos/330/100" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{paper.paperTitle}</h2>
            <p>{paper.abstract}</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>

        // <ContentContainer variant={2} className={styles}>
        //   <div className={styles.paperDetails}>
        //     <h3>{paper.paperTitle}</h3>
        //     <p>
        //       Authors:&nbsp;
        //       {paper.author +
        //         "," +
        //         paper.coAuthors.map((author) => " " + author.name)}
        //     </p>

        //     <div className={styles.showAbstract}>
        //       {toggle && <p>{paper.abstract}</p>}
        //       {!toggle && (
        //         <label for="arrow" className={styles.label}>
        //           Abstract:
        //         </label>
        //       )}
        //       <button
        //         className={toggle ? styles.button : styles.upButton}
        //         onClick={toggleHandler}
        //         id="arrow"
        //       >
        //         ^
        //       </button>
        //     </div>
        //   </div>
        //   {userRole == "reviewer" && (
        //     <Link
        //       className={styles.revButton}
        //       href="reviewer/reviewpaper"
        //       onClick={handleClick(paper)}
        //     >
        //       Review Paper
        //     </Link>
        //   )}
        // </ContentContainer>
      ))}
    </div>
  );
}
