// Import libraries.
import { useState, useEffect } from "react";

// Define variable to hold the JSON Web Token.
let JWT = null;

// Define a constant variable to hold the root url.
const api = "https://cab230.hackhouse.sh";

// Function for registering new account, contains POST request to the /register endpoint of the API.
export function Register(inputtedEmail, inputtedPassword) {
  const url = api + "/register";

  // Encode the email and passwords.
  const email = encodeURI(inputtedEmail);
  const password = encodeURI(inputtedPassword);

  // Variable for register status.
  let accountCreated;

  return fetch(url, {
    method: "POST",
    body: `email=${email}&password=${password}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function() {
      accountCreated = true;
      alert("Account successfully created! Please sign in.");
      return accountCreated;
    })
    .catch(function() {
      accountCreated = false;
      alert("Account with this email already exists!");
      return accountCreated;
    });
}

// Function for logging in, contains POST request to the "/login" endpoint of the API.
export function Login(inputtedEmail, inputtedPassword) {
  const url = api + "/login";

  // Encode the email and password.
  const email = encodeURI(inputtedEmail);
  const password = encodeURI(inputtedPassword);

  // Variable to login status.
  let loggedIn;

  return fetch(url, {
    method: "POST",
    body: `email=${email}&password=${password}`,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function(result) {
      JWT = result.token;
      loggedIn = true;
      alert(`Login successful! Welcome ${inputtedEmail}.`);
      return loggedIn;
    })
    .catch(function() {
      loggedIn = false;
      alert(
        "Login unsuccessful! The email or password you entered is incorrect."
      );
      return loggedIn;
    });
}

// Return status of JWT.
export function IsToken() {
  if (JWT === null) {
    return false;
  }
  return true;
}

// Function for hitting the open endpoint "/offences" of the API.
function GetOffences() {
  return fetch(api + "/offences")
    .then(response => response.json())
    .then(response => response.offences);
}

// Function to hook to the results from GetOffences().
export function UseGetOffences() {
  const [offencesLoading, setOffencesLoading] = useState(true);
  const [offences, setOffences] = useState([]);
  const [offencesError, setOffencesError] = useState(null);

  useEffect(() => {
    GetOffences()
      .then(offences => {
        setOffences(offences);
        setOffencesLoading(false);
      })
      .catch(error => {
        setOffencesError(error);
        setOffencesLoading(false);
      });
  }, []);

  return {
    offencesLoading,
    offences,
    offencesError
  };
}

// Function for hitting the open endpoint "/areas" of the API.
function GetAreas() {
  return fetch(api + "/areas")
    .then(response => response.json())
    .then(response => response.areas);
}

// Function to hook to the results from GetAreas().
export function UseGetAreas() {
  const [areasLoading, setAreasLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [areasError, setAreasError] = useState(null);

  useEffect(() => {
    GetAreas()
      .then(areas => {
        setAreas(areas);
        setAreasLoading(false);
      })
      .catch(error => {
        setAreasError(error);
        setAreasLoading(false);
      });
  }, []);

  return {
    areasLoading,
    areas,
    areasError
  };
}

// Function for hitting the open endpoint "/ages" of the API.
function GetAges() {
  return fetch(api + "/ages")
    .then(response => response.json())
    .then(response => response.ages);
}

// Function to hook to the results from GetAges().
export function UseGetAges() {
  const [agesLoading, setAgesLoading] = useState(true);
  const [ages, setAges] = useState([]);
  const [agesError, setAgesError] = useState(null);

  useEffect(() => {
    GetAges()
      .then(ages => {
        setAges(ages);
        setAgesLoading(false);
      })
      .catch(error => {
        setAgesError(error);
        setAgesLoading(false);
      });
  }, []);

  return {
    agesLoading,
    ages,
    agesError
  };
}

// Function for hitting the open endpoint "/genders" of the API.
function GetGenders() {
  return fetch(api + "/genders")
    .then(response => response.json())
    .then(response => response.genders);
}

// Function to hook to the results from GetGenders().
export function UseGetGenders() {
  const [gendersLoading, setGendersLoading] = useState(true);
  const [genders, setGenders] = useState([]);
  const [gendersError, setGendersError] = useState(null);

  useEffect(() => {
    GetGenders()
      .then(genders => {
        setGenders(genders);
        setGendersLoading(false);
      })
      .catch(error => {
        setGendersError(error);
        setGendersLoading(false);
      });
  }, []);

  return {
    gendersLoading,
    genders,
    gendersError
  };
}

// Function for hitting the open endpoint "/years" of the API.
function GetYears() {
  return fetch(api + "/years")
    .then(response => response.json())
    .then(response => response.years);
}

// Function to hook to the results from GetYears().
export function UseGetYears() {
  const [yearsLoading, setYearsLoading] = useState(true);
  const [years, setYears] = useState([]);
  const [yearsError, setYearsError] = useState(null);

  useEffect(() => {
    GetYears()
      .then(years => {
        setYears(years);
        setYearsLoading(false);
      })
      .catch(error => {
        setYearsError(error);
        setYearsLoading(false);
      });
  }, []);

  return {
    yearsLoading,
    years,
    yearsError
  };
}

// Function for hitting the "/search" endpoint of the API.
// NOTE: this endpoint requires authentication, JWT != null.
function Search(offence, areas, ages, genders, years) {
  // Format saerch parameters.
  let filter = "";

  if (areas !== null) {
    filter = `area=${areas.toString()}`;
  }
  if (ages !== null) {
    if (filter === "") {
      filter = `age=${ages.toString()}`;
    } else {
      filter += `&age=${ages.toString()}`;
    }
  }
  if (genders !== null) {
    if (filter === "") {
      filter = `gender=${genders.toString()}`;
    } else {
      filter += `&gender=${genders.toString()}`;
    }
  }
  if (years !== null) {
    if (filter === "") {
      filter = `year=${years.toString()}`;
    } else {
      filter += `&year=${years.toString()}`;
    }
  }

  //The parameters of the call
  let getParam = { method: "GET" };
  let head = { Authorization: `Bearer ${JWT}` };
  getParam.headers = head;

  //The URL
  const baseUrl = api + "/search?";
  const query = `offence=${offence}`;
  let url = "";

  // Check if there are any filters.
  if (filter === "") {
    url = baseUrl + query;
  } else {
    url = baseUrl + query + "&" + filter;
  }

  return fetch(encodeURI(url), getParam)
    .then(response => response.json())
    .then(response => response.result);
}

// Function to hook to the results from Search().
export function UseSearch(offence, areas, ages, genders, years) {
  const [resultLoading, setResultLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [resultError, setResultError] = useState(null);

  useEffect(() => {
    Search(offence, areas, ages, genders, years)
      .then(results => {
        setResults(results);
        setResultLoading(false);
      })
      .catch(error => {
        setResultError(error);
        setResultLoading(false);
      });
  }, [offence, areas, ages, genders, years]);

  return {
    resultLoading,
    results,
    resultError
  };
}
