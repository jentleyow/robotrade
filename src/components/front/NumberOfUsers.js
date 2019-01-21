import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class NumberOfUsers extends Component {
  render() {
    const { totalUsers } = this.props;
    return (
      <div>
        {totalUsers &&
          totalUsers.map(item => {
            return (
              <div key="1">
                ~ Currently {item.totalUsers} people have signed up! ~
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalUsers: state.firestore.ordered.usersinfo
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "usersinfo" }])
)(NumberOfUsers);
