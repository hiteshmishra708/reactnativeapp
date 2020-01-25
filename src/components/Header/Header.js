import styles from '@header/HeaderStyle';

import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Header as ToolBar} from 'react-native-elements';
import {PRIMARY_COLOR} from '@resources/Constants';
import Left from '@icons/Back.svg';
import Notification from '@icons/notificationBell.svg';
function renderLeftComponent(props) {
  const {showBack, headerColor, leftIconPress} = props;
  var color = headerColor ? headerColor : PRIMARY_COLOR;
  return (
    <View style={[styles.horizontalDirection, styles.marginHorizontal]}>
      <TouchableOpacity onPress={leftIconPress}>
        {showBack && <Left fill={color} />}
      </TouchableOpacity>
    </View>
  );
}

function renderCenterComponent(props) {
  const {title, titleStyle, headerColor} = props;
  var color = headerColor ? {color: headerColor} : {};
  return (
    <View style={styles.horizontalDirection}>
      <Text style={[styles.titleStyle, titleStyle, color]}>
        {title || 'Quill'}
      </Text>
    </View>
  );
}

function renderRightComponent(props) {
  const {
    headerColor,
    rightIconPress,
    showNotification,
    text,
    textStyle,
  } = props;
  var color = headerColor ? headerColor : PRIMARY_COLOR;
  return (
    <View style={styles.horizontalDirection}>
      <TouchableOpacity style={{width: 'auto'}} onPress={rightIconPress}>
        {text && <Text style={textStyle}>{text}</Text>}

        {showNotification && (
          <Notification fill={color} style={styles.marginHorizontal} />
        )}
      </TouchableOpacity>
    </View>
  );
}

function Header(props) {
  const {headerShadow} = props;
  return (
    <ToolBar
      statusBarProps={{translucent: true, backgroundColor: 'transparent'}}
      barStyle="light-content"
      leftComponent={() => renderLeftComponent(props)} // Error on this line (Checked by commenting all other code)
      centerComponent={() => renderCenterComponent(props)}
      rightComponent={() => renderRightComponent(props)}
      containerStyle={[
        styles.defaultHeaderColor,
        headerShadow ? styles.showShadow : null,
      ]}
    />
  );
}

export default Header;
