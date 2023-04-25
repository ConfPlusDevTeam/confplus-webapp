"use client";
import React from "react";
import styles from "./Tabs.module.scss";
import NavLink from "../NavLink/NavLink";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

export default function Tabs({ links }) {
  const [selected, setSelected] = useState();
  const segment = useSelectedLayoutSegment();
  return (
    <div className={styles.tabsContainer}>
      <ul className={styles.links}>
        {links.map((link, key) => (
          <NavLink
            navlink={link}
            active={
              selected == key || `${segment}` == link.link.replace("/", "")
                ? true
                : false
            }
            onclick={() => setSelected(key)}
            key={key}
            className={styles}
          />
        ))}
      </ul>
    </div>
  );
}
