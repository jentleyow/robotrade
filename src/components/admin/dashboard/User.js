import React, { Component } from "react";
import { getUserInfo } from "../../../store/actions/adminActions";
import { connect } from "react-redux";
import { compose } from "redux";
import PaymentTable from "./PaymentTable";
class User extends Component {
  render() {
    let { user } = this.props;
    let content = <div>No user information</div>;
    if (user) {
      let {
        address,
        email,
        firstName,
        gender,
        lastName,
        nationality,
        nric,
        payments
      } = user;
      if (gender) {
        gender = "M";
      } else {
        gender = "F";
      }
      let paymentContent = <p>No payments found.</p>;
      if (payments.length > 0) {
        paymentContent = <PaymentTable payments={payments} />;
      }

      content = (
        <React.Fragment>
          <div className="col s12">
            <div className="card">
              <div className="card-content" style={{ lineHeight: "30px" }}>
                <span className="card-title">User Information</span>
                <p>
                  <strong>Full Name: </strong>
                  {firstName + " " + lastName + " (" + gender + ")"}
                </p>
                <p>
                  <strong>Nationalty: </strong>
                  {nationality}
                </p>
                <p>
                  <strong>Nric: </strong>
                  {nric}
                </p>
                <p>
                  <strong>Address: </strong>
                  {address}
                </p>
                <p>
                  <strong>Email: </strong>
                  {email}
                </p>
              </div>
            </div>
          </div>
          <div className="col s12">
            <div
              className="card"
              style={{ maxHeight: "500px", overflow: "auto" }}
            >
              <div className="card-content">
                <span className="card-title">Payment Information</span>
                {paymentContent}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className="container center" style={{ marginTop: "50px" }}>
        <div className="row">{content}</div>
      </div>
    );
  }
  componentDidMount() {
    const { id } = this.props;
    this.props.getUserInfo(id);
  }
}

const mapStateToProps = state => {
  return {
    user: state.admin.user,
    userError: state.admin.userError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: id => dispatch(getUserInfo(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(User);
