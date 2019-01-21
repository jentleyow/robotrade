import React, { Component } from "react";
import Footer from "../dashboard/Footer";
import Textbox from "./Textbox";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Icon, Row, Input } from "react-materialize";
import { editProfile, resetEditProfile } from "../../store/actions/authActions";
import $ from "jquery";
class EditProfile extends Component {
  state = {
    firstName: "",
    lastName: "",
    nric: "",
    nationality: "",
    gender: true,
    address: "",
    password: "",
    retype: ""
  };
  componentDidMount() {
    const { profile, resetEditProfile } = this.props;
    resetEditProfile();
    if (profile.isEmpty) {
    } else {
      $("label").addClass("active"); // fix textbox
      this.setState({
        ...profile,
        retype: profile.password
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    $("label").addClass("active"); // fix textbox
    resetEditProfile();
    const { profile } = nextProps;
    this.setState({
      ...profile,
      retype: profile.password
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  genderChanged = e => {
    this.setState({
      gender: !this.state.gender
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.editProfile(this.state);
  };
  render() {
    const { auth, authError, editProfileSuccess } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col s12">
                <h4 className="center">
                  <strong>Edit Profile</strong>
                </h4>
                {authError ? (
                  <div
                    className="red-text center"
                    style={{ paddingBottom: "30px" }}
                  >
                    {authError}
                  </div>
                ) : null}
                {editProfileSuccess ? (
                  <div
                    className="green-text center"
                    style={{ paddingBottom: "30px" }}
                  >
                    Profile updated successfully.
                  </div>
                ) : null}
              </div>
              <div className="col s12">
                <Row>
                  <form className="white" onSubmit={this.handleSubmit}>
                    <Textbox
                      id="firstName"
                      s={12}
                      l={6}
                      field="First Name"
                      type="text"
                      handleChange={this.handleChange}
                      value={this.state.firstName}
                    />
                    <Textbox
                      id="lastName"
                      s={12}
                      l={6}
                      field="Last Name"
                      type="text"
                      handleChange={this.handleChange}
                      value={this.state.lastName}
                    />
                    <Textbox
                      id="nric"
                      s={12}
                      l={5}
                      field="NRIC"
                      type="text"
                      handleChange={this.handleChange}
                      value={this.state.nric}
                    />
                    <Textbox
                      id="nationality"
                      s={12}
                      l={5}
                      field="Nationality"
                      type="text"
                      handleChange={this.handleChange}
                      value={this.state.nationality}
                    />
                    <div
                      className="col s12 l2"
                      style={{ marginBottom: "15px" }}
                    >
                      <label htmlFor="nric">Gender</label>
                      <p style={{ marginTop: "15px" }}>
                        <label>
                          <input
                            className="with-gap"
                            type="radio"
                            value="male"
                            onChange={this.genderChanged}
                            checked={this.state.gender}
                          />
                          <span>Male</span>
                        </label>
                        &nbsp;
                        <label>
                          <input
                            className="with-gap"
                            type="radio"
                            value="female"
                            onChange={this.genderChanged}
                            checked={!this.state.gender}
                          />
                          <span>Female</span>
                        </label>
                      </p>
                    </div>
                    <Input
                      id="address"
                      type="textarea"
                      s={12}
                      label={"Address"}
                      onChange={this.handleChange}
                      value={this.state.address}
                    />
                    <Textbox
                      id="password"
                      s={12}
                      l={6}
                      field="Password"
                      type="password"
                      handleChange={this.handleChange}
                      value={this.state.password}
                    />
                    <Textbox
                      id="retype"
                      s={12}
                      l={6}
                      field="Re-type password"
                      type="password"
                      handleChange={this.handleChange}
                      value={this.state.retype}
                    />
                    <div className="col s12 center">
                      <Button className="blue darken-3">
                        Update Profile<Icon left>people</Icon>
                      </Button>
                    </div>
                  </form>
                </Row>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    authError: state.auth.authError,
    editProfileSuccess: state.auth.editProfileSuccess
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editProfile: user => dispatch(editProfile(user)),
    resetEditProfile: () => dispatch(resetEditProfile())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([])
)(EditProfile);
