// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2vIOeuwaKUEIQeQgJiHHZ20cYQWJbqZs",
  authDomain: "reactlinks-f2242.firebaseapp.com",
  projectId: "reactlinks-f2242",
  storageBucket: "reactlinks-f2242.appspot.com",
  messagingSenderId: "523147152147",
  appId: "1:523147152147:web:582a47440ef1db7eb1e8e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
