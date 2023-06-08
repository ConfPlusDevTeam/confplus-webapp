"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Tabs from "../../components/Tabs/Tabs";
import PaperCards from "../../components/PaperCards/PaperCards";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const [papers, setPapers] = React.useState([]);
  let key = 50;

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
      } else {
        const getAuthorPapers = async () => {
          const response = await fetch(
            `/api/users/${user.id}/author?status=Accepted`
          ).then((response) => response.json());
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
      name: "Accepted Papers",
      link: "/author/acceptedpapers",
    },
    {
      name: `Rejected Papers (${count})`,
      link: "/author/rejectedpapers",
    },

    {
      name: "Submit Paper",
      link: "/author/submitpaper",
    },
  ];
  return (
    <div className={styles.paperCards}>
      {papers?.map((paper) => (
        <PaperCards
          id={paper.id}
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
