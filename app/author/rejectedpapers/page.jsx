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
          const response = await fetch(`/api/papers?author=${user.email}`).then(
            (response) => response.json()
          );
          setPapers(await response);
        };
        getAuthorPapers();
        return;
      }
    }
  }, []);

  return (
    <div className={styles.paperCards}>
      {papers.map(
        (paper) =>
          paper.statues == "Rejected" && (
            <PaperCards
              id={key++}
              paperTitle={paper.paperTitle}
              coAuthors={paper.coAuthors}
              abstract={paper.abstract}
              statues={paper.statues}
              role={user.role}
            />
          )
      )}
    </div>
  );
}
