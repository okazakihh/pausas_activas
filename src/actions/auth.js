import { types } from "../types/Types";
import { firebase, googleAuthProvider } from "../firebase/config-firebase";

export const googlelogin = () => {
  var urlFoto="";
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
     .then(({ user }) => {
   
    dispatch(login(user.uid, user.displayName, user.photoURL));
});
  };
};

export const emailAndPasswordLogin = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const register = (email, password, username) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: username });

        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const logout = () => {
  return async(dispatch) => {
    await firebase.auth().signOut();
    dispatch({
      type: types.logout,
    });

  }
}