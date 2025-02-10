import {initializeApp} from "firebase/app";
import {getAuth} from "firebaseAuth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKwGsV4Gi3ZPvKRRstbg99zFtVWGxSK-Q",
  authDomain: "ai-sentiment-a2962.firebaseapp.com",
  projectId: "ai-sentiment-a2962",
  storageBucket: "ai-sentiment-a2962.firebasestorage.app",
  messagingSenderId: "913396624483",
  appId: "1:913396624483:web:4553775a7de23b7bd15c56",
  measurementId: "G-9H7P5RYV46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};