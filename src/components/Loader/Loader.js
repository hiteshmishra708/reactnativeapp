import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {Overlay} from 'react-native-elements';

export default class Loader extends Component {
  render() {
    return (
      <>
        {this.props.loading ? (
          <View style={styles.overlayStyle}>
            <ActivityIndicator size={40} color="#4062E2" />
            <Text style={styles.textStyle}>Loading</Text>
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100 %',
    width: '100%',
    position: 'absolute',
    elevation: 1,
    zIndex: 10,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#707070',
  },
});
