import Link from "next/link";
import "./globals.scss";
import Background from "./components/Background/background";

export const metadata = {
  title: "ConfPlus",
  description: "WebProject",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Background />
      </body>
    </html>
  );
}
