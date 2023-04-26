import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import ContentContainer from "../components/ContentContainer/ContentContainer";
import Tabs from "../components/Tabs/Tabs";
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage";
import UploadField from "../components/UploadField/UploadField";
import styles from "./page.module.scss";
export default function page() {
  const links = [
    {
      name: "Home",
      link: "/testPage",
    },

    {
      name: "Test",

      link: "/testPage",
    },

    {
      name: "Sign In",

      link: "/testPage",
    },
  ];
  return (
    <div>
      <WelcomeMessage props={"Aly"} />
      <Tabs links={links} className={styles} />
      <UploadField />
    </div>
  );
}
