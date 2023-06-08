"use client";
import React from "react";
import styles from "./page.module.scss";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Tabs from "../../components/Tabs/Tabs";
import SubmitPaperForm from "../../components/SubmitPaperForm/SubmitPaperForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubmitPaper() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  let count = 2;

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    } else {
      const userRole = user.role;
      if (userRole !== "author") {
        router.push("/signin");
        return;
      }
    }
  }, []);

  return <SubmitPaperForm />;
}
