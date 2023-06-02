"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage";
import ContentContainer from "../components/ContentContainer/ContentContainer";
import Tabs from "../components/Tabs/Tabs";
import PaperCards from "../components/PaperCards/PaperCards";
import { useRouter } from "next/navigation";

export default function Authors() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const [papers, setPapers] = React.useState([]);
  let key = 50;

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

  const links = [
    {
      name: "Pending Papers",
      link: "/author",
    },
    {
      name: "Reviewed Papers",
      link: "/author/reviewedpapers",
    },
    {
      name: "Submit Paper",
      link: "/author/submitpaper",
    },
  ];
  return (
    <div className={styles.profile}>
      <WelcomeMessage
        props={JSON.parse(localStorage.getItem("user")).first_name}
      />
      <ContentContainer variant={2} className={styles}>
        <Tabs links={links} className={styles} />
        <div className={styles.paperCards}>
          {papers.map(
            (paper) =>
              paper.statues == "Pending" && (
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
      </ContentContainer>
    </div>
  );
}
