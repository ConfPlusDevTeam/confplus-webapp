import React from "react";
import Link from "next/link";
import styles from "./NavLink.module.scss";

export default function NavLink({ navlink, active, onclick, className }) {
  return (
    <li>
      <Link
        className={`${active ? className.active : className.link}`}
        href={navlink.link}
        onClick={onclick}
      >
        {navlink.name}
      </Link>
    </li>
  );
}
