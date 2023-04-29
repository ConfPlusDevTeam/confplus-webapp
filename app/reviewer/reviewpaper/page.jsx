import React from "react";
import styles from "./page.module.scss";
import Reviewer from "../page";
import ReviewPaperForm from "../../components/ReviewPaperForm/ReviewPaperForm";
import ContentContainer from "@/app/components/ContentContainer/ContentContainer";
export default function ReviewPaper() {
  return (
    <ContentContainer variant={2} className={styles}>
      <ReviewPaperForm />
    </ContentContainer>
  );
}
