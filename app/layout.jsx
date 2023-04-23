import Link from "next/link";
import "./globals.scss";

export const metadata = {
  title: "ConfPlus",
  description: "WebProject",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="illustration">
          <div id="overlay">
            <div id="shape1" className="shapes"></div>
            <div id="shape2" className="shapes"></div>
            <div id="shape3" className="shapes"></div>
            <div id="shape4" className="shapes"></div>
            <div id="shape5" className="shapes"></div>

            <div id="header">
              <image
                src="../public/assets/main.svg"
                className="test"
                alt="logo"
                id="logo"
              ></image>
              <nav>
                <Link href="#">Home</Link>
                <Link href="#">About</Link>
                <Link href="#">Management</Link>
                <Link href="#">Sign In</Link>
              </nav>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
