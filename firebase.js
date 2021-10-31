import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD91C58_UTsTcIkq0F5-zvL9dGrOQfItic",
    authDomain: "mirascasting.firebaseapp.com",
    projectId: "mirascasting",
    storageBucket: "mirascasting.appspot.com",
    messagingSenderId: "341043763259",
    appId: "1:341043763259:web:debd677f9377e827caa41e",
    measurementId: "G-L1XMJ22DPF"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };