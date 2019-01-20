import firebase from 'firebase';

firebase.initializeApp({

    apiKey: "AIzaSyCNnhV8pi26Z4vpgVQAIZeFmvGlHuX5ESc",
    authDomain: "chatapp-b656a.firebaseapp.com",
    databaseURL: "https://chatapp-b656a.firebaseio.com",
    projectId: "chatapp-b656a",
    storageBucket: "chatapp-b656a.appspot.com",
    messagingSenderId: "364980777166"

});

const database = firebase.database()
export default database;


