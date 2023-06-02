import React from "react";
import Link from "next/link";
import styles from "./NavLink.module.scss";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NavLink({ navlink, active, onclick, className }) {
  const segment = useSelectedLayoutSegment();

  return (
    <li>
      <Link
        className={`${
          `${segment}` == navlink.link.replace("/", "")
            ? className.active
            : className.link
        }`}
        href={navlink.link}
        onClick={onclick}
      >
        {navlink.name}
      </Link>
    </li>
  );
}
