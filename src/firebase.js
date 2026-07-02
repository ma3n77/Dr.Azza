import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDH9EH9yNTqN2DWkYhcCfk2MpwtZLaoFkU",
  authDomain: "dr-azza-qa.firebaseapp.com",
  projectId: "dr-azza-qa",
  storageBucket: "dr-azza-qa.firebasestorage.app",
  messagingSenderId: "151101877637",
  appId: "1:151101877637:web:e4beb73ee66587d5b868ec"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
