import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7pQ3e_R8WQt-CTxjKD1sBxN2Bf72s8TM",
  authDomain: "datavid-cake-tracker.firebaseapp.com",
  projectId: "datavid-cake-tracker",
  storageBucket: "datavid-cake-tracker.appspot.com",
  messagingSenderId: "99880214121",
  appId: "1:99880214121:web:063b4d5171e2170bfa0cf8",
  measurementId: "G-T2HRLJEN46"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);