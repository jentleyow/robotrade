import React from "react";
import styles from "./UserProfile.module.css";
import { Button } from "react-materialize";
import { NavLink } from "react-router-dom";
const UserProfile = props => {
  if (props.profile.isLoaded) {
    const { uid } = props;
    const {
      firstName,
      lastName,
      nric,
      gender,
      nationality,
      address,
      email
    } = props.profile;
    const reflink =
      "https://robotrade-bf637.firebaseapp.com" + "/signup/" + uid;
    return (
      <div className="card ">
        <div className="card-content center">
          <span className="card-title center-align">
            <strong>
              {firstName} {lastName}
              &nbsp; ({gender ? <span>M</span> : <span>F</span>})
            </strong>
          </span>
          <h5
            className="grey-text center-align"
            style={{ fontSize: "1em", margin: "0px auto 10px auto" }}
          >
            @{email}
          </h5>
          <table style={{ tableLayout: "fixed" }}>
            <tbody>
              <tr>
                <td className={styles["profile-td"]} width="50%">
                  <strong>NRIC</strong>
                  <p className="grey-text ">{nric}</p>
                </td>
                <td className={styles["profile-td"]}>
                  <strong>Nationality</strong>
                  <p className="grey-text">{nationality}</p>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className={styles["profile-td"]}>
                  <strong>Address</strong>
                  <p className="grey-text">{address}</p>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className={styles["profile-td"]}>
                  <strong>Referral Link</strong>
                  <p>
                    <a href={reflink}>www.robotrade.com/signup/{uid}</a>
                  </p>
                  <p>
                    <small>
                      Send this link to your referrals to get 5% trading bonus!
                    </small>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <NavLink to="/editprofile">
            <Button className="blue darken-3">
              <i className="material-icons left">people</i>Edit Profile
            </Button>
          </NavLink>
        </div>
      </div>
    );
  } else {
    return (
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
  }
};
export default UserProfile;
