import rootReducer from '@redux/RootReducer';
import React, {Component} from 'react';
// import Permissions from "react-native-permissions";
import SplashScreen from 'react-native-splash-screen';
import {composeWithDevTools} from 'remote-redux-devtools';
import {Provider, compose} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AppNavigator from '@routing/Router';
import {View} from 'react-native';
export default class App extends Component {
  componentDidMount() {
    // Permissions.check("photo").then(response => {
    //   // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    //   this.setState({ photoPermission: response });
    // });
  }

  render() {
    const composeEnhancers = composeWithDevTools({
      realtime: true,
    });
    const store = createStore(
      rootReducer,
      /* preloadedState, */ composeWithDevTools(
        applyMiddleware(thunk),
        // other store enhancers if any
      ),
    );

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
