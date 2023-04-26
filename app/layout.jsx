// "use client";
import Link from "next/link";
import "./globals.scss";
import Background from "./components/Background/background";
import Navbar from "./components/Navbar/Navbar";
// import { useState } from "react";

export const metadata = {
  title: "ConfPlus",
  description: "WebProject",
};

export default function RootLayout({ children }) {
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
      name: "Schdeule",

      link: "/schedule",
    },

    {
      name: "Sign In",

      link: "/signin",
    },
  ];

  // const [isSignedIn, setIsSignedIn] = useState();
  // setIsSignedIn(from localStorage);
  // if (isSignedIn) {
  //   links[3].name = "Account";
  //   links[3].link = "/author"; // get the role from the local storage
  // }

  return (
    <html lang="en">
      <body>
        <Navbar links={links} />
        {children}
        <Background />
      </body>
    </html>
  );
}
