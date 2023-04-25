import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function page() {
  const links = [
    {
      name: "Home",
      link: "/",
    },

    {
      name: "About",

      link: "/testPage",
    },
  ];
  return <Sidebar />;
}
