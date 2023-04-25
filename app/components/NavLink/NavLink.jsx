import React from "react";
import Link from "next/link";
import styles from "./NavLink.module.scss";

export default function NavLink({ navlink, active, onclick, className }) {
  return (
    <li>
      <Link
        className={`${active ? styles.active : className}`}
        href={navlink.link}
        onClick={onclick}
      >
        {navlink.name}
      </Link>
    </li>
  );
}
