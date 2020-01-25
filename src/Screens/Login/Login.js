import React, {Component} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import StatusBar from '@statusBar/StatusBar';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Text from '@textView/TextView';
import Input from '@editText/EditText';
import Button from '@button/Button';
import localStyles from '@login/LoginStyles';
import {dispatchLogin} from '@login/LoginAction';
import {Overlay} from 'react-native-elements';
// import Logo from '@icons/login.svg';
import {debounce} from 'lodash';
import {emailOrMobileValidation, passwordValidation} from '@resources/Validate';
import {
  HeaderText,
  UsernameText,
  PasswordText,
  ForgotPasswordText,
} from '@resources/String';

//todo
//text to be moved to strings.js

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packUpModel: true,
      userName: '',
      passowrd: '',
      userNameErr: '',
      pwdErr: '',
    };
  }

  componentDidMount() {
    this.checkIfLogedin();
  }

  async checkIfLogedin() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value) {
        this.props.navigation.navigate('Home');
      }
    } catch (error) {}
  }

  checkUserName(userName) {
    let validate = emailOrMobileValidation(userName);
    if (validate) {
      this.setState({userNameErr: validate, userName});
    } else {
      this.setState({userName, userNameErr: ''});
    }
  }

  checkPassword(password) {
    let validate = passwordValidation(password);
    if (validate) {
      this.setState({pwdErr: validate, password});
    } else {
      this.setState({password, pwdErr: ''});
    }
  }

  validate = () => {
    let checkemail = emailOrMobileValidation(this.state.userName);
    let checkpassword = passwordValidation(this.state.password);
    if (checkemail || checkpassword) {
      this.setState({userNameErr: checkemail, pwdErr: checkpassword});
    } else {
      this.props.dispatchlogin(
        'login',
        {mobileEmail: this.state.userName, password: this.state.password},
        this.isSuccessCallback,
        this.isFail,
      );
    }
  };

  isFail = () => {
    this.dropDownAlertRef.alertWithType(
      'error',
      'Error',
      this.props.errorMessage,
    );
  };

  isSuccessCallback = async data => {
    try {
      await AsyncStorage.multiSet([
        ['currentUser', this.state.userName],
        ['token', data.userData.token],
        ['user_mob', data.userData.user_mob],
        ['role_id', data.userData.role_id.toString()],
        ['user_email', data.userData.user_email],
        ['user_id', data.userData.user_id.toString()],
        ['city_id', data.userData.city_id.toString()],
      ]);
      this.props.navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {
      flex1,
      inputlogoView,
      header,
      username,
      password,
      overlayStyle,
      btnstyle,
      btnSize,
      btnTitleStyle,
    } = localStyles;
    return (
      <View style={flex1}>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        <StatusBar barStyle="light-content" color="#7D85FF" />
        {this.props.loading ? (
          <Overlay overlayStyle={overlayStyle} isVisible={this.props.loading}>
            <ActivityIndicator color="black" />
          </Overlay>
        ) : null}
        {/* <Logo /> */}
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: 15,
            marginVertical: 50,
          }}>
          <Text style={{fontSize: 20, color: 'rgba(111, 111, 111, 0.8)'}}>
            {HeaderText}
          </Text>
          <Input
            onSubmitEditing={() => {
              this.password.focus();
            }}
            blurOnSubmit={false}
            inputRef={ref => (this.username = ref)}
            errmsg={this.state.userNameErr}
            text={UsernameText}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 8,
              marginHorizontal: -10,
              marginTop: 30,
              borderColor: '#D3F0F0',
              paddingHorizontal: 10,
            }}
            style={{marginBottom: 32}}
            inputStyle={{fontSize: 14}}
            onChange={username => this.checkUserName(username)}
          />
          <Input
            text={PasswordText}
            booleanvalue={true}
            onSubmitEditing={this.validate}
            blurOnSubmit={true}
            inputRef={ref => (this.password = ref)}
            errmsg={this.state.pwdErr}
            onChange={username => this.checkPassword(username)}
            style={{marginBottom: 16}}
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: 8,
              marginHorizontal: -10,
              borderColor: '#D3F0F0',
              paddingHorizontal: 10,
            }}
            inputStyle={{fontSize: 14}}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPwd')}
            style={{alignSelf: 'flex-end'}}>
            <Text style={{color: 'rgba(118, 118, 118, 0.7)', fontSize: 14}}>
              {ForgotPasswordText}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title={HeaderText}
          buttonStyle={{borderRadius: 8, height: 50, marginHorizontal: 15}}
          backgroundColor={{backgroundColor: '#B5E6E6'}}
          titleStyle={btnTitleStyle}
          onPress={debounce(this.validate, 1000)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.LoginReducer.error,
  errorMessage: state.LoginReducer.errorMessage,
  loading: state.LoginReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchlogin: (method, Credential, isSuccessCall, isFailCall) => {
    dispatch(dispatchLogin(method, Credential, isSuccessCall, isFailCall));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
