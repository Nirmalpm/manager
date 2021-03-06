import {EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS, EMPLOYEE_SAVE_SUCCESS} from './types';
import { Actions } from 'react-native-router-flux';
import firebase from '@firebase/app';
import '@firebase/database';

export const employeeUpdate = ({prop, value}) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: {prop, value}
  };
};


export const employeeCreate = ({name, phone, shift}) => {
  console.log(name, phone, shift);
  const {currentUser} =  firebase.auth();
  console.log(currentUser);
  ///users/userId/employees
  //firebase.database.ref('/users/userId/employees')
  //string interpolation here
  //Not passing dispatch but reduxThunk will come into picture
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({name, phone, shift})
    .then(() => {
      dispatch({type:EMPLOYEE_CREATE});
      Actions.employeeList({type:'reset'});

    });
  };
}

export const employeeSave = ({name, phone, shift,uid}) => {
  console.log(name, phone, shift,uid);
  const {currentUser} =  firebase.auth();
  console.log(currentUser);
  ///users/userId/employees
  //firebase.database.ref('/users/userId/employees')
  //string interpolation here
  //Not passing dispatch but reduxThunk will come into picture
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .set({name, phone, shift})
    .then(() => {
      dispatch({type:EMPLOYEE_SAVE_SUCCESS});
      Actions.employeeList({type:'reset'});

    });
  };
}

export const employeesFetch = () => {
  const {currentUser} =  firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .on('value', snapshot => {
      dispatch({
        type: EMPLOYEES_FETCH_SUCCESS,
        payload: snapshot.val()
      });
    });
  }
};

export const employeeDelete = ({uid}) => {
  console.log(uid);
  const {currentUser} =  firebase.auth();
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .remove().then(() => {
        Actions.employeeList({type:'reset'});
    });
  };
};
