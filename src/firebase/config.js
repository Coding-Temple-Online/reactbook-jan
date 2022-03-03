// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFFBimM-k2WT4af4PuoIv5-zVHtIirMzE",
    authDomain: "reactbook-jan-derek.firebaseapp.com",
    projectId: "reactbook-jan-derek",
    storageBucket: "reactbook-jan-derek.appspot.com",
    messagingSenderId: "960047909814",
    appId: "1:960047909814:web:70f4f6d96d36df01adcf17"
};

// Initialize Firebase
initializeApp(firebaseConfig);