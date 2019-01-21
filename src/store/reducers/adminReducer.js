const initState = {
  authError: null,
  adminLogin: false
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
    default:
      return state;
  }
};
export default authReducer;
