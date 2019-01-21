import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { topup } from "../../store/actions/paymentActions";
import { Redirect } from "react-router-dom";
class MakePayment extends Component {
  state = {
    amount: 0,
    error: null,
    finalAmount: 0,
    payButtonDisabled: true,
    status: "none"
  };
  onToken = (token, addresses) => {
    this.setState({ payButtonDisabled: true, status: "loading" });
    const { email, uid } = this.props.auth;
    this.submitPayment({
      id: token.id,
      amount: this.state.amount,
      finalAmount: this.state.finalAmount,
      email: email,
      uid: uid
    });
  };

  async submitPayment(payment) {
    let response = await fetch(
      "https://us-central1-robotrade-bf637.cloudfunctions.net/stripe/charge",
      //"http://localhost:9000/charge",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payment)
      }
    );
    if (response.status === 200) {
      this.setState({ status: "success", error: null });
    } else {
      this.setState({
        status: "error",
        error: "Error processing with payment"
      });
    }
  }

  calculateFinalAmount = amount => {
    let baseAmount = Math.round(amount / 100) * 100;
    let stripeFee = 0;
    if (baseAmount > 0) {
      stripeFee = (baseAmount / 100) * 3.4 + 0.5;
    }
    return (baseAmount + stripeFee).toFixed(2);
  };
  changeHandler = e => {
    let amount = e.target.value;
    this.setState({
      amount: e.target.value,
      payButtonDisabled: true,
      error: null,
      finalAmount: 0,
      status: "none"
    });
    if (amount === "") {
      this.setState({ error: "The amount cannot be empty" });
    } else if (isNaN(amount)) {
      this.setState({ error: "The amount must be numeric" });
    } else if (amount < 100) {
      this.setState({ error: "The amount must not be less than 100" });
    } else {
      this.setState({
        payButtonDisabled: false,
        amount: Math.round(amount / 100) * 100,
        finalAmount: this.calculateFinalAmount(amount)
      });
    }
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    const { email } = this.props.profile;
    const payButtonLabel = "Pay $" + this.state.finalAmount;
    let statusText = "";
    if (this.state.amount > 0 && this.state.status === "none") {
      statusText = `Final amount payable: SGD ${this.state.finalAmount}`;
    } else if (this.state.status === "loading") {
      statusText = "Processing payment.... It takes up to a minute";
    } else if (this.state.status === "success") {
      statusText = "Payment has been processed";
    }

    return (
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col s12 l8 offset-l2">
            <div className="card ">
              <div className="card-content center">
                <span className="card-title">
                  <h5>Top up trading account</h5>
                </span>
                <div className="row">
                  <div className="col s12 l10 offset-l1">
                    Enter the amount you will like to top up your account with.
                    <br />
                    The final amount will include a 3% processing fee.
                  </div>
                  <div
                    className="col s12 l6 offset-l3"
                    style={{ paddingTop: "20px" }}
                  >
                    <input
                      id="amount"
                      onChange={this.changeHandler}
                      value={this.state.amount}
                      placeholder="Enter the amount ..."
                      type="text"
                      style={{ textAlign: "center" }}
                    />
                    <small>
                      The amount you enter will be rounded up to the nearest
                      hundreds.
                    </small>
                  </div>
                </div>
                {this.state.error ? (
                  <p className="red-text" style={{ paddingBottom: "20px" }}>
                    {this.state.error}
                  </p>
                ) : null}
                {statusText !== "" ? (
                  <p className="green-text">{statusText}</p>
                ) : null}
              </div>
              <div className="card-action center">
                <StripeCheckout
                  amount={this.state.finalAmount * 100}
                  description="Payment"
                  locale="auto"
                  name="Forex Investment"
                  stripeKey="pk_test_XY53hhh74aZ6461WJjBOnw7j"
                  token={this.onToken}
                  currency="SGD"
                  email={email}
                  label={payButtonLabel}
                  disabled={this.state.payButtonDisabled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    paymentError: state.payment.paymentError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    topup: payment => dispatch(topup(payment))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([])
)(MakePayment);
