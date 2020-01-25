/* eslint-disable import/no-extraneous-dependencies */
import {
  StyleSheet
} from "react-native";

const localStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  inputlogoView: {
    flex: 0.6,  height:'auto', marginHorizontal: 15,
  }, 
  header: { fontSize: 20, color: "rgba(111, 111, 111, 0.8)",alignSelf:'center' },
  inputStyle: {
    borderWidth: 1, borderRadius: 8, marginHorizontal: -10, marginTop: 25,
    borderColor: "#D3F0F0", paddingHorizontal: 10
  },
  btnstyle: { flex: 0.4, alignItems: "center", justifyContent: "center" },
  btnSize: { borderRadius: 8, height: 50, width:'100%',marginTop:70 },
  btnTitleStyle: { color: "#5C5C5C", fontSize: 14 },
   overlayStyle:{
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default localStyles;