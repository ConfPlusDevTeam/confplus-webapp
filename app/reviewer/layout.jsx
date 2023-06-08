"use client";

import React from "react";
import ContentContainer from "../components/ContentContainer/ContentContainer";
import Tabs from "../components/Tabs/Tabs";
import "./page.module.scss";
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage";
import styles from "./page.module.scss";

export default function ReviewLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const links = [
    {
      name: `Assigned Papers`,
      link: "/reviewer",
    },

    {
      name: "Reviewed Papers",
      link: "/reviewer/reviewedpapers",
    },
  ];

  return (
    <div className={styles.profile}>
      <WelcomeMessage
        props={JSON.parse(localStorage.getItem("user")).first_name}
      />
      <ContentContainer variant={2} className={styles}>
        <Tabs links={links} className={styles} />
        {children}
      </ContentContainer>
    </div>
  );
}
