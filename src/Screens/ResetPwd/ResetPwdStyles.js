/* eslint-disable import/no-extraneous-dependencies */
import {
  StyleSheet
} from "react-native";

const localStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  inputlogoView: {
    flex: 0.6, alignItems: "center", justifyContent: "center", marginHorizontal: 15,
    marginBottom: 60
  },
  header: { fontSize: 20, color: "rgba(111, 111, 111, 0.8)" },
  username: {
    borderWidth: 1, borderRadius: 8, marginHorizontal: -10, marginTop: 25,
    borderColor: "#D3F0F0", paddingHorizontal: 10
  },
  password: {
    borderWidth: 1, borderRadius: 8, marginHorizontal: -10, borderColor: "#D3F0F0",
    marginBottom: 16, paddingHorizontal: 10
  },
  btnstyle:{ flex: 0.2, alignItems: "center", justifyContent: "center" },
  btnSize:{ borderRadius: 8, height: 50, marginHorizontal: 15 },
  btnTitleStyle:{ color: "#5C5C5C", fontSize: 14 }
});
export default localStyles;