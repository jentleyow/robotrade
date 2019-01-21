import React, { Component } from "react";
import M from "materialize-css";
class ReferralHistory extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    const { referrals } = this.props;
    let badge = "0 referral(s)";
    if (referrals.length === 1) {
      badge = referrals.length + " referrals";
    } else if (referrals.length > 1) {
      badge = referrals.length + " referrals";
    }
    return (
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">
            <i className="material-icons">filter_drama</i>Referral History{" "}
            <span className="new badge blue" data-badge-caption="">
              {badge}
            </span>
          </div>
          <div className="collapsible-body">
            <table>
              <tbody>
                {referrals.map(referral => {
                  return (
                    <tr key={referral.id}>
                      <td style={{ textAlign: "center" }}>
                        <strong>{referral.fullname}</strong> registered&nbsp;
                        <em>{referral.date}</em>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    );
  }
}
export default ReferralHistory;
