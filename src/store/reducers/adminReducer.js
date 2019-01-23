const initState = {
  authError: null,
  adminLogin: false,
  userError: null,
  user: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: action.err.message };
    case "LOGIN_SUCCESS":
      console.log("Login Success");
      return { ...state, adminLogin: true, authError: null };
    case "SIGNOUT_SUCCESS":
      console.log("Sign out success");
      return { ...state, adminLogin: false, authError: null };
    case "SIGNOUT_ERROR":
      console.log("Sign out failure: " + action.err.message);
      return state;
    case "GET_USERINFO":
      return { ...state, user: action.user, userError: null };
    case "GET_USERINFO_ERROR":
      return { ...state, user: null, userError: true };
    default:
      return state;
  }
};
export default authReducer;
