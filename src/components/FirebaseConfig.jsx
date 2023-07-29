// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0buo6AXjX23zkvsbFRw4c6eJphMdDZqE",
  authDomain: "timetrack-a8db2.firebaseapp.com",
  projectId: "timetrack-a8db2",
  storageBucket: "timetrack-a8db2.appspot.com",
  messagingSenderId: "1048536443673",
  appId: "1:1048536443673:web:3e8598c7bbc4e50653f388",
  measurementId: "G-D2BSCC4HWE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
