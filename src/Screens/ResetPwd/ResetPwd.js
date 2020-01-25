import React, {Component} from 'react';
import {View, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Text from '@textView/TextView';
import Input from '@editText/EditText';
import DropdownAlert from 'react-native-dropdownalert';
import Button from '@button/Button';
import localStyles from '@resetpwd/ResetPwdStyles';
import {dispatchResetPwd} from '@resetpwd/ResetPwdAction';
import {RESET_VALUE} from '@redux/Types';
import Logo from '@icons/login.svg';
import {passwordValidation} from '@resources/Validate';
import Loader from '@loader/Loader';
import {
  HeaderText,
  UsernameText,
  PasswordText,
  ForgotPasswordText,
} from '@resources/String';

//todo
//text to be moved to strings.js

class ResetPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      oldpasswordErr: '',
      newpasswordErr: '',
      confirmpasswordErr: '',
      userName: '',
      token: '',
    };
  }
  componentDidMount() {
    this.getUserId();
  }

  async getUserId() {
    try {
      const value = await AsyncStorage.getItem('currentUser');
      const value2 = await AsyncStorage.getItem('token');
      this.setState({userName: value, token: value2});
    } catch (error) {
      console.log(error);
    }
  }
  checkoldPassword(oldpassword) {
    let validate = passwordValidation(oldpassword);
    if (validate) {
      this.setState({oldpasswordErr: validate, oldpassword});
    } else {
      this.setState({oldpassword, oldpasswordErr: ''});
    }
  }
  checknewPassword(newpassword) {
    let validate = passwordValidation(newpassword);
    if (validate) {
      this.setState({newpasswordErr: validate, newpassword});
    } else {
      if (newpassword == this.state.oldpassword) {
        this.setState({
          newpasswordErr: 'old and new passoword cannot be same.',
          newpassword,
        });
      } else {
        this.setState({newpassword, newpasswordErr: ''});
      }
    }
  }
  checkconfirmPassword(confirmpassword) {
    let validate = passwordValidation(confirmpassword);
    if (validate) {
      this.setState({confirmpasswordErr: validate, confirmpassword});
    } else {
      if (confirmpassword != this.state.newpassword) {
        this.setState({
          confirmpasswordErr: 'Password does not match.',
          confirmpassword,
        });
      } else {
        this.setState({confirmpassword, confirmpasswordErr: ''});
      }
    }
  }

  validate = () => {
    const {confirmpassword, oldpassword, newpassword} = this.state;
    let old = passwordValidation(oldpassword);
    let New = passwordValidation(newpassword);
    let confirm = passwordValidation(confirmpassword);
    if (old || New || confirm) {
      this.setState({
        confirmpasswordErr: confirm,
        newpasswordErr: New,
        oldpasswordErr: old,
      });
    } else {
      if (oldpassword === newpassword) {
        this.setState({
          confirmpasswordErr: confirm,
          newpasswordErr: 'old and new passoword cannot be same.',
          oldpasswordErr: old,
        });
      } else if (newpassword != confirmpassword) {
        this.setState({confirmpasswordErr: 'Password does not match.'});
      } else {
        let obj = {
          header: this.state.token,
          body: {
            password: this.state.oldpassword,
            newPassword: this.state.newpassword,
          },
        };
        this.props.dispatchResetPwd(
          'changepwd',
          obj,
          this.isSuccessCall,
          this.isFailCall,
        );
      }
    }
  };

  isSuccessCall = () => {
    this.props.navigation.navigate('Home');
  };

  isFailCall = () => {
    this.dropDownAlertRef.alertWithType(
      'error',
      'Error',
      this.props.errorMessage,
    );
  };

  render() {
    const {
      flex1,
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
          <Loader loading={this.props.loading} />
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
              RESET PASSWORD
            </Text>
            <Input
              onSubmitEditing={() => {
                this.newpassowrd.focus();
              }}
              blurOnSubmit={false}
              inputRef={ref => (this.oldpassword = ref)}
              errmsg={this.state.oldpasswordErr}
              text="Enter old password"
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 8,
                marginHorizontal: -10,
                marginTop: 30,
                borderColor: '#D3F0F0',
                paddingHorizontal: 10,
              }}
              // style={{ marginBottom: 16 }}
              inputStyle={{fontSize: 14}}
              onChange={oldpassword => this.checkoldPassword(oldpassword)}
            />
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
              onChange={newpassowrd => this.checknewPassword(newpassowrd)}
            />
            <Input
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
            title="SAVE"
            buttonStyle={{borderRadius: 8, height: 50, marginHorizontal: 15}}
            backgroundColor={{backgroundColor: '#B5E6E6'}}
            titleStyle={btnTitleStyle}
            onPress={this.validate}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.ResetPwdReducer.error,
  errorMessage: state.ResetPwdReducer.errorMessage,
  loading: state.ResetPwdReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatchResetPwd: (method, data, isSuccessCallBack, isFailCall) => {
    dispatch(dispatchResetPwd(method, data, isSuccessCallBack, isFailCall));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPwd);



