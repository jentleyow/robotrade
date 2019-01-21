import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = props => {
  return (
    <React.Fragment>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/forum">Forum</NavLink>
        </li>
        <li>
          <NavLink to="/makepayment">Make Payment</NavLink>
        </li>
        <li>
          <a onClick={props.signOut}>Log Off</a>
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
          <NavLink to="/makepayment" className="center">
            Make Payment
          </NavLink>
        </li>
        <li>
          <a onClick={props.signOut} className="center">
            Log Off
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
