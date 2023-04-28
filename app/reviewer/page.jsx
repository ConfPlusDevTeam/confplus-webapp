import React from "react";
import ContentContainer from "@/app/components/ContentContainer/ContentContainer";
import Tabs from "@/app/components/Tabs/Tabs";
import WelcomeMessage from "@/app/components/WelcomeMessage/WelcomeMessage";
import styles from "./page.module.scss";
import PaperCards from "../components/PaperCards/PaperCards";

export default function Reviewer() {
  const links = [
    {
      name: "Assigned Papers",
      link: "/reviewer",
    },
    {
      name: "Reviewed Paper",
      link: "/reviewer/reviewpaper",
    },
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
