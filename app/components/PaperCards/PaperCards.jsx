"use client";
import React from "react";
import styles from "./PaperCards.module.scss";
import ContentContainer from "../ContentContainer/ContentContainer";
import Link from "next/link";
import Button from "../Button/Button";
import * as papersRepo from "../../api/papers/papers-repo";

import { useRouter } from "next/navigation";

import "./PaperCards.module.scss";

export default function PaperCards(props) {
  const router = new useRouter();

  let key = 40;

  const handleDelete = async (id) => {
    await papersRepo.deletePaper(id);
    window.location.reload();
  };

  const handleReview = async (id) => {
    const paper = {
      id: id,
      paperTitle: props.paperTitle,
      abstract: props.abstract,
      authors: props.authors,
      fileLink: props.fileLink,
    };
    localStorage.setItem("paper", JSON.stringify(paper));
    router.push(`/reviewer/reviewpaper?id=${id}`);
    router.query = { id: id };
  };

  return (
    <div className={styles.paperCards}>
      <div className=" card card-compact md:flex w-auto h-auto m-2 bg-purple-800 bg-primary glass shadow-lg card-side hover:shadow-xl ease-in-out transition duration-600 ">
        <figure>
          <img src={`https://picsum.photos/id/${props.id}/300/460`} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[13px] font-bold">
            {props.paperTitle}
          </h2>
          <div className="dropdown ">
            <label
              tabIndex={0}
              className="btn btn-primary btn-sm  bg-purple-900 normal-case text-[11px]"
            >
              Abstract
            </label>
            <div
              tabIndex={0}
              //how to make this dropdown only inside the card
              className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content bg-purple-900 absolute right-0 top-full z-10 "
            >
              <div className="card-body ">
                <p className="text-[11px]">{props.abstract}</p>
              </div>
            </div>
          </div>
          <p className="text-[11px]">
            <p className="font-semibold  ">Authors:&nbsp;</p>
            {props.authors?.map(
              (author) =>
                "" +
                "(" +
                author.user.first_name +
                " " +
                author.user.last_name +
                ")"
            )}
          </p>

          {props.status == "Pending" && (
            <div className="badge badge-success gap-2 text-[11px] font-semibold bg-amber-600">
              &nbsp;
              {props.status}
            </div>
          )}
          {props.status == "Accepted" && (
            <div className="badge badge-success gap-2 text-[11px] font-semibold bg-lime-500">
              {props.status}
            </div>
          )}
          {props.status == "Rejected" && (
            <div className="badge badge-success gap-2 text-[11px] font-semibold bg-red-600">
              {props.status}
            </div>
          )}
          <div className="card-actions justify-center ">
            {props.role == "reviewer" && (
              <button
                className="btn btn-xs bg-purple-900 "
                onClick={() => handleReview(props.id)}
              >
                Review Paper
              </button>
            )}
            {props.status == "Rejected" && (
              <Link
                href={`/author/rejectedpapers/${props.id}/0`}
                className="btn btn-primary btn-sm   text-[11px]  bg-purple-900 border-none"
              >
                View 1st Review
              </Link>
            )}
            {props.status == "Rejected" && (
              <Link
                href={`/author/rejectedpapers/${props.id}/1`}
                className="btn btn-primary btn-sm  text-[11px]  bg-purple-900 border-none"
              >
                View 2nd Review
              </Link>
            )}
            {props.status == "Rejected" && (
              <button
                className="btn btn-primary btn-sm  text-[10px] btn-wide bg-red-600 border-none"
                onClick={() => handleDelete(props.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
