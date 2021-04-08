import "firebase/firestore";

import firebase from "firebase";

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};

if (location.hostname === "localhost") {
  firebaseConfig = {
    databaseURL: "http://localhost:9000?ns=emulatorui",
  };
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase utils
const fb = firebase;
const db = firebase.firestore();
const auth = firebase.auth();

export { auth, fb, db };
