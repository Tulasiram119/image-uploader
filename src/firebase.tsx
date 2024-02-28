// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn_TgsSNNq_HAkMf_KZip0reOurw6QOhI",
  authDomain: "image-uploader-d16d1.firebaseapp.com",
  databaseURL:
    "https://image-uploader-d16d1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "image-uploader-d16d1",
  storageBucket: "image-uploader-d16d1.appspot.com",
  messagingSenderId: "36520601724",
  appId: "1:36520601724:web:fe75c45f719dcfc2a481f9",
  measurementId: "G-7F9V4BHE9R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
