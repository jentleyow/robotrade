import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "../nav/SignedInLinks";
import SignedOutLinks from "../nav/SignedOutLinks";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

class Navbar extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );

    return (
      <nav className="nav-wrapper blue darken-4">
        <div className="container">
          <Link to="/" className="brand-logo">
            <span style={{ fontWeight: "700" }}>ROBO-TRADE</span>
          </Link>
          <a
            id="mobile-burger"
            href="#"
            data-target="mobile-menu"
            className="sidenav-trigger hide-on-large-only"
          >
            <i className="material-icons">menu</i>
          </a>
          {links}
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
