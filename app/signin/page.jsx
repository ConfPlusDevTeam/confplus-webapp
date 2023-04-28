"use client";

import React from "react";
import Logo from "../components/Logo/Logo";
import Button from "../components/Button/Button";
import FormField from "../components/FormField/FormField";
import Styles from "./page.module.scss";
import useRouter from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
export default function SignInForm() {
  const [message, setMessage] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("user") == null ? false : true
  );
  // const router = useRouter;
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   typeof window !== "undefined" && router.push(`/${user.role}`);
  // }, []);
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
      localStorage.setItem("user", JSON.stringify(data));
      const user = JSON.parse(localStorage.getItem("user"));
      setLoggedIn(true);
      // redirect(307, "/author");
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
          <Button variant={3} type="submit">
            <Link href={`/${JSON.parse(localStorage.getItem("user")).role}`}>
              My Account
            </Link>
          </Button>
          <Button
            variant={1}
            type="submit"
            text="Log Out"
            onClick={(e) => {
              localStorage.removeItem("user");
              setLoggedIn(false);
            }}
          />
        </div>
      )}
    </>
  );
}
