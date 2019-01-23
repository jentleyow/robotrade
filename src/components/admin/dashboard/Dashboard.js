import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import AllInfo from "./AllInfo";
import AllUsers from "./AllUsers";
class Dashboard extends Component {
  render() {
    const { auth, adminLogin } = this.props;
    if (auth.uid && adminLogin) {
    } else {
      //For development only
      //return <Redirect to="/admin/login" />;
    }

    return (
      <div>
        <h3 className="center">
          <div className="row ">
            <AllUsers />
          </div>
        </h3>
      </div>
    );
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
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Dashboard);
