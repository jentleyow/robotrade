export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const {
      firstName,
      lastName,
      nric,
      nationality,
      address,
      email,
      password,
      retype,
      referralid
    } = newUser;
    if (firstName === "") {
      formatEmptyFieldError(dispatch, "First name");
    } else if (lastName === "") {
      formatEmptyFieldError(dispatch, "Last name");
    } else if (nric === "") {
      formatEmptyFieldError(dispatch, "NRIC");
    } else if (nationality === "") {
      formatEmptyFieldError(dispatch, "Nationality");
    } else if (address === "") {
      formatEmptyFieldError(dispatch, "Address");
    } else if (email === "") {
      formatEmptyFieldError(dispatch, "Email");
    } else if (password === "") {
      formatEmptyFieldError(dispatch, "Password");
    } else if (password !== retype) {
      const err = { message: "Both passwords must match." };
      dispatch({ type: "SIGNUP_ERROR", err });
    } else {
      ////////////////////////////////////// ADD USER//////////////////////////////////////
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(createdUser => {
          firestore
            .collection("users")
            .doc(createdUser.user.uid)
            .set({
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              nric: newUser.nric,
              nationality: newUser.nationality,
              gender: newUser.gender,
              address: newUser.address,
              email: newUser.email,
              password: newUser.password
            })
            .then(() => {
              ////////////////////////////////////// ADD USER//////////////////////////////////////
              dispatch({ type: "SIGNUP_SUCCESS" }); // if add user successfully

              if (referralid !== null) {
                // if there is a referralid
                firestore
                  .collection("users")
                  .doc(referralid)
                  .get()
                  //////////////////////////////VERIFY REFERRAL ID  //////////////////////////////
                  //////////////////////////////ADD REFERRAL//////////////////////////////
                  .then(res => {
                    if (res.data()) {
                      // if referral id exist then add referral
                      firestore
                        .collection("users")
                        .doc(referralid)
                        .collection("referrals")
                        .doc(createdUser.user.uid)
                        .set({
                          date: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        .then(() => {
                          console.log("Referral Added");
                        });
                    }
                  });
                //////////////////////////////ADD REFERRAL//////////////////////////////
              }
            })
            .catch(err => {
              dispatch({ type: "SIGNUP_ERROR", err });
            });
        });
    }
  };
};
const formatEmptyFieldError = (dispatch, value) => {
  const err = { message: value + " cannot be empty." };
  dispatch({ type: "SIGNUP_ERROR", err });
};
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNOUT_ERROR", err });
      });
  };
};
export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};
export const resetAuthError = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_AUTHERROR" });
  };
};
export const editProfile = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const {
      firstName,
      lastName,
      nric,
      nationality,
      gender,
      address,
      password,
      retype
    } = user;
    if (firstName === "") {
      formatEmptyUpdateFieldError(dispatch, "First name");
    } else if (lastName === "") {
      formatEmptyUpdateFieldError(dispatch, "Last name");
    } else if (nric === "") {
      formatEmptyUpdateFieldError(dispatch, "NRIC");
    } else if (nationality === "") {
      formatEmptyUpdateFieldError(dispatch, "Nationality");
    } else if (address === "") {
      formatEmptyUpdateFieldError(dispatch, "Address");
    } else if (password === "") {
      formatEmptyUpdateFieldError(dispatch, "Password");
    } else if (password !== retype) {
      const err = { message: "Both passwords must match." };
      dispatch({ type: "EDITPROFILE_ERROR", err });
    } else {
      let user = firebase.auth().currentUser;
      user
        .updateProfile({
          password: password
        })
        .then(() => {
          firestore
            .collection("users")
            .doc(user.uid)
            .update({
              firstName,
              lastName,
              nric,
              nationality,
              gender,
              address,
              password
            })
            .then(res => {
              dispatch({ type: "EDITPROFILE_SUCCESS" });
            });
        })
        .catch(err => {
          dispatch({ type: "EDITPROFILE_ERROR", err });
        });
    }
  };
};

const formatEmptyUpdateFieldError = (dispatch, value) => {
  const err = { message: value + " cannot be empty." };
  dispatch({ type: "EDITPROFILE_ERROR", err });
};
export const resetEditProfile = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_EDITPROFILE" });
  };
};
