import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD61jtbI2YAMr4o8OSzskFBw7dKq4JqDIs",
    authDomain: "memento-60125.firebaseapp.com",
    databaseURL: "https://memento-60125.firebaseio.com",
    projectId: "memento-60125",
    storageBucket: "memento-60125.appspot.com",
    messagingSenderId: "1022220134214"
  };

const app = firebase.initializeApp(config);
const database = app.database()

export { app, database }
