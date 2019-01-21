import React from "react";
import styles from "./PaymentTable.module.css";
const PaymentTable = ({ payments }) => {
  return (
    <table style={{ tableLayout: "fixed" }} className={styles["paymentTable"]}>
      <tbody>
        {payments.map(payment => {
          console.log(payment.approve);
          return (
            <tr key={payment.paymentid}>
              <td>
                <div className="row">
                  <div className="col s12 m6 ">
                    <strong>Date:</strong> <br />
                    {payment.date1}
                    <p>
                      <small>{payment.date2}</small>
                    </p>
                  </div>
                  <div className="col s12 m6 ">
                    <strong>Amount:</strong>
                    <br /> {payment.amount} (
                    {payment.approve ? (
                      <span>Approved</span>
                    ) : (
                      <span>Pending</span>
                    )}
                    )
                    <p>
                      <small>ID: {payment.paymentid}</small>
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default PaymentTable;
