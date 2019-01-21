import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Dashboard extends Component {
  render() {
    const { auth, adminLogin } = this.props;
    if (auth.uid && adminLogin) {
    } else {
      //For development only
      //return <Redirect to="/admin/login" />;
    }
    return <div>Dashboard</div>;
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    adminLogin: state.admin.adminLogin
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
