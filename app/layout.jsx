import Link from "next/link";
import "./globals.scss";
import Background from "./components/Background/background";
import Navbar from "./components/Navbar/Navbar";

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
      name: "About",

      link: "/testPage",
    },

    {
      name: "Sign In",

      link: "/signin",
    },
  ];
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
