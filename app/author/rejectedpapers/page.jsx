"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Tabs from "../../components/Tabs/Tabs";
import PaperCards from "../../components/PaperCards/PaperCards";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const [papers, setPapers] = useState([]);
  let key = 50;

  let count = 0;

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    } else {
      const userRole = user.role;
      if (userRole !== "author") {
        router.push("/signin");
        return;
      } else {
        const getAuthorPapers = async () => {
          const response = await fetch(
            `/api/users/${user.id}/author?status=Rejected`
          ).then((response) => response.json());
          setPapers(await response);
        };
        getAuthorPapers();
        return;
      }
    }
  }, []);

  return (
    <div className={styles.paperCards}>
      {papers?.map((paper) => (
        <PaperCards
          id={paper.id}s
          paperTitle={paper.paperTitle}
          authors={paper.authors}
          abstract={paper.abstract}
          status={paper.status}
          role={user.role}
        />
      ))}
    </div>
  );
}
