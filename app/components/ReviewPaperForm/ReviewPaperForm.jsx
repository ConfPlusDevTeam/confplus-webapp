"use client";
import React from "react";
import styles from "./ReviewPaperForm.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPaperForm() {
  const paperTitle = localStorage.getItem("paperTitle").replace(/[""]/g, "");
  console.log(paperTitle);
  const fileLink = localStorage.getItem("fileLink");
  const user = localStorage.getItem("user");
  const email = JSON.parse(user).email;
  const [reviews, setReviews] = useState([{}]);

  const router = useRouter();

  const [evaluation, setEvaluation] = useState();
  const [contribution, setContribution] = useState();
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");

  const handleEvaluationChange = (event) => {
    setEvaluation(event.target.value);
  };

  const handleContributionChange = (event) => {
    setContribution(event.target.value);
  };

  const handleStrengthsChange = (event) => {
    setStrengths(event.target.value);
  };

  const handleWeaknessesChange = (event) => {
    setWeaknesses(event.target.value);
  };

  useEffect(() => {
    const getReviews = async () => {
      const response = await fetch(
        `/api/papers/review?paperTitle=${paperTitle}`
      ).then((response) => response.json());
      setReviews(await response);
      return response.json();
    };
    const paperReviews = getReviews();
    console.log(paperReviews);
    const paperReview = paperReviews.find(
      (review) => review.reviewerEmail == email
    );
    console.log(paperReview);
  }, []);

  // console.log(paperReview);
  // setContribution(paperReview.contribution);
  // setEvaluation(paperReview.evaluation);
  // setStrengths(paperReview.strengths);
  // setWeaknesses(paperReview.weaknesses);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/papers/review", {
      method: "POST",
      body: JSON.stringify({
        paperTitle: paperTitle,
        reviewerEmail: email,
        status: "reviewed",
        evaluation: event.target.evaluation.value,
        contribution: event.target.contribution.value,
        strengths: event.target.strengths.value,
        weaknesses: event.target.weaknesses.value,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.reviewPaper}>REVIEW PAPER</h3>
      <h4 className={styles.paperDetails}>PAPER DETAILS:</h4>
      <div className={styles.labelContainer}>
        <label className={styles.label}>Paper Title:</label>
        <p className={styles.label}>{paperTitle}</p>
      </div>

      <Link href={fileLink} className={styles.downloadFileContainer}>
        <Image
          className={styles.loadImg}
          src="/assets/downloadPaper.png"
          alt="download paper"
          width={40}
          height={40}
        />
        <h4 className={styles.downloadFile}>DOWNLOAD PAPER FILE</h4>
      </Link>
      <label className={styles.label}>Overall Evaluation:</label>
      <input
        className={styles.inputRange}
        type="range"
        min={-2}
        max={2}
        step={1}
        value={evaluation}
        onChange={handleEvaluationChange}
        list={"evaluation-labels"}
      />

      <datalist id="evaluation-labels">
        <option value={-2} label="Strong Reject" />
        <option value={-1} label="Reject" />
        <option value={0} label="Borderline" />
        <option value={1} label="Accept" />
        <option value={2} label="Strong Accept" />
      </datalist>

      <label className={styles.label}>Paper Contribution: </label>
      <input
        className={styles.inputRange}
        type="range"
        min={1}
        max={5}
        step={1}
        value={contribution}
        list={"contribution-labels"}
        onChange={handleContributionChange}
      />

      <datalist id="contribution-labels">
        <option value={1} label="No obvious contribution" />
        <option value={2} label="No obvious contribution" />
        <option value={3} label="Minor contribution" />
        <option value={4} label="A clear contribution" />
        <option value={5} label="A major and significant contribution" />
      </datalist>

      <label className={styles.label}>Paper Strengths:</label>
      <textarea
        className={styles.textArea}
        type="text"
        placeholder="Enter Paper Strengths"
        value={strengths}
        onChange={handleStrengthsChange}
      />

      <label className={styles.label}>Paper Weaknesses:</label>
      <textarea
        className={styles.textArea}
        type="text"
        placeholder="Enter Paper Weaknesses"
        value={weaknesses}
        onChange={handleWeaknessesChange}
      />
      <div className={styles.submitBtn}>
        <Button variant={1} type="submit" text="Submit Review"></Button>
      </div>
    </form>
  );
}
