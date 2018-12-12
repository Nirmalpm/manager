import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import firebase from '@firebase/app';
import '@firebase/auth';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
  componentWillMount(){
      const config = {
       apiKey: 'AIzaSyDBbeu88ll1vyNp0eQPyu3sKjXsp3Jhm20',
       authDomain: 'authentication-12cc7.firebaseapp.com',
       databaseURL: 'https://authentication-12cc7.firebaseio.com',
       projectId: 'authentication-12cc7',
       storageBucket: 'authentication-12cc7.appspot.com',
       messagingSenderId: '1049900196943'
     };
     firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers,{},applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
