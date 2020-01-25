import styles from "@button/ButtonStyle";
import React from "react";
import { Button as ButtonView } from "react-native-elements";

let defaultStyle = {};

function Button(props) {
  const {
    full,
    half,
    quarter,
    buttonStyle,
    containerStyle,
    icon,
    iconContainerStyle,
    iconRight,
    loading,
    loadingProps,
    loadingStyle,
    onPress,
    title,
    titleStyle,
    backgroundColor
  } = props;

  const { fullStyle, halfStyle, quarterStyle } = styles;
  if (quarter) {
    defaultStyle = quarterStyle;
  } else if (half) {
    defaultStyle = halfStyle;
  } else if (full) {
    defaultStyle = fullStyle;
  }

  return (
    <ButtonView
      buttonStyle={[defaultStyle, buttonStyle, backgroundColor || { backgroundColor: "#245EA4" }]}
      containerStyle={containerStyle}
      icon={icon}
      iconContainerStyle={iconContainerStyle}
      iconRight={iconRight}
      loading={loading}
      loadingProps={loadingProps}
      loadingStyle={loadingStyle}
      onPress={onPress}
      title={title}
      titleStyle={titleStyle}
    />
  );
}

export default Button;
