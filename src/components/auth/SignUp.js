import React, { Component } from "react";
import Footer from "../front/Footer";
import UserEdit from "../auth/UserEdit";
import { connect } from "react-redux";
import { signUp, resetAuthError } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import ReferralMessage from "./ReferralMessage";
import { Button, Icon } from "react-materialize";
class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    nric: "",
    nationality: "",
    gender: true,
    address: "",
    email: "",
    password: "",
    retype: "",
    referralid: null
  };
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
  componentDidMount() {
    this.setState({
      referralid: this.getReferralId()
    });
    this.props.resetAuthError();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  getReferralId() {
    let referralid = null;
    if (this.props.match.params.id) {
      referralid = this.props.match.params.id;
    }
    return referralid;
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/dashboard" />;
    const referralid = this.getReferralId();
    return (
      <div>
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <UserEdit
              handleChange={this.handleChange}
              genderChanged={this.genderChanged}
              gender={this.state.gender}
              authError={authError}
            />
            <div className="row">
              <div className="col s12 l12 center">
                <ReferralMessage referralid={referralid} />
                <br />
                <Button className="blue darken-3">
                  Create Account<Icon left>people</Icon>
                </Button>
              </div>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser)),
    resetAuthError: () => dispatch(resetAuthError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
