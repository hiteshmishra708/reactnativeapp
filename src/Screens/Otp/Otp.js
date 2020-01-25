import React, {Component} from 'react';
import {View, ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {connect} from 'react-redux';
import Text from '@textView/TextView';
import Input from '@editText/EditText';
import Button from '@button/Button';
import localStyles from '@otp/OtpStyles';
// import { dispatchLogin } from "@login/LoginAction";
import {Overlay} from 'react-native-elements';
import {RESET_VALUE} from '@redux/Types';
import Logo from '@icons/login.svg';
import {passwordValidation} from '@resources/Validate';
import {
  HeaderText,
  UsernameText,
  PasswordText,
  ForgotPasswordText,
} from '@resources/String';
import {dispatchOtp} from '@otp/OtpAction';

//todo
//text to be moved to strings.js

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newpassword: '',
      confirmpassword: '',
      newpasswordErr: '',
      confirmpasswordErr: '',
      otp: {},
      otperr: '',
    };
  }

  otpHandler(number, input) {
    let older = this.state.otp;
    older[input] = number;
    this.setState({otp: older});
  }

  checknewPassword(newpassword) {
    let validate = passwordValidation(newpassword);
    if (validate) {
      this.setState({newpasswordErr: validate, newpassword});
    } else {
      this.setState({newpassword, newpasswordErr: ''});
    }
  }
  checkconfirmPassword(confirmpassword) {
    let validate = passwordValidation(confirmpassword);
    if (validate) {
      if (confirmpassword != this.state.newpassword) {
        this.setState({
          confirmpasswordErr: 'Password does not Match',
          confirmpassword,
        });
      } else {
        this.setState({confirmpasswordErr: validate, confirmpassword});
      }
    } else {
      if (confirmpassword != this.state.newpassword) {
        this.setState({
          confirmpasswordErr: 'Password does not Match',
          confirmpassword,
        });
      } else {
        this.setState({confirmpassword, confirmpasswordErr: ''});
      }
    }
  }

  validate = () => {
    let otp = '';
    for (let i = 1; i < 5; i++) {
      otp += [this.state.otp[i]];
    }
    let validold = passwordValidation(this.state.confirmpassword);
    let validnew = passwordValidation(this.state.newpassword);
    if (validold || validnew) {
      this.setState({confirmpasswordErr: validold, newpasswordErr: validnew});
    } else {
      if (this.state.confirmpassword != this.state.newpassword) {
        this.setState({confirmpasswordErr: 'Password does not Match'});
      } else {
        let obj = {
          mobileEmail: this.props.navigation.state.params.email,
          newpwd: this.state.newpassword,
          otp: otp,
        };
        this.props.dispatchOtp(
          'validateotp',
          obj,
          this.isSuccessCallback,
          this.isFail,
        );
      }
    }
  };
  isFail = data => {
    this.dropDownAlertRef.alertWithType(
      'error',
      'Error',
      this.props.errorMessage,
    );
  };

  isSuccessCallback = () => {
    // this.dropDownAlertRef.alertWithType("success", "Success", "");
    this.props.navigation.navigate('Login');
  };
  render() {
    const {
      flex1,
      overlayStyle,
      inputlogoView,
      header,
      username,
      password,
      btnstyle,
      btnSize,
      btnTitleStyle,
    } = localStyles;
    return (
      <View style={flex1}>
        <SafeAreaView style={flex1}>
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />

          <StatusBar backgroundColor="#7D85FF" />
          <Logo />
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              marginHorizontal: 15,
              marginVertical: 50,
            }}>
            <Text style={{fontSize: 20, color: 'rgba(111, 111, 111, 0.8)'}}>
              ENTER OTP
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginTop: 30,
              }}>
              <Input
                onSubmitEditing={() => {
                  this.otp2.focus();
                }}
                blurOnSubmit={false}
                maxLength={1}
                keyboardType="numeric"
                inputRef={ref => (this.otp1 = ref)}
                errmsg={this.state.newpassowrdErr}
                text="1"
                inputContainerStyle={{}}
                style={{width: '15%'}}
                inputStyle={{
                  fontSize: 20,
                  color: '#6F6F6F',
                  textAlign: 'center',
                  paddingBottom: 0,
                }}
                onChange={text => {
                  this.otpHandler(text, '1');
                  text == '' ? null : this.otp2.focus();
                }}
              />
              <Input
                onSubmitEditing={() => {
                  this.otp3.focus();
                }}
                blurOnSubmit={false}
                maxLength={1}
                keyboardType="numeric"
                inputRef={ref => (this.otp2 = ref)}
                errmsg={this.state.newpassowrdErr}
                text="2"
                inputContainerStyle={{}}
                style={{width: '15%'}}
                inputStyle={{
                  fontSize: 20,
                  color: '#6F6F6F',
                  textAlign: 'center',
                  paddingBottom: 0,
                }}
                onChange={text => {
                  this.otpHandler(text, '2');
                  text == '' ? null : this.otp3.focus();
                }}
              />
              <Input
                onSubmitEditing={() => {
                  this.otp4.focus();
                }}
                blurOnSubmit={false}
                maxLength={1}
                keyboardType="numeric"
                inputRef={ref => (this.otp3 = ref)}
                errmsg={this.state.newpassowrdErr}
                text="2"
                inputContainerStyle={{}}
                style={{width: '15%'}}
                inputStyle={{
                  fontSize: 20,
                  color: '#6F6F6F',
                  textAlign: 'center',
                  paddingBottom: 0,
                }}
                onChange={text => {
                  this.otpHandler(text, '3');
                  text == '' ? null : this.otp4.focus();
                }}
              />
              <Input
                onSubmitEditing={() => {
                  this.newpassowrd.focus();
                }}
                blurOnSubmit={false}
                inputRef={ref => (this.otp4 = ref)}
                errmsg={this.state.newpassowrd}
                text="2"
                maxLength={1}
                keyboardType="numeric"
                inputContainerStyle={{}}
                style={{width: '15%'}}
                inputStyle={{
                  fontSize: 20,
                  color: '#6F6F6F',
                  textAlign: 'center',
                  paddingBottom: 0,
                }}
                onChange={text => {
                  this.otpHandler(text, '4');
                  text == '' ? null : this.newpassowrd.focus();
                }}
              />
            </View>
            <Text>{this.state.otperr ? this.state.otperr : null}</Text>
            <Text style={{marginTop: 15, color: '#6F6F6F'}}>
              We have sent you an OTP on your registered Mobile/Email.
            </Text>
            <Text style={{marginTop: 10, color: '#EF6060'}}>
              OTP expires in 02:23
            </Text>
            <Input
              onSubmitEditing={() => {
                this.confirmpassword.focus();
              }}
              blurOnSubmit={false}
              inputRef={ref => (this.newpassowrd = ref)}
              errmsg={this.state.newpasswordErr}
              text="Enter new password"
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 8,
                marginHorizontal: -10,
                marginTop: 30,
                borderColor: '#D3F0F0',
                paddingHorizontal: 10,
              }}
              style={{marginBottom: 30}}
              inputStyle={{fontSize: 14}}
              booleanvalue={true}
              onChange={newpassowrd => this.checknewPassword(newpassowrd)}
            />
            <Input
              booleanvalue={true}
              text="Re-enter password"
              onSubmitEditing={this.validate}
              blurOnSubmit={true}
              inputRef={ref => (this.confirmpassword = ref)}
              errmsg={this.state.confirmpasswordErr}
              onChange={confirmpassword =>
                this.checkconfirmPassword(confirmpassword)
              }
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
          </View>
          <Button
            title="VERIFY"
            buttonStyle={{borderRadius: 8, height: 50, marginHorizontal: 15}}
            backgroundColor={{backgroundColor: '#B5E6E6'}}
            titleStyle={btnTitleStyle}
            onPress={this.validate}
          />
          {this.props.loading ? (
            <Overlay overlayStyle={overlayStyle} isVisible={this.props.loading}>
              <ActivityIndicator color="black" />
            </Overlay>
          ) : null}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.NotificationReducer.error,
  errorMessage: state.NotificationReducer.errorMessage,
  loading: state.NotificationReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchOtp: (method, object, isSuccessCall, isFailCall) => {
    dispatch(dispatchOtp(method, object, isSuccessCall, isFailCall));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Otp);
