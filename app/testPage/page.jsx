import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import ContentContainer from "../components/ContentContainer/ContentContainer";
import Tabs from "../components/Tabs/Tabs";
export default function page() {
  const links = [
    {
      name: "Home",
      link: "/",
    },

    {
      name: "Test",

      link: "/testPage",
    },

    {
      name: "Sign In",

      link: "/signin",
    },
  ];
  return <Tabs links={links} />;
}
