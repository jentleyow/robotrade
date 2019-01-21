import React, { Component } from "react";
import { Input, Row } from "react-materialize";
import { signIn } from "../../../store/actions/adminActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = { email: "", password: "" };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { auth, adminLogin } = this.props;
    if (auth.uid && adminLogin) return <Redirect to="/admin/dashboard" />;
    return (
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col s12 m6 push-m3">
          <div className="card ">
            <div className="card-content ">
              <span className="card-title">
                <p>
                  <strong>Admin Panel Login</strong>
                </p>
              </span>
              <Row>
                <form onSubmit={this.handleSubmit}>
                  <Input
                    s={12}
                    id="email"
                    label="Email"
                    name=""
                    onChange={this.handleChange}
                  />
                  <Input
                    s={12}
                    id="password"
                    label="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <div className="center">
                    <p className="red-text">{this.props.authError}</p>
                    <button
                      className="waves-effect waves-light btn blue darken-2"
                      style={{ marginTop: "30px" }}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.admin.authError,
    auth: state.firebase.auth,
    adminLogin: state.admin.adminLogin
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
