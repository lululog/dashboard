/*
** EPITECH PROJECT, 2020
** B-DEV-500-PAR-5-1-cardgames-lucas.guyader
** File description:
** Firebase.js
*/

import FirebaseContext, { withFirebase } from './context';
import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyApxGqeucVNYI6xdYVdM5nsNXTD219BJWw",
    authDomain: "dashboard-cc38f.firebaseapp.com",
    databaseURL: "https://dashboard-cc38f.firebaseio.com",
    projectId: "dashboard-cc38f",
    storageBucket: "dashboard-cc38f.appspot.com",
    messagingSenderId: "805069170481",
    appId: "1:805069170481:web:6bfa918b14a4cd8b15f210",
    measurementId: "G-DLPVEK2M25"
};

class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
export { FirebaseContext, withFirebase };