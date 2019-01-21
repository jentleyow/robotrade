import React from "react";
import { NavLink } from "react-router-dom";
const SignedOutLinks = props => {
  return (
    <React.Fragment>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/signup"> Create Account</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Sign In</NavLink>
        </li>
      </ul>
      <ul className="sidenav" id="mobile-menu">
        <li>
          <a className="subheader center">
            <h5 style={{ marginTop: "100px" }}>ROBO-TRADE</h5>
          </a>
        </li>

        <li>
          <div className="divider" />
        </li>
        <li>
          <NavLink to="/signup" className="center">
            Create Account
          </NavLink>
        </li>
        <li>
          <NavLink to="/signin" className="center">
            Sign In
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};
export default SignedOutLinks;
