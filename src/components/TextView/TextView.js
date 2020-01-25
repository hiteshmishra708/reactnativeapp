import React from "react";
import { Text } from "react-native-elements";

function TextView(props) {
  const {
    h1,
    h2,
    h3,
    h4,
    h1Style,
    h2Style,
    h3Style,
    h4Style,
    style,
    bold,
    italic,
    underline,
    children
  } = props;

  return (
    <Text
      h1={h1}
      h2={h2}
      h3={h3}
      h4={h4}
      h1Style={h1Style}
      h2Style={h2Style}
      h3Style={h3Style}
      h4Style={h4Style}
      style={[
        {
          fontWeight: bold ? "bold" : undefined,
          fontStyle: italic ? "italic" : undefined,
          textDecorationLine: underline ? "underline" : undefined
        },
        style
      ]}
    >
      {children}
    </Text>
  );
}

export default TextView;
