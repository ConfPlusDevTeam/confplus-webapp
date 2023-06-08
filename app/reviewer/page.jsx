"use client";

import React from "react";
import ContentContainer from "@/app/components/ContentContainer/ContentContainer";
import Tabs from "@/app/components/Tabs/Tabs";
import WelcomeMessage from "@/app/components/WelcomeMessage/WelcomeMessage";
import styles from "./page.module.scss";
import PaperCards from "../components/PaperCards/PaperCards";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getPapersForReviewer } from "../api/papers/papers-repo";

export default function Reviewer() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  const [papers, setPapers] = React.useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    } else {
      const userRole = user.role;
      if (userRole !== "reviewer") {
        router.push("/signin");
        return;
      } else {
        const getPapers = async () => {
          const response = await getPapersForReviewer(user.id);
          setPapers(await response);
        };
        getPapers();
        return;
      }
    }
  }, []);

  const links = [
    {
      name: "Assigned Papers",
      link: "/reviewer",
    },
    // {
    //   name: "Reviewed Paper",
    //   link: "/reviewer/reviewpaper",
    // },
  ];

  return (
    <div className={styles.profile}>
      <WelcomeMessage props="Aly" />
      <ContentContainer variant={2} className={styles}>
        <Tabs links={links} className={styles} />
        <PaperCards />
      </ContentContainer>
    </div>
  );
}
