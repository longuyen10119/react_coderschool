import { StyleSheet, Dimensions } from 'react-native';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
  },
  modalContainer: {
    flex: .8,
    backgroundColor: 'gray',
    paddingTop: 0,
  },
  card: {
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: .8,
    shadowRadius: 8,
    opacity: 20,
  },
  otherCard: {
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: .5,
    shadowRadius: 2,
    opacity: 20,
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: Dimensions.width,
    opacity: 20,
    // alignSelf: 'center',
  },
  textBetweenHairline: {
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: '#A2A2A2'
  },
  header: {
    textAlign: 'center',
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  image: {
    padding: 5,
  },
  leftSide: {
    flex: .35,
    marginLeft: -15,
  },
  rightSide: {
    flex: .65,
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'space-around',
  },
  firstRow: {
    marginTop: -15,
    flexDirection: 'row',
  },
  secondRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  aqiStyle: {
    fontWeight: 'bold',
    fontSize: 'bold',
    fontSize: 44,
  },
  regularStyle: {
    fontSize: 12,
  },
  location: {
    color: '#661400',
    fontSize: 15,
    marginBottom: -15,
    marginTop: -10,
  },
  addButton: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'space-around',
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

});