import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Text from '@textView/TextView';
import StatusBar from '@statusBar/StatusBar';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {dispatchProfile, dispatchCity} from '@profile/ProfileAction';
import Button from '@button/Button';
import Time from '@icons/time.svg';
import Back from '@icons/arrowback.svg';
import Logout from '@icons/logout.svg';
import Team from '@icons/team.svg';
import Report from '@icons/report.svg';
import Lock from '@icons/lock.svg';
import localStyles from '@profile/ProfileStyles';
import Header from '@header/Header';
class Profile extends Component {
  state = {
    userName: '',
    email: '',
    mobNo: '',
    city: [],
    currentCity: '',
    showBtn: false,
  };
  getDetail = async () => {
    let userName = await AsyncStorage.getItem('currentUser');
    let email = await AsyncStorage.getItem('user_email');
    let currentCity = await AsyncStorage.getItem('city_id');
    let mobNo = await AsyncStorage.getItem('user_mob');
    this.props.dispatchCity(
      'citylist',
      data => {
        var arr = [];
        data.map(data => {
          arr.push(data.city_name);
        });

        this.setState({city: arr});
      },
      () => alert('fail'),
    );
    this.setState({userName, email, mobNo, currentCity});
  };
  componentDidMount() {
    this.getDetail();
  }

  cityChange = async index => {
    this.setState({currentCity: this.state.city[index], showBtn: true});
    // await AsyncStorage.setItem(['city_id',]);
  };

  mainView() {
    const {
      flex1,
      imgStyle,
      mainSubView,
      textStyle,
      flexRow,
      pageNameView,
    } = localStyles;
    return (
      <View style={flex1}>
        <View style={mainSubView}>
          <Image
            style={imgStyle}
            source={{
              uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
            }}
          />
          <Text bold style={textStyle}>
            {this.state.userName}
          </Text>
          <Text style={textStyle}>{this.state.email}</Text>
          <Text style={textStyle}>{this.state.mobNo}</Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <ModalDropdown
              textStyle={{
                width: '100%',
                ...textStyle,
                textAlign: 'center',
              }}
              // defaultValue={data.per_unit[i]}
              onSelect={index => this.cityChange(index)}
              style={{width: '30%', borderBottomWidth: 0.5}}
              options={this.state.city}
              dropdownStyle={{
                width: '30%',
                height: 'auto',
              }}
              dropdownTextStyle={textStyle}
            />
            {this.state.showBtn ? (
              <Button
                textStyle={{fontSize: 8}}
                buttonStyle={{
                  marginLeft: 15,
                  height: 40,
                  width: 100,
                }}
                title={'Save'}></Button>
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Activity')}
            style={flexRow}>
            <Time />
            <View style={pageNameView}>
              <Text style={textStyle}>Activity</Text>
            </View>
            <Back />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Team')}
            style={flexRow}>
            <Team />
            <View style={pageNameView}>
              <Text style={textStyle}>Team </Text>
            </View>
            <Back />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Report')}
            style={flexRow}>
            <Report />
            <View style={pageNameView}>
              <Text style={textStyle}>Report</Text>
            </View>
            <Back />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ResetPwd')}
            style={flexRow}>
            <Lock />
            <View style={pageNameView}>
              <Text style={textStyle}>Change Password</Text>
            </View>
            <Back />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logout} style={flexRow}>
            <Logout />
            <View style={pageNameView}>
              <Text style={textStyle}>Logout</Text>
            </View>
            <View style={{width: 19, height: 19}}></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  logout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      this.props.dispatchProfile(
        'logout',
        token,
        async () => {
          alert('done'), await AsyncStorage.removeItem('token');
          this.props.navigation.navigate('Login');
        },
        () => alert('fail'),
      );
    } catch (error) {}
  };

  render() {
    const {flex1} = localStyles;
    return (
      <View style={flex1}>
        <Header
          rightIconPress={() => this.props.navigation.navigate('Notification')}
          title={'Account'}
          showNotification
        />
        {this.mainView()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.ProfileReducer.errorMessage,
  loading: state.ProfileReducer.loading,
  cityList: state.ProfileReducer.cityList,
  cityError: state.ProfileReducer.cityError,
});

const mapDispatchToProps = dispatch => ({
  dispatchProfile: (method, data, isSuccessCallBack, isFailCall) => {
    dispatch(dispatchProfile(method, data, isSuccessCallBack, isFailCall));
  },
  dispatchCity: (method, isSuccessCallBack, isFailCall) => {
    dispatch(dispatchCity(method, isSuccessCallBack, isFailCall));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
