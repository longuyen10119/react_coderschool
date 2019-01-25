import { StyleSheet } from 'react-native';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
  },
  card: {
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    opacity: 20,
  },
  image: {
    padding: 5,
  },
  leftSide: {
    flex: .35,
  },
  rightSide: {
    flex: .65,
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  firstRow: {
    marginTop: -5,
    flexDirection: 'row',
  },
  secondRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  aqiStyle: {
    fontWeight: 'bold',
    fontSize: 'bold',
    fontSize: 40,
  },
  regularStyle: {
    fontSize: 12,
  },
  location: {
    color: '#661400',
    fontSize: 18,
    marginBottom: -15,
    marginTop: -10,
  },
  addButton: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  marker: {
    backgroundColor: '#550bbc',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    transform: [
      { rotate: '180deg' }
    ],
  },
  tooltipBox: {
    height: 30,
    width: 30,
    borderRadius: 10,

  },
});