import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.scss";
import Sidebar from "./components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Sidebar />;
}
