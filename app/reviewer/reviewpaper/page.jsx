"use client";
import React from "react";
import styles from "./page.module.scss";
import Reviewer from "../page";
import ReviewPaperForm from "../../components/ReviewPaperForm/ReviewPaperForm";
import ContentContainer from "@/app/components/ContentContainer/ContentContainer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function ReviewPaper() {
  const router = useRouter();
  const { id } = router.query;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    } else {
      const userRole = user.role;
      if (userRole !== "reviewer") {
        router.push("/signin");
        return;
      }
    }
  }, []);

  return <ReviewPaperForm id={id} />;
}
