import React from "react";
import ReactCountryFlag from "react-country-flag";

export default function makeCountryIcon(icon) {
    // eslint-disable-next-line react/display-name
  return (props) => <ReactCountryFlag countryCode={icon} svg {...props} />;
}