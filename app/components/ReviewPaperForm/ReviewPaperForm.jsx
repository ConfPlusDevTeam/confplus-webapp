"use client";
import React, { use } from "react";
import styles from "./ReviewPaperForm.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPaperForm(props) {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const reviewerEmail = JSON.parse(localStorage.getItem("user")).email;
  const paper = JSON.parse(localStorage.getItem("paper"));

  const [reviews, setReviews] = useState({});

  const [evaluation, setEvaluation] = useState(0);
  const [contribution, setContribution] = useState(0);
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

  async function getReviews() {
    const response = await fetch(
      `/api/papers/review?paperId=${props.id}?reviewerId=${user.id}`
    ).then((response) => response.json());
    if (!response) {
      return;
    }
    setReviews(await response);
    return response;
  }

  console.log(reviews);

  useEffect(() => {
    async function fetchData() {
      const response = await getReviews();
      console.log(response);
      const paperReview = response;
      setContribution(paperReview.contribution);
      setStrengths(paperReview.strengths);
      setWeaknesses(paperReview.weaknesses);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/papers/review", {
      method: "POST",
      body: JSON.stringify({
        paperId: props.id,
        reviewerId: user.id,
        evaluation: evaluation,
        contribution: contribution,
        strengths: strengths,
        weaknesses: weaknesses,
      }),
    });
    const data = await response.json();
    console.log(data);
    router.push("/reviewer");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.reviewPaper}>REVIEW PAPER</h3>
      <h4 className={styles.paperDetails}>PAPER DETAILS:</h4>
      <div className={styles.labelContainer}>
        <label className={styles.label}>Paper Title:</label>
        <p className={styles.label}>{paper.paperTitle}</p>
      </div>

      <Link href={paper.fileLink} className={styles.downloadFileContainer}>
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
