import React from "react";
import Authors from "../page";
import styles from "./page.module.scss";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Tabs from "../../components/Tabs/Tabs";

export default function SubmitPaper() {
  const links = [
    {
      name: "Submitted Papers",
      link: "/author",
    },
    {
      name: "Submit Paper",
      link: "/author/submitpaper",
    },
  ];
  return (
    <div className={styles.profile}>
      <WelcomeMessage props="Aly" />
      <ContentContainer variant={2} className={styles}>
        <Tabs links={links} className={styles} />
      </ContentContainer>
    </div>
  );
}
