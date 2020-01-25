import {StyleSheet} from 'react-native';

const defaultColor = '#4062E2';
const primaryColor = '#fff';

export default styles = StyleSheet.create({
  horizontalDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  marginHorizontal: {marginHorizontal: 10},
  defaultHeaderColor: {
    backgroundColor: defaultColor,
    paddingBottom: 7,
    borderBottomColor: defaultColor,
    marginBottom: 0,
    shadowColor: 'transparent',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  titleStyle: {
    color: primaryColor,
    fontSize: 20,
    fontWeight: '600',
  },
  sliderContainer: {flex: 1, alignItems: 'stretch', justifyContent: 'center'},
  sliderStyle: {height: 2, backgroundColor: 'blue'},
  thumbStyle: {height: 0},
  showShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 10,
    shadowOffset: {width: 1, height: 7},
  },
});
