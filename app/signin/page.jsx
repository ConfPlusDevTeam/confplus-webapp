"use client";

import React from "react";
import Logo from "../components/Logo/Logo";
import Button from "../components/Button/Button";
import FormField from "../components/FormField/FormField";
import Styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { useNavLinksStore } from "../stores/navlinks";

export default function SignInForm() {
  const router = useRouter();
  const setLinks = useNavLinksStore((state) => state.setLinks);

  const [message, setMessage] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("user") == null ? false : true
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    const res = await fetch("/api/users/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.status == 200) {
      setLinks((oldLinks) => [
        {
          name: "Dashboard",

          link: `/${data.role}`,
        },

        {
          name: "Schedule",

          link: "/schedule",
        },

        {
          name: "Log Out",

          link: `/signin`,
        },
      ]);

      localStorage.setItem("user", JSON.stringify(data));
      const user = JSON.parse(localStorage.getItem("user"));
      setLoggedIn(true);
      router.push(`/${user.role}`);
    } else setMessage("Error: " + "invalid email or password");
  };

  return (
    <>
      {loggedIn == false && (
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>
            Hi There, Welcome to <Logo />!
          </h2>
          <h5 className={Styles.message}>{message}</h5>
          <FormField
            label="Email"
            type="email"
            placeholder="Enter your email here"
            variant={1}
          />
          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password here"
            variant={1}
          />
          <Button variant={1} type="submit" text="Sign In" />
        </form>
      )}
      {loggedIn == true && (
        <div className={Styles.form}>
          <Button
            variant={1}
            type="submit"
            text="Are you sure you want to log out?"
            onClick={(e) => {
              localStorage.removeItem("user");
              setLoggedIn(false);
              setLinks((oldLinks) => [
                {
                  name: "Information",
                  link: "/",
                },

                {
                  name: "Sign In",

                  link: "/signin",
                },
              ]);
              router.push(`/signin`);
            }}
          />
        </div>
      )}
    </>
  );
}
