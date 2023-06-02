"use client";

import React from "react";
import { useState } from "react";
import Logo from "../Logo/Logo";
import NavLink from "../NavLink/NavLink";
import styles from "./NavBar.module.scss";

export default function Navbar({ links }) {
  const [selected, setSelected] = useState();
  return (
    <div className={styles.navbar}>
      <Logo />
      <ul className={styles.links}>
        {links.map((link, key) => (
          <NavLink
            navlink={link}
            active={selected == key ? true : false}
            onclick={() => setSelected(key)}
            key={key}
            className={styles}
          />
        ))}
      </ul>
    </div>
  );
}
