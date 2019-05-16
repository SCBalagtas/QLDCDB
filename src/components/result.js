// Import libraries.
import React from "react";
import { Link } from "react-router-dom";
import { MainHeader } from "./header.js";
import { UseSearch } from "../api/cab230hackhouse.js";
import {
  GetInnerOffence,
  GetInnerAreas,
  GetInnerAges,
  GetInnerGenders,
  GetInnerYears
} from "./search";
import ReactTable from "react-table";
import { Button } from "./button.js";

// Import styles.
import "react-table/react-table.css";
import "../css/result.css";

// Result component:
export function Result() {
  const { resultLoading, results, resultError } = UseSearch(
    GetInnerOffence(),
    GetInnerAreas(),
    GetInnerAges(),
    GetInnerGenders(),
    GetInnerYears()
  );

  if (resultLoading) {
    return (
      <div>
        <MainHeader />
        <p className="resultsNotifier">Loading your search...</p>
      </div>
    );
  } else if (resultError) {
    return (
      <p className="resultsNotifier">
        Something went wrong with Search hook: {resultError.message}
      </p>
    );
  }

  // Create an array of the column headers for the ReactTable component.
  const columnHeaders = [
    {
      Header: "Local Government Area",
      accessor: "localGovernmentArea",
      style: {
        textAlign: "left"
      }
    },
    {
      Header: "Total Offences",
      accessor: "totalOffences",
      style: {
        textAlign: "left"
      }
    }
  ];

  // Format the result into an array to get only the necessary data for the ReactTable component.
  // After results finishes loading.
  const data = results.map(result => ({
    localGovernmentArea: result.LGA,
    totalOffences: result.total
  }));

  return (
    <div>
      <MainHeader />
      <div id="resultsContainer" className="resultsContainer">
        <h1>
          Results for: <b>{GetInnerOffence()}</b>
        </h1>
        <div id="resultsTable">
          <ReactTable
            columns={columnHeaders}
            data={data}
            filterable
            sortable
            defaultPageSize={10}
            noDataText={"No Results Found..."}
          />
        </div>
        <Link to={"/search"}>
          <Button id="searchAgain" label="Search Again" />
        </Link>
      </div>
    </div>
  );
}
