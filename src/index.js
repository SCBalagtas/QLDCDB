// Import libraries.
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MainHeader } from "./components/header.js";
import { WelcomeMessage, SearchDatabase } from "./components/search.js";
import { LoginPage, RegisterPage } from "./components/login-register.js";
import { Result } from "./components/result.js";

// Assemble Index component. This is the first component rendered when app launches.
// Contains the header, sign in, sign up and view offences button.
function Index() {
  return (
    <div>
      <MainHeader />
      <WelcomeMessage />
    </div>
  );
}

// This is the main app. Render, show or hide pages in here.
function App() {
  return (
    <Router>
      <Route exact path={"/"} component={Index} />
      <Route path={"/search"} component={SearchDatabase} />
      <Route path={"/login"} component={LoginPage} />
      <Route path={"/register"} component={RegisterPage} />
      <Route path={"/result"} component={Result} />
    </Router>
  );
}

// Define "rootElement" the div where components will be rendered.
const rootElement = document.getElementById("root");

// Render App in the "root" div when the app launches.
ReactDOM.render(<App />, rootElement);
