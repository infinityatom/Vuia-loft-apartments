# Vuia-loft-apartments
A website for selling buildings


What is this?

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZd1iJMQDbS12rrFAF9YzomhAjQP5BZOE",
  authDomain: "vuia-loft-apartments.firebaseapp.com",
  projectId: "vuia-loft-apartments",
  storageBucket: "vuia-loft-apartments.appspot.com",
  messagingSenderId: "69537565733",
  appId: "1:69537565733:web:987f05c54be75a49edc3cc",
  measurementId: "G-7G6Z3NG29Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);