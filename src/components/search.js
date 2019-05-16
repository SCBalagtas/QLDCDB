// Import libraries.
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { MainHeader } from "./header.js";
import { Button } from "./button.js";
import {
  UseGetOffences,
  UseGetAreas,
  UseGetAges,
  UseGetGenders,
  UseGetYears,
  IsToken
} from "../api/cab230hackhouse.js";
import Select from "react-select";

// Import styles.
import "../css/search.css";
import "../css/button.css";

// Welcome message component:
export function WelcomeMessage() {
  return (
    <div id="welcomeMessage" className="mainContainer">
      <h1>Welcome to the Queensland Crime Database</h1>
      <p>Click the button below to search through the database</p>
      <Link to={"/search"}>
        <Button id="searchDatabaseButton" label="Search Database" />
      </Link>
    </div>
  );
}

// Global variables for storing the search params.
let innerOffence;
let innerAreas;
let innerAges;
let innerGenders;
let innerYears;

// Functions to return the search params.
export function GetInnerOffence() {
  return innerOffence;
}
export function GetInnerAreas() {
  return innerAreas;
}
export function GetInnerAges() {
  return innerAges;
}
export function GetInnerGenders() {
  return innerGenders;
}
export function GetInnerYears() {
  return innerYears;
}

// Implement Search Database component here.
function SearchContainer() {
  // Define the open endpoint hooks.
  const { offencesLoading, offences, offencesError } = UseGetOffences();
  const { areasLoading, areas, areasError } = UseGetAreas();
  const { agesLoading, ages, agesError } = UseGetAges();
  const { gendersLoading, genders, gendersError } = UseGetGenders();
  const { yearsLoading, years, yearsError } = UseGetYears();

  // State for whether a search query has been sent.
  const [hasSearched, setHasSearched] = useState(false);

  // States for the values selected in the Select component.
  const [selectedOffence, setSelectedOffence] = useState(null);
  const [selectedAreas, setSelectedAreas] = useState(null);
  const [selectedAges, setSelectedAges] = useState(null);
  const [selectedGenders, setSelectedGenders] = useState(null);
  const [selectedYears, setSelectedYears] = useState(null);

  // Render notifiers if loading or error is caught.
  if (
    offencesLoading ||
    areasLoading ||
    agesLoading ||
    gendersLoading ||
    yearsLoading
  ) {
    return <p className="searchContainerNotifier">Loading...</p>;
  } else if (offencesError) {
    return (
      <p className="searchContainerNotifier">
        Something went wrong with Offences hook: {offencesError.message}
      </p>
    );
  } else if (areasError) {
    return (
      <p className="searchContainerNotifier">
        Something went wrong with Areas hook: {areasError.message}
      </p>
    );
  } else if (agesError) {
    return (
      <p className="searchContainerNotifier">
        Something went wrong with Ages hook: {agesError.message}
      </p>
    );
  } else if (gendersError) {
    return (
      <p className="searchContainerNotifier">
        Something went wrong with Genders hook: {gendersError.message}
      </p>
    );
  } else if (yearsError) {
    return (
      <p className="searchContainerNotifier">
        Something went wrong with Years hook: {yearsError.message}
      </p>
    );
  } else if (hasSearched) {
    return <Redirect to={"/result"} />;
  }

  // Format the arrays into a suitable format for the Select component.
  // After the open endpoint hooks finishes loading.
  const offencesOptions = offences.map(offence => ({
    value: offence,
    label: offence
  }));
  const areasOptions = areas.map(area => ({
    value: area,
    label: area
  }));
  const agesOptions = ages.map(age => ({
    value: age,
    label: age
  }));
  const gendersOptions = genders.map(gender => ({
    value: gender,
    label: gender
  }));
  const yearsOptions = years.map(year => ({
    value: year,
    label: year
  }));

  // Render the search container component.
  return (
    <div id="searchContainer" className="mainContainer">
      <h1 id="searchContainerTitle">
        Search <Link to={"/"}>QLDCDB</Link>
      </h1>
      <h2 id="offencesSelectLabel" className="selectLabel">
        Offence
      </h2>
      <Select
        id="offenceSelect"
        className="selectDropdown"
        options={offencesOptions}
        placeholder="Offence *Required"
        onChange={offence => setSelectedOffence(offence.label)}
      />
      <h2 id="areasSelectLabel" className="selectLabel">
        Areas
      </h2>
      <Select
        id="areasSelect"
        className="selectDropdown"
        options={areasOptions}
        placeholder="Areas"
        isMulti
        onChange={areas => {
          const innerAreas = areas.map(age => age.label);
          setSelectedAreas(innerAreas);
        }}
      />
      <h2 id="agesSelectLabel" className="selectLabel">
        Ages
      </h2>
      <Select
        id="agesSelect"
        className="selectDropdown"
        options={agesOptions}
        placeholder="Ages"
        isMulti
        onChange={ages => {
          const innerAges = ages.map(age => age.label);
          setSelectedAges(innerAges);
        }}
      />
      <h2 id="gendersSelectLabel" className="selectLabel">
        Genders
      </h2>
      <Select
        id="gendersSelect"
        className="selectDropdown"
        options={gendersOptions}
        placeholder="Genders"
        isMulti
        onChange={genders => {
          const innerGenders = genders.map(gender => gender.label);
          setSelectedGenders(innerGenders);
        }}
      />
      <h2 id="yearsSelectLabel" className="selectLabel">
        Years
      </h2>
      <Select
        id="yearsSelect"
        className="selectDropdown"
        options={yearsOptions}
        placeholder="Years"
        isMulti
        onChange={years => {
          const innerYears = years.map(year => year.label);
          setSelectedYears(innerYears);
        }}
        maxMenuHeight="150"
      />
      <button
        type="search"
        className="button"
        onClick={() => {
          if (!IsToken()) {
            alert("You need to be signed in to use this feature!");
          } else if (!selectedOffence) {
            alert("Please fill in required fields!");
          } else {
            // Set the global search params to the selected params.
            innerOffence = selectedOffence;
            innerAreas = selectedAreas;
            innerAges = selectedAges;
            innerGenders = selectedGenders;
            innerYears = selectedYears;
            setHasSearched(true);
          }
        }}
      >
        Search
      </button>
    </div>
  );
}

// Assemble SearchDatabase component. This is the component that will render when
// "View Database" is clicked. Contains the header, and search container.
export function SearchDatabase() {
  return (
    <div>
      <MainHeader />
      <SearchContainer />
    </div>
  );
}
