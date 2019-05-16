// Import libraries.
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Register, Login } from "../api/cab230hackhouse.js";

// Import styles.
import "../css/login-register.css";
import "../css/button.css";

// Email input component:
function EmailInput(props) {
  const [innerEmail, setInnerEmail] = useState("");

  return (
    <div id="emailInput">
      <label htmlFor="email" className="formLabel">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="text"
        className="formInput"
        placeholder="email"
        value={innerEmail}
        onChange={event => {
          const { value } = event.target;
          setInnerEmail(value);
          props.onChange(value);
        }}
      />
    </div>
  );
}

// Password input component:
function PasswordInput(props) {
  const [innerPassword, setInnerPassword] = useState("");
  let label = props.label;
  let inputID = "";
  let labelID = "";

  if (label === "Password") {
    label = "Password";
    inputID = "passwordInput";
    labelID = "passwordLabel";
  } else if (label === "Confirm") {
    label = "Confirm password";
    inputID = "confirmPasswordInput";
    labelID = "confirmPasswordLabel";
  } else {
    // Default to "Password" if no parameters is passed.
    label = "Password";
    inputID = "passwordInput";
    labelID = "passwordLabel";
  }

  return (
    <div id="passwordInput">
      <label htmlFor="password" id={labelID} className="formLabel">
        {label}
      </label>
      <input
        id={inputID}
        name="password"
        type="password"
        className="formInput"
        placeholder="password"
        value={innerPassword}
        onChange={event => {
          const { value } = event.target;
          setInnerPassword(value);
          props.onChange(value);
        }}
      />
    </div>
  );
}

// Empty form alert.
function emptyFormAlert() {
  alert("Please fill in all fields!");
}

// Variable to store the user's email after logging in. This will display in the mainHeader
// if the login was successful.
let headerEmail = "";

// Function to return the headerEmail variable.
export function GetHeaderEmail() {
  return headerEmail;
}

// Login form component:
// Assemble the login form component. This is the component that will render when "Sign in" is clicked.
// Contains email form, password form and a sign in button.
export function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function for handling login during on submit of the form.
  function HandleLogin() {
    if (!email || !password) {
      emptyFormAlert();
    } else {
      Login(email, password).then(loggedIn => setIsLoggedIn(loggedIn));
      headerEmail = email;
    }
  }

  // Redirect to index if isLoggedIn.
  if (isLoggedIn) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="rootContainer">
      <div id="loginMessage" className="message">
        Sign in to <Link to={"/"}>QLDCDB</Link>
      </div>
      <form
        id="loginForm"
        className="formContainer"
        onSubmit={event => {
          event.preventDefault();
          HandleLogin();
        }}
      >
        <EmailInput onChange={setEmail} />
        <PasswordInput onChange={setPassword} />
        <button type="submit" className="button">
          Sign in
        </button>
      </form>
      <div id="registerMessage" className="toggleContainer">
        New to QLDCDB? <Link to={"/register"}>Create an account.</Link>
      </div>
    </div>
  );
}

// Register form component:
// Assemble the register form component. This is the component that will render when "Sign up" is clicked.
// Contains email form, password form (with extra confirm input), and a create account button.
export function RegisterPage() {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function for handling register during on submit of the form.
  function HandleRegister() {
    if (!email || !password || !confirmPassword) {
      emptyFormAlert();
    } else if (password !== confirmPassword) {
      alert("Passwords do not match! Please try again.");
    } else {
      Register(email, password).then(accountCreated =>
        setIsAccountCreated(accountCreated)
      );
    }
  }

  // Redirect to login if isAccountCreated.
  if (isAccountCreated) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="rootContainer">
      <div id="RegisterMessage" className="message">
        Join <Link to={"/"}>QLDCDB</Link>
      </div>
      <form
        id="registerForm"
        className="formContainer"
        onSubmit={event => {
          event.preventDefault();
          HandleRegister();
        }}
      >
        <EmailInput onChange={setEmail} />
        <PasswordInput onChange={setPassword} />
        <PasswordInput label="Confirm" onChange={setConfirmPassword} />
        <button type="submit" className="button">
          Create an account
        </button>
      </form>
      <div id="loginMessage" className="toggleContainer">
        Already have an account? <Link to={"/login"}>Sign in.</Link>
      </div>
    </div>
  );
}
