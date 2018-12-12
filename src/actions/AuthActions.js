import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER} from './types';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Actions } from 'react-native-router-flux';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
};

export const loginUser = ({email, password}) => {
  console.log(email,password);
  return (dispatch) => {
    dispatch({type: LOGIN_USER});
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user =>loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
    });
   };
  };

const loginUserFail = (dispatch) => {
  console.log('Inside loginUserFail');
  dispatch({
    type:LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  console.log('Inside login Usersuccess');
  dispatch({
    type:LOGIN_USER_SUCCESS,
    payload:user
  });

  Actions.main();
};
