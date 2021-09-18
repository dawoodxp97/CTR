import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLSe8bGFOCWmuJncaA8GLgzENayCEfnI8",
  authDomain: "ctr-chat.firebaseapp.com",
  projectId: "ctr-chat",
  storageBucket: "ctr-chat.appspot.com",
  messagingSenderId: "566059706157",
  appId: "1:566059706157:web:050123f741f48512a255a4",
  measurementId: "G-ESLQWC97PC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();

export { auth, provider, storage };

export default db;
