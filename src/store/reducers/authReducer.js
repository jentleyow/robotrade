const initState = {
  authError: null,
  editProfileSuccess: false
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: action.err.message };
    case "LOGIN_SUCCESS":
      console.log("Login Success");
      return { ...state, authError: null };
    case "SIGNUP_SUCCESS":
      console.log("Sign up success");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    case "SIGNOUT_SUCCESS":
      console.log("Sign out success");
      return state;
    case "SIGNOUT_ERROR":
      console.log("Sign out failure: " + action.err.message);
      return state;
    case "RESET_AUTHERROR":
      return {
        ...state,
        authError: null
      };
    case "EDITPROFILE_SUCCESS":
      return {
        ...state,
        editProfileSuccess: true,
        authError: null
      };
    case "EDITPROFILE_ERROR":
      return {
        ...state,
        editProfileSuccess: false,
        authError: action.err.message
      };
    case "RESET_EDITPROFILE":
      console.log("E");
      return {
        ...state,
        editProfileSuccess: false
      };
    default:
      return state;
  }
};
export default authReducer;
