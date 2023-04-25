"use client";

import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import Logo from "../Logo/Logo";
import NavLink from "../NavLink/NavLink";
import styles from "./NavBar.module.scss";

export default function Navbar({ links }) {
  const [selected, setSelected] = useState();
  const segment = useSelectedLayoutSegment();
  return (
    <div className={styles.navbar}>
      <Logo />
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
            className={styles.link}
          />
        ))}
      </ul>
    </div>
  );
}
