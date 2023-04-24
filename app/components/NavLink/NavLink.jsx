import React from "react";
import Link from "next/link";
import styles from "./NavLink.module.scss";

export default function NavLink({ navlink, active, onclick }) {
  return (
    <li>
      <Link
        className={`${active ? styles.active : styles.link}`}
        href={navlink.link}
        onClick={onclick}
      >
        {navlink.name}
      </Link>
    </li>
  );
}
