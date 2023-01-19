import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { auth } from "./firebase.js";
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const FirebaseLoginAccounts = () => {

    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/dashboard");
            }
        });
    }, []);
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }
    return (
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth}
        />
    )
}

export default FirebaseLoginAccounts;