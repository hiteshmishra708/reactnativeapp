import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Text from '@textView/TextView';
import Input from '@editText/EditText';
import DropdownAlert from 'react-native-dropdownalert';
import Button from '@button/Button';
import localStyles from '@forgotpwd/ForgotPwdStyles';
import {Overlay} from 'react-native-elements';
import {dispatchForgetPwd} from '@forgotpwd/ForgetPasswordAction';
import StatusBar from '@statusBar/StatusBar';
import {emailOrMobileValidation} from '@resources/Validate';

import {
  ForgotPwdHeader,
  ForgotEmail,
  ForgotHint,
  ForgotBtn,
} from '@resources/String';
// import Logo from '@icons/login.svg';

//todo
//text to be moved to strings.js

class ForgotPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packUpModel: true,
      userNameErr: '',
      userName: '',
    };
  }

  validate = () => {
    let checkemail = emailOrMobileValidation(this.state.userName);
    if (checkemail) {
      this.setState({userNameErr: checkemail});
    } else {
      this.props.dispatchForgetPwd(
        'forgotpwd',
        {mobileEmail: this.state.userName},
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

  isSuccessCallback = () => {
    this.props.navigation.navigate('Otp', {email: this.state.userName});
  };

  checkUserName(userName) {
    let validate = emailOrMobileValidation(userName);
    if (validate) {
      this.setState({userNameErr: validate, userName});
    } else {
      this.setState({userName, userNameErr: ''});
    }
  }

  render() {
    const {
      flex1,
      inputlogoView,
      header,
      inputStyle,
      btnstyle,
      btnSize,
      btnTitleStyle,
      overlayStyle,
    } = localStyles;
    return (
      <View style={flex1}>
        <StatusBar barStyle="light-content" color="#7D85FF" />
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        <View style={inputlogoView}>
          <View style={{marginBottom: 25}}>
            {/* <Logo /> */}
          </View>
          <Text style={header}>{ForgotPwdHeader}</Text>
          <Input
            onSubmitEditing={this.validate}
            text={ForgotEmail}
            inputContainerStyle={inputStyle}
            style={{marginBottom: 5}}
            inputStyle={{fontSize: 14}}
            value={this.state.userName}
            onChange={username => this.checkUserName(username)}
            errmsg={this.state.userNameErr}
          />
          <Text
            style={{
              color: 'rgba(118, 118, 118, 0.7)',
              fontSize: 14,
              lineHeight: 18,
              marginHorizontal: 20,
            }}>
            {ForgotHint}
          </Text>
          <Button
            style={btnstyle}
            title={ForgotBtn}
            buttonStyle={btnSize}
            backgroundColor={{backgroundColor: '#B5E6E6'}}
            titleStyle={btnTitleStyle}
            onPress={this.validate}
          />
        </View>
        {this.props.loading ? (
          <Overlay overlayStyle={overlayStyle} isVisible={this.props.loading}>
            <ActivityIndicator color="black" />
          </Overlay>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  error: state.ForgetPasswordReducer.error,
  errorMessage: state.ForgetPasswordReducer.errorMessage,
  loading: state.ForgetPasswordReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchForgetPwd: (method, Credential, isSuccessCall, isFailCall) => {
    dispatch(dispatchForgetPwd(method, Credential, isSuccessCall, isFailCall));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwd);
