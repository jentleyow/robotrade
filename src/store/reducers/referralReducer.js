const initState = {
  checkReferral: null,
  referrals: []
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_REFERRALS":
      return {
        ...state,
        referrals: action.referrals
      };
    case "CHECK_REFERRAL_ID":
      return {
        ...state,
        checkReferral: action.checkReferral
      };
    default:
      return state;
  }
};
export default authReducer;
