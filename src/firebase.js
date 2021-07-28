import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxtlkVdBdK9kB6eBjl_GRGFIchlH4RbZg",
    authDomain: "chat-system-c0edf.firebaseapp.com",
    projectId: "chat-system-c0edf",
    storageBucket: "chat-system-c0edf.appspot.com",
    messagingSenderId: "265315490624",
    appId: "1:265315490624:web:72b998cc18d88f6f5ff8a5",
    measurementId: "G-FY5FHMVDNN"
  };



const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };