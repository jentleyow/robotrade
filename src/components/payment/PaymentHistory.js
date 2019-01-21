import React, { Component } from "react";
import PaymentTable from "./PaymentTable";
import moment from "moment";
class PaymentHistory extends Component {
  render() {
    const { payments } = this.props;
    const arrPayments = [];
    let totalPayment = 0;
    if (payments) {
      let count = 1;
      Object.keys(payments).forEach(function(paymentid) {
        let amount = payments[paymentid]["amount"];
        let approve = payments[paymentid]["approve"];
        if (approve === true) {
          totalPayment += amount;
        }
        amount = "$" + amount.toFixed(2);
        const datetime = payments[paymentid]["date"].toDate();
        const date1 = moment(datetime).format("MMMM Do YYYY, ");
        const date2 = moment(payments[paymentid]["date"].toDate()).fromNow();
        arrPayments.push({
          count,
          paymentid,
          amount,
          date1,
          date2,
          datetime,
          approve
        });
        count++;
      });
      arrPayments.sort(function(a, b) {
        return new Date(b.datetime) - new Date(a.datetime);
      });
    }
    return (
      <div className="card ">
        <div className="card-content ">
          <span className="card-title center">
            <strong>Payment History</strong>
          </span>
          <div className="row">
            <div
              className="col s12"
              style={{ maxHeight: "340px", overflow: "auto" }}
            >
              {payments ? (
                <React.Fragment>
                  <PaymentTable payments={arrPayments} />
                  <div className="center" style={{ lineHeight: "25px" }}>
                    Approved payment:
                    <strong> ${totalPayment.toFixed(2)}</strong>
                  </div>
                </React.Fragment>
              ) : (
                <p className="center" style={{ lineHeight: "25px" }}>
                  You have not make any payment currently.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PaymentHistory;
