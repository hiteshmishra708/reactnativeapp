import styles from "@card/CardStyle";
import React from "react";
import { View } from "react-native";

function Card(props) {
  const { children, cardStyle } = props;
  const { card } = styles;
  return (
    <View style={[card, cardStyle]}>{children}</View>
  );
}

export default Card;
