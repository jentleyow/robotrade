import authReducer from "./authReducer";
import referralReducer from "./referralReducer";
import paymentReducer from "./paymentReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
const rootReducer = combineReducers({
  auth: authReducer,
  referral: referralReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  payment: paymentReducer,
  admin: adminReducer
});
export default rootReducer;
