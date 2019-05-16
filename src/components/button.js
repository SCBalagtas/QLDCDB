// Import libraries.
import React from "react";

// Import styles.
import "../css/button.css";

// Button component:
// NOTE: this button component is only used for linking, it does not have any onClick, onSubmit
// functionality.
export function Button(props) {
  return (
    <button id={props.id} className="button">
      {props.label}
    </button>
  );
}
