"use client";
import Link from "next/link";
import "./globals.scss";
import Background from "./components/Background/background";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

// export const metadata = {
//   title: "ConfPlus",
//   description: "WebProject",
// };

export default function RootLayout({ children }) {
  let links = [
    {
      name: "Home",
      link: "/",
    },

    {
      name: "Schedule",

      link: "/schedule",
    },

    {
      name: "Sign In",

      link: "/signin",
    },
  ];
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("user") == null ? false : true
  );

  if (isSignedIn) {
    const SignedInLinks = [
      {
        name: "Home",
        link: "/",
      },

      {
        name: "Schedule",

        link: "/schedule",
      },

      {
        name: "Dashboard",

        link: `/${JSON.parse(localStorage.getItem("user")).role}`,
      },
      {
        name: "Log Out",

        link: `/signin`,
      },
    ];

    links = SignedInLinks;
  }

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
