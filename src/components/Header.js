import React from "react";
import PropTypes from "prop-types";

//Stateless Functional Component
/*When we only return a render method we don't need the component
to be fancy and it can be a stateless functional component*/
const Header = (props) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span> <span className="the">the</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired,
};

export default Header;
