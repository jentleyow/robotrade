import React, { Component } from "react";
import { connect } from "react-redux";
import { checkReferralId } from "../../store/actions/referralActions";
class ReferralMessage extends Component {
  componentDidMount() {
    const { referralid } = this.props;
    if (referralid) {
      this.props.checkReferralId(referralid);
    }
  }
  render() {
    return (
      <div style={{ padding: "20px 0px" }}>
        {this.props.checkReferral === null ? (
          <div>
            Referral: You are currently not using a referral link. By using a
            referral link you get a extra 5% profit on your trades.
          </div>
        ) : (
          <div>
            You are currently using <strong>{this.props.checkReferral}</strong>
            's referral link.
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkReferral: state.referral.checkReferral
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkReferralId: referralid => dispatch(checkReferralId(referralid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferralMessage);
