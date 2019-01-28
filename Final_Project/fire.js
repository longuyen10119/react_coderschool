import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCLRwwp2F6yTaNmokkVz_3NNLm-_X725Ws",
  authDomain: "aqiapp-2e8d7.firebaseapp.com",
  databaseURL: "https://aqiapp-2e8d7.firebaseio.com",
  projectId: "aqiapp-2e8d7",
  storageBucket: "aqiapp-2e8d7.appspot.com",
  messagingSenderId: "94367378638"
};
firebase.initializeApp(config);

const database = firebase.database()
export default database;


