import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import SignedInLinks from "../../admin/nav/SignedInLinks";

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

    return (
      <nav className="nav-wrapper blue darken-4">
        <div className="container">
          <Link to="/admin/dashboard" className="brand-logo">
            <span style={{ fontWeight: "700" }}>ADMIN PANEL</span>
          </Link>
          <a
            id="mobile-burger"
            href="#"
            data-target="mobile-menu"
            className="sidenav-trigger hide-on-large-only"
          >
            <i className="material-icons">menu</i>
          </a>
          <SignedInLinks />
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
