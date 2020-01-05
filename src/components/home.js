"use strict";

import React from "react";
import PropTypes from "prop-types";

export const Home = ({ title = "[Page Title]" }) => (
  <div className="jumbotron">
    <h1>{title}</h1>
  </div>
);

Home.propTypes = {
  title: PropTypes.string,
};
