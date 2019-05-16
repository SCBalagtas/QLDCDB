// Import libraries.
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button.js";
import { IsToken } from "../api/cab230hackhouse.js";
import { GetHeaderEmail } from "./login-register.js";

// Import styles.
import "../css/header.css";

// Main Header component:
export function MainHeader() {
  if (IsToken()) {
    return (
      <header id="mainHeader">
        <Link to={"/"}>
          <div id="headerLogo">QLDCDB</div>
        </Link>
        <div id="headerMessage">
          <p>Welcome</p>
          <p id="headerEmail">{GetHeaderEmail()}</p>
        </div>
      </header>
    );
  }

  return (
    <header id="mainHeader">
      <Link to={"/"}>
        <div id="headerLogo">QLDCDB</div>
      </Link>
      <div id="headerButtons">
        <Link to={"/login"}>
          <Button id="loginButton" label="Sign in" />
        </Link>
        <Link to={"/register"}>
          <Button id="registerButton" label="Sign up" />
        </Link>
      </div>
    </header>
  );
}
