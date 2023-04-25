"use client";

import React from "react";
import Logo from "../components/Logo/Logo";
import Button from "../components/Button/Button";
import FormField from "../components/FormField/FormField";
import Styles from "./page.module.scss";

export default function SignInForm() {
  return (
    <form className={Styles.form}>
      <h2>
        Hi, There Welcome to <Logo />
      </h2>
      <FormField
        label="Email"
        type="email"
        placeholder="Enter your email"
        variant={1}
      />
      <FormField
        label="Password"
        type="password"
        placeholder="Enter your password"
        variant={1}
      />
      <Button
        variant={1}
        type="submit"
        text="Sign In"
        onClick={() => console.log("submitted")}
      />
    </form>
  );
}
