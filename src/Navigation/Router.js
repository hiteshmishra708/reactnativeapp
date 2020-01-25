import { Dimensions } from 'react-native'
const { width } = Dimensions.get('screen');
import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from "react-navigation";

import Login from "@login/Login";
import ForgotPwd from "@forgotpwd/ForgotPwd";

const OAuth = createStackNavigator({
  Login,
  ForgotPwd
}, {
  initialRouteName: "Login",
  defaultNavigationOptions: {
    header: null
  }
})

export default createAppContainer(createSwitchNavigator({
  OAuth,
  // AppNavigator
}, {
  initialRouteName: "OAuth",
  defaultNavigationOptions: {
    header: null
  }
})
);
