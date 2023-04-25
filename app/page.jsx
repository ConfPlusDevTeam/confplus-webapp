"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [active, setActive] = useState("welcome");
  return (
    <div className={styles.homeContainer}>
      <Sidebar
        onclick={(activeTab) => setActive(activeTab)}
        activeElement={active}
      />
      <div className={styles.card}>
        <ContentContainer variant={1} title="Test">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
          similique nisi maxime suscipit et numquam repudiandae aut, architecto
          veniam eveniet blanditiis ex, voluptas fugiat laboriosam assumenda
          illo illum debitis fuga?
        </ContentContainer>
      </div>
    </div>
  );
}
