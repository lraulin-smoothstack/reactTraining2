"use strict";

import React from "react";
import PropTypes from "prop-types";

const Title = ({ title = "[Page Title]" }) => (
  <div className="jumbotron">
    <h1>{title}</h1>
  </div>
);

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
