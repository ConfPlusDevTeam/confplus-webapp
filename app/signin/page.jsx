import React from "react";
import Logo from "../components/Logo/Logo";
import FormSubmitButton from "../components/FormSubmitButton/FormSubmitButton";
import FormField from "../components/FormField/FormField";

export default function SignInForm() {
  <form>
    <h2>Hi, There Welcome to <Logo/></h2>
    <FormField label="Email" type="email" placeholder="Enter your email" />
    <FormField label="Password" type="password" placeholder="Enter your password" />
    <FormSubmitButton text="Sign In" />
  </form>

}
