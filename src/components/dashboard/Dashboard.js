import React, { Component } from "react";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import UserProfile from "./UserProfile";
import PaymentHistory from "../payment/PaymentHistory";
import ReferralHistory from "./ReferralHistory";
import Footer from "./Footer";
import Loader from "../loader/Loader";
import { getReferrals } from "../../store/actions/referralActions";
class Dashboard extends Component {
  componentDidMount() {
    const { auth } = this.props; //make sure user exist else dont load get referrals
    if (auth.uid) {
      this.props.getReferrals();
    }
  }
  render() {
    const { auth, profile, referrals, payments } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    let output = <Loader />;
    if (profile.isLoaded) {
      output = (
        <div>
          <div className="col s12 m12 l4">
            <UserProfile profile={profile} uid={auth.uid} />
          </div>
          <div className="col s12 m12 l8">
            <PaymentHistory payments={payments} />
            <ReferralHistory referrals={referrals} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col s12 center-align">
                <h4>
                  <strong>My Dashboard</strong>
                </h4>
              </div>
              {output}
            </div>
          </div>
        </section>
        {/* Padding */}
        <div style={{ backgroundColor: "white", height: "50px" }} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let payments = null;
  if (state.firestore.data.users && state.firebase.auth.uid) {
    payments = state.firestore.data.users[state.firebase.auth.uid].payments;
  }

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    referrals: state.referral.referrals,
    payments: payments
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getReferrals: () => dispatch(getReferrals())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    if (props.auth.uid) {
      return [
        {
          collection: "users",
          doc: props.auth.uid,
          subcollections: [
            { collection: "payments", orderBy: ["date", "desc"] }
          ]
        }
      ];
    } else {
      return [];
    }
  })
)(Dashboard);
