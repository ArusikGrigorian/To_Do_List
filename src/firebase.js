import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBDiP0yocPNhWH8zGhZlltMvEl5t43bPgY",
    authDomain: "todo-e73d8.firebaseapp.com",
    databaseURL: "https://todo-e73d8.firebaseio.com",
    projectId: "todo-e73d8",
    storageBucket: "todo-e73d8.appspot.com",
    messagingSenderId: "832880329519",
    appId: "1:832880329519:web:67930262068e55a55517da"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth()
export { db, auth };