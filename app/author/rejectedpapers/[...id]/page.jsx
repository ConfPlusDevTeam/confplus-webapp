import React from "react";
import { loadReviewsForPaper } from "../../../api/papers/papers-repo";
import ViewPaperForm from "@/app/components/ViewPaperForm/ViewPaperForm";

export default async function page({ params }) {
  const { id } = params;
  const pid = id[0];
  const rid = id[1];

  const reviews = await loadReviewsForPaper(pid);
  const review = reviews[rid];
  console.log(reviews);

  return (
    <ViewPaperForm
      evaluation={review.evaluation}
      contribution={review.contribution}
      strengths={review.strengths}
      weaknesses={review.weaknesses}
    ></ViewPaperForm>
  );
}
