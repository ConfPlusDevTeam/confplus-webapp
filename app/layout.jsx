"use client";
import Footer from "./components/Footer/Footer";
import Link from "next/link";
import styles from "./globals.scss";
import Background from "./components/Background/background";
import Navbar from "./components/Navbar/Navbar";
import { useNavLinksStore } from "./stores/navlinks";
import { useEffect } from "react";
// export const metadata = {
//   title: "ConfPlus",
//   description: "WebProject",
// };

export default function RootLayout({ children }) {
  // let links = [
  //   {
  //     name: "Information",
  //     link: "/",
  //   },

  //   {
  //     name: "Sign In",

  //     link: "/signin",
  //   },
  // ];
  // const [isSignedIn, setIsSignedIn] = useState(
  //   localStorage.getItem("user") == null ? false : true
  // );

  // if (isSignedIn) {
  //   const SignedInLinks = [
  //     {
  //       name: "Dashboard",

  //       link: `/${JSON.parse(localStorage.getItem("user")).role}`,
  //     },

  //     {
  //       name: "Schedule",

  //       link: "/schedule",
  //     },

  //     {
  //       name: "Log Out",

  //       link: `/signin`,
  //     },
  //   ];

  //   links = SignedInLinks;
  // }
  const links = useNavLinksStore((state) => state.links);
  const setLinks = useNavLinksStore((state) => state.setLinks);

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
