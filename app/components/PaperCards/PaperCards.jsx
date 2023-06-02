"use client";
import React, { use } from "react";
import styles from "./PaperCards.module.scss";
import ContentContainer from "../ContentContainer/ContentContainer";
import Link from "next/link";
import Button from "../Button/Button";
import { useState } from "react";
import "./PaperCards.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function PaperCards(props, role) {
  let key = 40;
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    router.push("/reviewer/reviewpaper");
    router.query = { id: props.id };
  };

  return (
    <div className={styles.paperCards}>
      <div className="card card-compact md:flex w-auto h-auto bg-purple-800 bg-primary glass shadow-lg card-side hover:shadow-xl ease-in-out transition duration-600">
        <figure>
          <img src={`https://picsum.photos/id/${props.id}/300/330`} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[13px] font-bold">
            {props.paperTitle}
          </h2>
          <p className="text-[11px]">
            <p className="font-semibold  ">Co Authors:&nbsp;</p>
            {props.coAuthors?.map((author) => "" + "(" + author.name + ")")}
          </p>
          {show && (
            <p className="text-[11px]">
              <p className="font-semibold  ">Abstract:&nbsp;</p>
              {props.abstract}
            </p>
          )}
          {props.statues == "Pending" && (
            <div className="badge badge-success gap-2 text-[11px] font-semibold bg-amber-600">
              Statues: &nbsp;
              {props.statues}
            </div>
          )}
          {props.statues == "Accepted" && (
            <div className="badge badge-success gap-2 text-[11px] font-semibold bg-lime-500">
              Statues: &nbsp;
              {props.statues}
            </div>
          )}
          {props.statues == "Refused" && (
            <div className="badge badge-success gap-2 text-[11px] font-semibold bg-red-600">
              Statues: &nbsp;
              {props.statues}
            </div>
          )}
          <div className="card-actions justify-end ">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <div className="text-[10px]">Hide Abstract</div>
              ) : (
                <div className="text-[10px]">Show Abstract</div>
              )}
            </button>
            {role == "reviewer" && (
              <button
                className="btn btn-sm btn-secondary "
                onClick={() => handleClick()}
              >
                Review Paper
              </button>
            )}
            {props.statues == "Accepted" ||
              (props.statues == "Refused" && (
                <button
                  className="btn btn-sm btn-primary text-[10px]"
                  onClick={() => handleClick()}
                >
                  View 1st Review
                </button>
              ))}
            {props.statues == "Accepted" ||
              (props.statues == "Refused" && (
                <button
                  className="btn btn-sm btn-primary text-[10px]"
                  onClick={() => handleClick()}
                >
                  View 2nd Review
                </button>
              ))}
          </div>
        </div>
      </div>
      {/* // <ContentContainer variant={2} className={styles}>
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
          // </ContentContainer> */}
    </div>
  );
}
