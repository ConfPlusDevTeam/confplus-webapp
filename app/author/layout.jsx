"use client";

import React from "react";
import ContentContainer from "../components/ContentContainer/ContentContainer";
import Tabs from "../components/Tabs/Tabs";
import styles from "./page.module.scss";
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage";

export default function AuthorLayout({ children }) {
  let count = 5;

  const user = JSON.parse(localStorage.getItem("user"));

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
