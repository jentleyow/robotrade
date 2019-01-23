import React, { Component } from "react";

class AllInfo extends Component {
  generateInfo(users) {
    let totalUsers = 0;
    // users.map(user => {
    //   console.log(user);
    // });
  }
  render() {
    const { users } = this.props;
    if (users) {
      console.log(users);
      //this.generateInfo(users);
    }

    return (
      <div className="col s12 m4">
        <div className="card">
          <div className="card-content">
            <span className="card-title center">
              <strong>Other Information</strong>
            </span>
            <div>
              <p style={{ fontSize: "0.3em" }}>
                Click refresh to load information
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllInfo;
