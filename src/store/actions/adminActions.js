export const signIn = credentials => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const { email, password } = credentials;
    //check whether admin first
    firestore
      .collection("admin")
      .where("email", "==", email)
      .where("password", "==", password)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          //admin dont exist
          const err = { message: "Wrong email/password" };
          dispatch({ type: "LOGIN_ERROR", err });
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              dispatch({ type: "LOGIN_SUCCESS", adminLogin: true });
            })
            .catch(err => {
              dispatch({ type: "LOGIN_ERROR", err });
            });
        }
      })
      .catch(() => {
        const err = { message: "Login failure" };
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS", adminLogin: false });
      })
      .catch(err => {
        dispatch({ type: "SIGNOUT_ERROR", err });
      });
  };
};
export const getUserInfo = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let user = [];
    firestore
      .collection("users")
      .doc(id)
      .get()
      .then(res => {
        user = res.data();
        firestore
          .collection("users")
          .doc(id)
          .collection("payments")
          .get()
          .then(result => {
            let payments = [];
            let no = 1;
            result.docs.map(re => {
              payments.push({ no: no, id: re.id, ...re.data() });
              no++;
            });
            user.payments = payments;
            dispatch({ type: "GET_USERINFO", user: user });
          })
          .catch(() => {
            dispatch({ type: "GET_USERINFO_ERROR" });
          });
      })
      .catch(() => {
        dispatch({ type: "GET_USERINFO_ERROR" });
      });
  };
};
