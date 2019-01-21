import moment from "moment";
export const getReferrals = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;

    firestore
      .collection("users")
      .doc(user.uid)
      .collection("referrals")
      .get()
      .then(snapshot => {
        let docs = snapshot.docs;
        let referrals = [];
        docs.forEach(doc => {
          let referral = {
            id: doc.id,
            fullname: "",
            date: moment(doc.data().date.toDate()).fromNow()
          };
          referrals.push(referral);
        });
        let len = referrals.length;

        referrals.forEach(referral => {
          firestore
            .collection("users")
            .doc(referral.id)
            .get()
            .then(user => {
              referral.fullname =
                user.data().firstName + " " + user.data().lastName;
              len--;
              if (len === 0) {
                dispatch({ type: "GET_REFERRALS", referrals: referrals });
              }
            });
        });
      });
  };
};
export const checkReferralId = referralid => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(referralid)
      .get()
      .then(res => {
        if (res.data()) {
          dispatch({
            type: "CHECK_REFERRAL_ID",
            checkReferral: res.data().firstName + " " + res.data().lastName
          });
        } else {
          dispatch({ type: "CHECK_REFERRAL_ID", checkReferral: null });
        }
      });
  };
};
