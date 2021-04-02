import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyChlqgS0eRuo9f7TtMcqIE6oD7DzsjSaxk",
    authDomain: "mamed-7686b.firebaseapp.com",
    databaseURL: "https://mamed-7686b-default-rtdb.firebaseio.com",
    projectId: "mamed-7686b",
    storageBucket: "mamed-7686b.appspot.com",
    messagingSenderId: "273623971549",
    appId: "1:273623971549:web:3d6328fb956926c59c0d34"
};

const opp = firebase.initializeApp(firebaseConfig);

console.log('firebase firebase firebase', firebase)
export const auth = firebase.auth();
export const database = firebase.database();


