import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../front/Footer";
import { signIn, resetAuthError } from "../../store/actions/authActions";
import { Row, Input } from "react-materialize";
class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  componentDidMount() {
    this.props.resetAuthError();
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/dashboard" />;
    return (
      <div>
        <section>
          <div className="container">
            <Row>
              <div className="card" style={{ margin: "70px auto" }}>
                <div className="card-content center">
                  <span className="card-title">
                    <strong>Login Here</strong>
                  </span>
                  <br />
                  <form className="white" onSubmit={this.handleSubmit}>
                    <Row>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email ..."
                        s={12}
                        l={6}
                        label="Email"
                        onChange={this.handleChange}
                      />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password ..."
                        label="Password"
                        s={12}
                        l={6}
                        onChange={this.handleChange}
                      />
                      <p className="red-text" style={{ padding: "30px 0px" }}>
                        {authError}
                      </p>
                      <button
                        className=" btn  blue darken-3"
                        onClick={this.handleSubmit}
                      >
                        <i className="material-icons left">people</i>
                        Login
                      </button>
                    </Row>
                  </form>
                </div>
              </div>
            </Row>
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
    authError: state.auth.authError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    resetAuthError: () => dispatch(resetAuthError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
