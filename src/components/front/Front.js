import React, { Component } from "react";
import Middle from "../front/Middle";
import Footer from "../front/Footer";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Front extends Component {
  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/dashboard" />;
    return (
      <div>
        <Middle />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
// const mapDispatchToProps = dispatch => {
//   return {};
// };

export default connect(
  mapStateToProps,
  {}
)(Front);
