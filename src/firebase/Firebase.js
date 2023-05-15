// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwRS2wv0fNOSiENUMPqlXYoMd7rQCJmd0",
  authDomain: "anonima-1e9b3.firebaseapp.com",
  projectId: "anonima-1e9b3",
  storageBucket: "anonima-1e9b3.appspot.com",
  messagingSenderId: "211499383617",
  appId: "1:211499383617:web:3198ce59adaa3d76bbbfc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);