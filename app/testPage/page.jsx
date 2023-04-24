import React from "react";
import Navbar from "../components/Navbar/Navbar";

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
  return <Navbar links={links} />;
}
