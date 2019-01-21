import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./middle.module.css";
import NumberOfUsers from "./NumberOfUsers";
const Middle = props => {
  return (
    <section className={styles["middle"]}>
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l8 push-l2">
            <div
              className="card blue darken-1"
              style={{ marginTop: "100px", opacity: 0.95 }}
            >
              <div className="card-content white-text center-align">
                <span className="card-title text-center">
                  <strong>Connect Investors With Top-Notch AI Trading</strong>
                  <p style={{ padding: "10px 0px" }}>
                    Automatically make the same investments as our trade leaders
                    in your own brokerage account through our automated
                    Robo-Trade systems!
                  </p>
                  <small>
                    * You can trade using our system with just $500!
                  </small>
                </span>
              </div>
              <div className="card-action center">
                <NavLink to="/signup">
                  <span className="waves-effect waves-light btn blue darken-3">
                    <i className="material-icons left">people</i>Create Account
                  </span>
                </NavLink>
                <div className="white-text " style={{ marginTop: "50px" }}>
                  <em>
                    <NumberOfUsers />
                  </em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Middle;
