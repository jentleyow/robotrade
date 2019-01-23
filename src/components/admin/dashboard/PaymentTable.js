import React, { Component } from "react";
import moment from "moment";
const PaymentTable = ({ payments }) => {
  let totalPending = 0;
  let totalPendingAmount = 0;
  let totalApproved = 0;
  let totalApprovedAmount = 0;
  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Id</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => {
          let paymentDetail = payment.amount;
          if (payment.approve) {
            paymentDetail += " (Approved)";
            totalApproved++;
            totalApprovedAmount += parseInt(payment.amount);
          } else {
            paymentDetail += " (Pending)";
            totalPending++;
            totalPendingAmount += parseInt(payment.amount);
            console.log(totalPendingAmount);
          }
          return (
            <tr key={payment.id}>
              <td>{payment.no}</td>
              <td>{payment.id}</td>
              <td>{paymentDetail}</td>
              <td>{moment(payment.date.toDate()).fromNow()}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4" className="center">
            <strong>Total Payments: </strong>
            {totalPendingAmount + totalApprovedAmount} /
            <strong> Total Pending Amount: </strong> {totalPendingAmount} (
            {totalPending}) /<strong> Total Approved Amount: </strong>
            {totalApprovedAmount} ({totalApproved})
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
export default PaymentTable;
