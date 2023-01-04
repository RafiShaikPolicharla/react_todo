// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1QX58uSN1O2dlLbDTtaDVrQoGRqCsHSo",
  authDomain: "todo-application-80d23.firebaseapp.com",
  projectId: "todo-application-80d23",
  storageBucket: "todo-application-80d23.appspot.com",
  messagingSenderId: "455804316207",
  appId: "1:455804316207:web:c29108b27a5b5baac3b4da"
};

// const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);
// export const auth = getAuth();
const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = firebase.auth();
