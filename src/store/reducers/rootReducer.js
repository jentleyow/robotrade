import authReducer from "./authReducer";
import referralReducer from "./referralReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
const rootReducer = combineReducers({
  auth: authReducer,
  referral: referralReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  admin: adminReducer
});
export default rootReducer;
