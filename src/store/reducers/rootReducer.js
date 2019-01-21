import authReducer from "./authReducer";
import referralReducer from "./referralReducer";
import paymentReducer from "./paymentReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
const rootReducer = combineReducers({
  auth: authReducer,
  referral: referralReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  payment: paymentReducer
});
export default rootReducer;
