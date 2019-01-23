import React, { Component } from "react";
import AllUsersTable from "./AllUsersTable";
import { Input, Row } from "react-materialize";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Fuse from "fuse.js";
class AllUsers extends Component {
  fuse = null;
  updateInitialResult = false;
  allResult = null;
  state = {
    result: null
  };

  handleChange = e => {
    const input = e.target.value;
    if (input === "") {
      this.setState({ result: this.allResult });
    } else {
      let result = this.fuse.search(input);
      this.setState({ result: result });
    }
  };
  componentDidUpdate() {
    const { users } = this.props;
    const arrUser = [];
    if (users) {
      Object.keys(users).map(function(key, index) {
        let user = users[key];
        user.id = key;
        user.fullName = user.firstName + " " + user.lastName;
        arrUser.push(user);
      });
      //load Fuze
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        keys: ["address", "fullName"]
      };
      this.allResult = arrUser;
      this.fuse = new Fuse(arrUser, options);
      if (this.updateInitialResult === false) {
        this.updateInitialResult = true;
        this.setState({ result: arrUser });
      }
    }
  }
  render() {
    return (
      <div className="col s12 m10 push-m1 ">
        <div className="card">
          <div className="card-content">
            <span className="card-title center">
              <strong>All users</strong>
              <Row>
                <Input
                  placeholder="Email/Name"
                  s={12}
                  onChange={this.handleChange}
                />
              </Row>
              <Row style={{ maxHeight: "500px", overflow: "auto" }}>
                {this.state.result ? (
                  <AllUsersTable users={this.state.result} />
                ) : (
                  <div>There is no results</div>
                )}
              </Row>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firestore.data.users
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [{ collection: "users" }];
  })
)(AllUsers);
